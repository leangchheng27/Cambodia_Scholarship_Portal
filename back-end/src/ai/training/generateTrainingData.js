/**
 * generateTrainingData.js
 *
 * Exports labelled (userText, scholarshipText, label) pairs from the
 * user_feedback table so you can fine-tune the Hugging Face model offline.
 *
 * Usage:
 *   cd back-end
 *   node scripts/generateTrainingData.js
 *
 * Output:
 *   back-end/scripts/training_data.json   (for the Python fine-tune script)
 *
 * What the output looks like:
 *   [
 *     {
 *       "sentence1": "science student, GPA 3.8, strong in Math, Physics",
 *       "sentence2": "Fulbright Scholarship. fields: Engineering, Computer Science. keywords: STEM, USA",
 *       "label": 1.0    ← user applied  (positive pair)
 *     },
 *     {
 *       "sentence1": "society student, GPA 2.9, strong in English, History",
 *       "sentence2": "Medical Sciences Scholarship. fields: Medicine, Pharmacy.",
 *       "label": 0.0    ← user dismissed  (negative pair)
 *     },
 *     ...
 *   ]
 *
 * The label is a 0-1 cosine-similarity target:
 *   1.0  → user saved or applied   (should be semantically close)
 *   0.5  → user viewed or clicked  (neutral)
 *   0.0  → user dismissed          (should be semantically far)
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../../db/database.js';
import UserFeedback from '../../models/feedback/UserFeedback.js';
import { Op } from 'sequelize';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── helpers ─────────────────────────────────────────────────────────────────

function buildUserProfileText(profile) {
  if (!profile) return null;
  const parts = [];
  if (profile.studentType) parts.push(`${profile.studentType} student`);
  if (profile.gpa)         parts.push(`GPA ${profile.gpa}`);
  if (profile.grades) {
    const strong = Object.entries(profile.grades)
      .filter(([, g]) => g === 'A' || g === 'B')
      .map(([s]) => s);
    if (strong.length) parts.push(`strong in ${strong.join(', ')}`);
  }
  return parts.length ? parts.join(', ') : null;
}

function buildScholarshipText(snap) {
  if (!snap) return null;
  const parts = [];
  if (snap.title || snap.name) parts.push(snap.title || snap.name);
  if (snap.description)        parts.push(snap.description.slice(0, 200));
  if (snap.aiMetadata?.fieldCategories?.length)
    parts.push(`fields: ${snap.aiMetadata.fieldCategories.join(', ')}`);
  if (snap.aiMetadata?.keywords?.length)
    parts.push(snap.aiMetadata.keywords.join(', '));
  return parts.length ? parts.join('. ') : null;
}

function scoreToLabel(action) {
  switch (action) {
    case 'apply':   return 1.0;
    case 'save':    return 1.0;
    case 'click':   return 0.5;
    case 'view':    return 0.5;
    case 'dismiss': return 0.0;
    default:        return 0.5;
  }
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    const rows = await UserFeedback.findAll({
      where: {
        userProfile:         { [Op.ne]: null },
        scholarshipSnapshot: { [Op.ne]: null },
      },
      order: [['createdAt', 'DESC']],
    });

    console.log(`📊 Found ${rows.length} feedback records with full snapshot data`);

    const pairs = [];
    for (const row of rows) {
      const sentence1 = buildUserProfileText(row.userProfile);
      const sentence2 = buildScholarshipText(row.scholarshipSnapshot);
      if (!sentence1 || !sentence2) continue;

      pairs.push({
        sentence1,
        sentence2,
        label: scoreToLabel(row.action),
        action: row.action,            // keep for debugging
        scholarshipId: row.scholarshipId,
      });
    }

    if (pairs.length === 0) {
      console.warn('⚠️  No usable training pairs found.');
      console.warn('   Make sure the front-end sends scholarshipSnapshot in feedback requests.');
      console.warn('   See: POST /feedback  (body should include scholarshipSnapshot)');
      process.exit(0);
    }

    // Split into train/validation sets (80/20)
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    const splitAt  = Math.floor(shuffled.length * 0.8);
    const trainSet = shuffled.slice(0, splitAt);
    const valSet   = shuffled.slice(splitAt);

    const output = {
      generated_at: new Date().toISOString(),
      total:  pairs.length,
      train:  trainSet.length,
      val:    valSet.length,
      label_distribution: {
        positive: pairs.filter(p => p.label === 1.0).length,
        neutral:  pairs.filter(p => p.label === 0.5).length,
        negative: pairs.filter(p => p.label === 0.0).length,
      },
      train_data: trainSet,
      val_data:   valSet,
    };

    const outPath = path.join(__dirname, 'training_data.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`\n✅ Training data export complete!`);
    console.log(`   File  : ${outPath}`);
    console.log(`   Total : ${pairs.length} pairs`);
    console.log(`   Train : ${trainSet.length}`);
    console.log(`   Val   : ${valSet.length}`);
    console.log(`   Positive (save/apply): ${output.label_distribution.positive}`);
    console.log(`   Neutral  (view/click): ${output.label_distribution.neutral}`);
    console.log(`   Negative (dismiss)   : ${output.label_distribution.negative}`);
    console.log(`\nNext step: run  python scripts/finetune_model.py`);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await sequelize.close();
  }
}

main();
