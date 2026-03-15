import {
  University,
  UniversityMajor,
  UniversityApplicationGuideStep,
  UniversityTuitionFee,
  UniversityCampus,
  UniversityNews,
  UniversityStudentAchievement,
} from '../../models/index.js';

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
      
      // Fetch related data separately with error handling
      try {
        const majors = await UniversityMajor.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityMajors = majors;
      } catch (e) {
        university.dataValues.UniversityMajors = [];
      }
      
      try {
        const appGuide = await UniversityApplicationGuideStep.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityApplicationGuideSteps = appGuide;
      } catch (e) {
        university.dataValues.UniversityApplicationGuideSteps = [];
      }
      
      try {
        const tuition = await UniversityTuitionFee.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityTuitionFees = tuition;
      } catch (e) {
        university.dataValues.UniversityTuitionFees = [];
      }
      
      try {
        const campus = await UniversityCampus.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityCampuses = campus;
      } catch (e) {
        university.dataValues.UniversityCampuses = [];
      }
      
      try {
        const news = await UniversityNews.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityNews = news;
      } catch (e) {
        university.dataValues.UniversityNews = [];
      }
      
      try {
        const achievements = await UniversityStudentAchievement.findAll({ where: { university_id: req.params.id } });
        university.dataValues.UniversityStudentAchievements = achievements;
      } catch (e) {
        university.dataValues.UniversityStudentAchievements = [];
      }
      
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
