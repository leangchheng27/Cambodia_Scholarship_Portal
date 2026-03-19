/**
 * Feedback Routes
 *
 * Why this exists:
 *   Every time a user views, saves, or applies to a scholarship, we record
 *   that as a training signal.  Over time these records let us:
 *     1. Re-rank AI results using real-world engagement data
 *     2. Export (userProfile, scholarshipText, label) triplets to fine-tune
 *        the Hugging Face sentence-transformer model offline
 *
 * Endpoints:
 *   POST /feedback                       – Record one interaction
 *   GET  /feedback/scholarship/:id/stats – Popularity stats for one scholarship
 *   GET  /feedback/my-history            – Authenticated user's own history
 *   GET  /feedback/training-data         – Export training pairs (admin only)
 *   GET  /feedback/popularity-map        – All scholarship popularity scores (used by AI)
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import config from '../../config/index.js';
import UserFeedback, { ACTION_SCORES } from '../../models/feedback/UserFeedback.js';
import { authenticateAdmin } from '../../middlewares/auth/adminMiddleware.js';

const router = express.Router();

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * Optional JWT auth – attaches req.user if a valid token is present,
 * but never blocks the request if it is missing or invalid.
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    try {
      req.user = jwt.verify(token, config.JWT_SECRET);
    } catch {
      req.user = null;
    }
  }
  next();
};

const normalizeScholarshipType = (value) => {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return 'scholarship';
  if (normalized === 'scholarship-cambodia' || normalized === 'scholarship-abroad') return 'scholarship';
  if (normalized === 'internship' || normalized === 'university' || normalized === 'scholarship') return normalized;
  return 'scholarship';
};

/** Convert a continuous score to a 0-1 training label */
function scoreToLabel(score) {
  if (score >= 3) return 1.0;   // save / apply → strong positive
  if (score >= 1) return 0.5;   // view / click → weak positive
  return 0.0;                    // dismiss    → negative
}

/** Build a human-readable description of a user profile for embedding */
function buildUserProfileText(profile) {
  if (!profile) return '';
  const parts = [];
  if (profile.studentType) parts.push(`${profile.studentType} student`);
  if (profile.gpa)         parts.push(`GPA ${profile.gpa}`);
  if (profile.grades) {
    const strong = Object.entries(profile.grades)
      .filter(([, g]) => g === 'A' || g === 'B')
      .map(([s]) => s);
    if (strong.length) parts.push(`strong in ${strong.join(', ')}`);
  }
  return parts.join(', ');
}

/** Build a description of a scholarship snapshot for embedding */
function buildScholarshipText(snapshot) {
  if (!snapshot) return '';
  const parts = [];
  if (snapshot.title || snapshot.name) parts.push(snapshot.title || snapshot.name);
  if (snapshot.description) parts.push(snapshot.description.slice(0, 200));
  if (snapshot.aiMetadata?.fieldCategories?.length)
    parts.push(`fields: ${snapshot.aiMetadata.fieldCategories.join(', ')}`);
  if (snapshot.aiMetadata?.keywords?.length)
    parts.push(snapshot.aiMetadata.keywords.join(', '));
  return parts.join('. ');
}

// ─── routes ───────────────────────────────────────────────────────────────────

/**
 * POST /feedback
 * Record one user interaction with a scholarship.
 * Body: { scholarshipId, scholarshipType?, action, userProfile?, scholarshipSnapshot? }
 *
 * Call this from the frontend whenever a user:
 *   - opens a scholarship detail page     → action: "click"
 *   - saves / bookmarks a scholarship     → action: "save"
 *   - clicks the "Apply" button           → action: "apply"
 *   - dismisses / hides a recommendation  → action: "dismiss"
 */
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      scholarshipId,
      scholarshipType = 'scholarship',
      action,
      userProfile = null,
      scholarshipSnapshot = null,
    } = req.body;

    if (!scholarshipId || !action) {
      return res.status(400).json({
        success: false,
        error: 'scholarshipId and action are required',
      });
    }

    if (!Object.prototype.hasOwnProperty.call(ACTION_SCORES, action)) {
      return res.status(400).json({
        success: false,
        error: `Invalid action. Must be one of: ${Object.keys(ACTION_SCORES).join(', ')}`,
      });
    }

    const normalizedScholarshipType = normalizeScholarshipType(scholarshipType);

    const record = await UserFeedback.create({
      userId:               req.user?.id ?? null,
      scholarshipId:        String(scholarshipId),
      scholarshipType:      normalizedScholarshipType,
      action,
      score:               ACTION_SCORES[action],
      userProfile,
      scholarshipSnapshot,
    });

    return res.status(201).json({
      success: true,
      data: { id: record.id, score: record.score },
    });
  } catch (err) {
    console.error('Error recording feedback:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record feedback',
      details: err.message,
    });
  }
});

