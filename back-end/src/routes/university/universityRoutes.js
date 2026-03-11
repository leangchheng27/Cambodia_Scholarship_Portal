// University Routes - defines all university-related endpoints
import express from 'express';
import universityController from '../../controllers/university/universityController.js';

const router = express.Router();

// GET /api/universities - Get all universities
router.get('/', universityController.getAll);

// GET /api/universities/:id - Get university by ID
router.get('/:id', universityController.getById);

// POST /api/universities - Create new university
router.post('/', universityController.create);

// PUT /api/universities/:id - Update university
router.put('/:id', universityController.update);

// DELETE /api/universities/:id - Delete university
router.delete('/:id', universityController.delete);

export default router;
