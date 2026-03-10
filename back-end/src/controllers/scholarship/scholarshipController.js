import Scholarship from '../../models/scholarship/Scholarship.js';
import ScholarshipFieldOfStudy from '../../models/scholarship/ScholarshipFieldOfStudy.js';
import ScholarshipBenefit from '../../models/scholarship/ScholarshipBenefit.js';
import ScholarshipEligibility from '../../models/scholarship/ScholarshipEligibility.js';
import ScholarshipDeadline from '../../models/scholarship/ScholarshipDeadline.js';

const scholarshipController = {
  // Get all scholarships
  async getAll(req, res) {
    try {
      const scholarships = await Scholarship.findAll();
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get scholarship by ID
  async getById(req, res) {
    try {
      const scholarship = await Scholarship.findByPk(req.params.id);
      if (!scholarship) return res.status(404).json({ error: 'Scholarship not found' });
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create scholarship
  async create(req, res) {
    try {
      const scholarship = await Scholarship.create(req.body);
      res.status(201).json(scholarship);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update scholarship
  async update(req, res) {
    try {
      const scholarship = await Scholarship.findByPk(req.params.id);
      if (!scholarship) return res.status(404).json({ error: 'Scholarship not found' });
      await scholarship.update(req.body);
      res.json(scholarship);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete scholarship
  async delete(req, res) {
    try {
      const scholarship = await Scholarship.findByPk(req.params.id);
      if (!scholarship) return res.status(404).json({ error: 'Scholarship not found' });
      await scholarship.destroy();
      res.json({ message: 'Scholarship deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default scholarshipController;