/**
 * GET /feedback/scholarship/:id/stats
 * Returns engagement counts for one scholarship — used to show "popularity".
 */
router.get('/scholarship/:id/stats', async (req, res) => {
  try {
    const rows = await UserFeedback.findAll({
      where: { scholarshipId: req.params.id },
    });

    const stats = { views: 0, clicks: 0, saves: 0, applications: 0, dismissals: 0, popularityScore: 0 };
    rows.forEach(r => {
      if (r.action === 'view')    stats.views++;
      if (r.action === 'click')   stats.clicks++;
      if (r.action === 'save')    stats.saves++;
      if (r.action === 'apply')   stats.applications++;
      if (r.action === 'dismiss') stats.dismissals++;
      stats.popularityScore += r.score;
    });

    return res.json({ success: true, data: stats });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch stats', details: err.message });
  }
});

/**
 * GET /feedback/my-history
 * Returns the authenticated user's own interaction history.
 * Requires a valid JWT token.
 */
router.get('/my-history', optionalAuth, async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const rows = await UserFeedback.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 100,
      attributes: ['scholarshipId', 'scholarshipType', 'action', 'score', 'createdAt'],
    });

    return res.json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch history', details: err.message });
  }
});

/**
 * GET /feedback/popularity-map
 * Returns an object keyed by scholarshipId with aggregated popularity scores.
 * The AI re-ranker fetches this to blend engagement data into match scores.
 * Example response: { "fulbright-scholarship": 42, "csc-scholarship": 18 }
 */
router.get('/popularity-map', async (req, res) => {
  try {
    const rows = await UserFeedback.findAll({
      attributes: ['scholarshipId', 'score'],
    });

    const map = {};
    rows.forEach(r => {
      map[r.scholarshipId] = (map[r.scholarshipId] || 0) + r.score;
    });

    // Normalise to a 0-10 bonus range so popularity never dominates AI score
    const maxVal = Math.max(1, ...Object.values(map));
    const normalised = {};
    Object.entries(map).forEach(([id, val]) => {
      normalised[id] = Math.round((val / maxVal) * 10 * 10) / 10; // 0 – 10
    });

    return res.json({ success: true, data: normalised });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch popularity map', details: err.message });
  }
});

/**
 * GET /feedback/training-data  (admin only)
 *
 * Exports labelled training pairs in the format needed to fine-tune the
 * sentence-transformer model (sentence-transformers library, Python).
 *
 * Each pair: { userText, scholarshipText, label }
 *   label 1.0  → user saved/applied   (positive pair)
 *   label 0.5  → user viewed/clicked  (neutral pair)
 *   label 0.0  → user dismissed       (negative pair)
 *
 * The Python fine-tune script (scripts/finetune_model.py) reads this JSON
 * and trains the model using CosineSimilarityLoss.
 */
router.get('/training-data', authenticateAdmin, async (req, res) => {
  try {
    const rows = await UserFeedback.findAll({
      where: {
        userProfile:        { [Op.ne]: null },
        scholarshipSnapshot: { [Op.ne]: null },
      },
      order: [['createdAt', 'DESC']],
      limit: 10000,
    });

    const pairs = rows.map(r => ({
      userText:        buildUserProfileText(r.userProfile),
      scholarshipText: buildScholarshipText(r.scholarshipSnapshot),
      label:           scoreToLabel(r.score),
      action:          r.action,
      scholarshipId:   r.scholarshipId,
    })).filter(p => p.userText && p.scholarshipText);

    return res.json({
      success: true,
      data: {
        total: pairs.length,
        format: 'sentence-transformers CosineSimilarityLoss',
        pairs,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to export training data', details: err.message });
  }
});

export { router as feedbackRouter };
