import { Op } from 'sequelize';
import {
  Internship,
  InternshipBenefit,
  InternshipDeadline,
  InternshipEligibility,
  InternshipFieldOfStudy,
} from '../../models/index.js';
import { getUniversityInternshipRecommendations } from '../../ai/utils/universityMatcher.js';

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

  // Get internship recommendations for a user based on field of study
  async getRecommendations(req, res) {
    try {
      const { userField, limit = 10 } = req.body;

      if (!userField) {
        return res.status(400).json({
          success: false,
          error: 'userField is required'
        });
      }

      // Get all internships (includes ai_metadata JSON field automatically)
      const internships = await Internship.findAll();

      console.log(`🎯 [Backend] Getting internship recommendations for field: ${userField}`);
      console.log(`📊 [Backend] Total internships available: ${internships.length}`);

      // Get recommendations using the matcher (uses ai_metadata.fieldCategories)
      const recommendations = getUniversityInternshipRecommendations(
        internships,
        userField,
        null, // userGPA (optional)
        limit
      );

      console.log(`✅ [Backend] Found ${recommendations.length} matching internships`);

      return res.status(200).json({
        success: true,
        recommendations: recommendations || [],
        total: recommendations.length,
        userField: userField
      });

    } catch (error) {
      console.error('Error getting internship recommendations:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error while getting recommendations',
        details: error.message
      });
    }
  }
};

export default internshipController;