/**
 * Majors Routes
 * API endpoints for managing majors
 */

import express from 'express';
import Major from '../../models/major/Major.js';

const router = express.Router();

/**
 * GET /majors
 * Get all majors
 */
router.get('/', async (req, res) => {
  try {
    const majors = await Major.findAll({
      order: [['title', 'ASC']],
    });

    res.json({
      success: true,
      majors: majors,
      count: majors.length,
    });
  } catch (error) {
    console.error('Error fetching majors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch majors',
      details: error.message,
    });
  }
});

/**
 * GET /majors/:id
 * Get single major
 */
router.get('/:id', async (req, res) => {
  try {
    const major = await Major.findByPk(req.params.id);

    if (!major) {
      return res.status(404).json({
        success: false,
        error: 'Major not found',
      });
    }

    res.json({
      success: true,
      major,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch major',
      details: error.message,
    });
  }
});

/**
 * POST /majors
 * Create new major (admin only)
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, stream } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Major title is required',
      });
    }

    const major = await Major.create({
      title,
      description,
      stream: stream || null,
    });

    res.status(201).json({
      success: true,
      major,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create major',
      details: error.message,
    });
  }
});

/**
 * PUT /majors/:id
 * Update major
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, description, stream } = req.body;
    const major = await Major.findByPk(req.params.id);

    if (!major) {
      return res.status(404).json({
        success: false,
        error: 'Major not found',
      });
    }

    await major.update({
      title: title || major.title,
      description: description || major.description,
      stream: stream !== undefined ? stream : major.stream,
    });

    res.json({
      success: true,
      major,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update major',
      details: error.message,
    });
  }
});

/**
 * DELETE /majors/:id
 * Delete major
 */
router.delete('/:id', async (req, res) => {
  try {
    const major = await Major.findByPk(req.params.id);

    if (!major) {
      return res.status(404).json({
        success: false,
        error: 'Major not found',
      });
    }

    await major.destroy();

    res.json({
      success: true,
      message: 'Major deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete major',
      details: error.message,
    });
  }
});

export default router;
