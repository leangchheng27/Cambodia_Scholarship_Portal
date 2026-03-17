import Scholarship from '../../models/scholarship/Scholarship.js';

const internshipController = {
  // Get all internships (from Scholarship table with type='internship')
  async getAll(req, res) {
    try {
      const internships = await Scholarship.findAll({
        where: { type: 'internship' }
      });
      res.json(internships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get internship by ID (from Scholarship table)
  async getById(req, res) {
    try {
      const internship = await Scholarship.findByPk(req.params.id);
      if (!internship) return res.status(404).json({ error: 'Internship not found' });
      res.json(internship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create internship (as Scholarship with type='internship')
  async create(req, res) {
    try {
      const internship = await Scholarship.create({
        ...req.body,
        type: 'internship'
      });
      res.status(201).json(internship);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update internship
  async update(req, res) {
    try {
      const internship = await Scholarship.findByPk(req.params.id);
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
      const internship = await Scholarship.findByPk(req.params.id);
      if (!internship) return res.status(404).json({ error: 'Internship not found' });
      await internship.destroy();
      res.json({ message: 'Internship deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default internshipController;
