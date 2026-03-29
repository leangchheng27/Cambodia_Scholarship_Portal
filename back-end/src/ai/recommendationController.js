/**
 * Recommendation Controller
 * Handles API requests for field-based scholarship recommendations
 */

import { Scholarship, ScholarshipFieldOfStudy } from '../models/index.js';

/**
 * Get scholarships filtered by major fields
 * POST /api/recommendations/scholarships-by-fields
 * 
 * Takes top 5 majors from the custom model and returns all scholarships
 * that have those fields in scholarship_field_of_study table.
 * 
 * @param {Object} req.body - { majorTitles: string[] }
 * @param {string[]} req.body.majorTitles - Array of major titles (e.g., ["Engineering", "IT & Computer Science"])
 * @returns {Object} - { success: boolean, scholarships: Array, total: number }
 */
const getScholarshipsByMajorFields = async (req, res) => {
  try {
    const { majorTitles } = req.body;

    if (!majorTitles || !Array.isArray(majorTitles) || majorTitles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'majorTitles array is required and must not be empty'
      });
    }

    console.log(`🎓 [Backend] Filtering scholarships for majors:`, majorTitles);

    // Find all scholarships that have fields matching the major titles
    const scholarships = await Scholarship.findAll({
      include: [
        {
          model: ScholarshipFieldOfStudy,
          attributes: ['field_name'],
          where: {
            field_name: majorTitles  // This uses Sequelize's IN operator
          },
          required: true  // INNER JOIN - scholarship must have at least one matching field
        }
      ],
      attributes: ['id', 'name', 'description', 'type', 'image_url', 'poster_image_url', 'registration_link', 'details', 'ai_metadata'],
      raw: false,
      subQuery: false  // Prevent Sequelize from creating subqueries
    });

    console.log(`✅ [Backend] Found ${scholarships.length} scholarships matching majors`);

    return res.status(200).json({
      success: true,
      scholarships: scholarships || [],
      total: scholarships.length,
      majorFilters: majorTitles
    });

  } catch (error) {
    console.error('Error getting scholarships by major fields:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while filtering scholarships',
      details: error.message
    });
  }
};

export {
  getScholarshipsByMajorFields
};
