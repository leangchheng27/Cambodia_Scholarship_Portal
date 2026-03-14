import Internship from '../../models/internship/Internship.js';
import InternshipFieldOfStudy from '../../models/internship/InternshipFieldOfStudy.js';
import InternshipBenefit from '../../models/internship/InternshipBenefit.js';
import InternshipEligibility from '../../models/internship/InternshipEligibility.js';
import InternshipDeadline from '../../models/internship/InternshipDeadline.js';

const internshipController = {
  // Get all internships
  async getAll(req, res) {
    try {
      const internships = await Internship.findAll({
        include: [
          InternshipBenefit,
          InternshipDeadline,
          InternshipEligibility,
          InternshipFieldOfStudy
        ]
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
          InternshipBenefit,
          InternshipDeadline,
          InternshipEligibility,
          InternshipFieldOfStudy
        ]
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
