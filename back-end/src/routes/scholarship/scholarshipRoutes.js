// Scholarship Routes - defines all scholarship-related endpoints
import express from 'express';
import scholarshipController from '../../controllers/scholarship/scholarshipController.js';

const router = express.Router();

// GET /api/scholarships - Get all scholarships
router.get('/', scholarshipController.getAll);

// GET /api/scholarships/:id - Get scholarship by ID
router.get('/:id', scholarshipController.getById);

// POST /api/scholarships - Create new scholarship
router.post('/', scholarshipController.create);

// PUT /api/scholarships/:id - Update scholarship
router.put('/:id', scholarshipController.update);

// DELETE /api/scholarships/:id - Delete scholarship
router.delete('/:id', scholarshipController.delete);

export default router;
