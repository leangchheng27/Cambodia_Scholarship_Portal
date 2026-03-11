// Internship Routes - defines all internship-related endpoints
import express from 'express';
import internshipController from '../../controllers/internship/internshipController.js';

const router = express.Router();

// GET /api/internships - Get all internships
router.get('/', internshipController.getAll);

// GET /api/internships/:id - Get internship by ID
router.get('/:id', internshipController.getById);

// POST /api/internships - Create new internship
router.post('/', internshipController.create);

// PUT /api/internships/:id - Update internship
router.put('/:id', internshipController.update);

// DELETE /api/internships/:id - Delete internship
router.delete('/:id', internshipController.delete);

export default router;
