import University from '../../models/university/University.js';
import UniversityMajor from '../../models/university/UniversityMajor.js';
import UniversityApplicationGuideStep from '../../models/university/UniversityApplicationGuideStep.js';
import UniversityTuitionFee from '../../models/university/UniversityTuitionFee.js';
import UniversityCampus from '../../models/university/UniversityCampus.js';
import UniversityNews from '../../models/university/UniversityNews.js';
import UniversityStudentAchievement from '../../models/university/UniversityStudentAchievement.js';

// University Controller
const universityController = {
  // Get all universities
  async getAll(req, res) {
    try {
      const universities = await University.findAll();
      res.json(universities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get university by ID
  async getById(req, res) {
    try {
      const university = await University.findByPk(req.params.id);
      if (!university) return res.status(404).json({ error: 'University not found' });
      res.json(university);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create university
  async create(req, res) {
    try {
      const university = await University.create(req.body);
      res.status(201).json(university);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update university
  async update(req, res) {
    try {
      const university = await University.findByPk(req.params.id);
      if (!university) return res.status(404).json({ error: 'University not found' });
      await university.update(req.body);
      res.json(university);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete university
  async delete(req, res) {
    try {
      const university = await University.findByPk(req.params.id);
      if (!university) return res.status(404).json({ error: 'University not found' });
      await university.destroy();
      res.json({ message: 'University deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default universityController;
