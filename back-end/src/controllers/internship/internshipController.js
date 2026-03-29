import { Op } from 'sequelize';
import {
  Internship,
  InternshipBenefit,
  InternshipDeadline,
  InternshipEligibility,
  InternshipFieldOfStudy,
} from '../../models/index.js';

const internshipController = {
  // Get all internships
  async getAll(req, res) {
    try {
      const { search } = req.query;
      const where = {};

      if (search) where.name = { [Op.like]: `%${search}%` };

      const internships = await Internship.findAll({ 
        where,
        include: [
          { model: InternshipFieldOfStudy },
        ],
      });
      res.json(internships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get internship by ID
  async getById(req, res) {
    try {
      const internship = await Internship.findByPk(req.params.id, {
        include: [
          { model: InternshipEligibility },
          { model: InternshipFieldOfStudy },
          { model: InternshipBenefit },
          { model: InternshipDeadline },
        ],
      });
      if (!internship) return res.status(404).json({ error: 'Internship not found' });
      res.json(internship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create internship
  async create(req, res) {
    try {
      const internship = await Internship.create(req.body);
      res.status(201).json(internship);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update internship
  async update(req, res) {
    try {
      const internship = await Internship.findByPk(req.params.id);
      if (!internship) return res.status(404).json({ error: 'Internship not found' });
      await internship.update(req.body);
      res.json(internship);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete internship
  async delete(req, res) {
    try {
      const internship = await Internship.findByPk(req.params.id);
      if (!internship) return res.status(404).json({ error: 'Internship not found' });
      await internship.destroy();
      res.json({ message: 'Internship deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default internshipController;