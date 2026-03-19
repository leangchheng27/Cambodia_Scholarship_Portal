// Admin routes - only accessible by admin users
import express from 'express';
import { authenticateAdmin } from '../middlewares/auth/adminMiddleware.js';
import University from '../models/university/University.js';
import Scholarship from '../models/scholarship/Scholarship.js';
import Internship from '../models/internship/Internship.js';
import UserFeedback from '../models/feedback/UserFeedback.js';
import { Op } from 'sequelize';

const router = express.Router();

const parseDetailsObject = (details) => {
    if (!details) return {};
    if (typeof details === 'string') {
        try {
            return JSON.parse(details);
        } catch {
            return {};
        }
    }
    return typeof details === 'object' ? details : {};
};

const parseListField = (value) => {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) return value.map((entry) => String(entry).trim()).filter(Boolean);

    return String(value)
        .split(/\r?\n|,|;|\u2022/)
        .map((entry) => entry.trim())
        .filter(Boolean);
};

const buildDetailsPayload = (existingDetails, payload) => {
    const details = { ...parseDetailsObject(existingDetails) };
    let changed = false;

    if (payload.eligibility !== undefined) {
        details.eligibility = parseListField(payload.eligibility);
        changed = true;
    }

    if (payload.applicable_programs !== undefined) {
        details.programs = parseListField(payload.applicable_programs);
        changed = true;
    }

    if (payload.benefits !== undefined) {
        details.benefits = parseListField(payload.benefits);
        changed = true;
    }

    return changed ? details : undefined;
};

// This will be set when initializing routes
let AuthUser;

/**
 * Initialize admin routes with the AuthUser model
 * @param {Object} userModel - Sequelize AuthUser model
 */
const initAdminRoutes = (userModel) => {
    AuthUser = userModel;
    return router;
};

/**
 * POST /admin/users
 * Create a new user
 */
router.post('/users', authenticateAdmin, async (req, res) => {
    try {
        const { name, email, password, role = 'user', isVerified = true } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }
        const exists = await AuthUser.findOne({ where: { email } });
        if (exists) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        const user = await AuthUser.create({ name, email, password, role, isVerified });
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, email: user.email, name: user.name, role: user.role, isVerified: user.isVerified },
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
});

/**
 * GET /admin/dashboard
 * Get dashboard statistics
 */
router.get('/dashboard', authenticateAdmin, async (req, res) => {
    try {
        const totalUsers = await AuthUser.count({ where: { role: 'user' } });
        const totalAdmins = await AuthUser.count({ where: { role: 'admin' } });
        const verifiedUsers = await AuthUser.count({ where: { isVerified: true, role: 'user' } });
        const unverifiedUsers = await AuthUser.count({ where: { isVerified: false, role: 'user' } });
        
        const totalUniversities = await University.count();
        const totalScholarships = await Scholarship.count({ 
            where: { type: { [Op.in]: ['cambodia', 'abroad'] } } 
        });
        const totalInternships = await Scholarship.count({ where: { type: 'internship' } });

        res.json({
            stats: {
                totalUsers,
                totalAdmins,
                verifiedUsers,
                unverifiedUsers,
                totalAll: totalUsers + totalAdmins,
                totalUniversities,
                totalScholarships,
                totalInternships,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats', details: err.message });
    }
});

/**
 * GET /admin/users
 * Get all users (admin only)
 */
router.get('/users', authenticateAdmin, async (req, res) => {
    try {
        const users = await AuthUser.findAll({
            attributes: ['id', 'email', 'name', 'picture', 'role', 'isVerified', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
});

/**
 * GET /admin/users/:id
 * Get single user details
 */
router.get('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await AuthUser.findByPk(req.params.id, {
            attributes: ['id', 'email', 'name', 'picture', 'role', 'isVerified', 'googleId', 'createdAt', 'updatedAt'],
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
});

/**
 * PUT /admin/users/:id
 * Update user details
 */
router.put('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const { name, email, password, isVerified, role, phone, nationality, studentType, interests, skills, grades } = req.body;
        const user = await AuthUser.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prevent modifying own admin role
        if (user.id === req.user.id && role !== 'admin') {
            return res.status(400).json({ error: 'Cannot remove your own admin role' });
        }

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (password) user.password = password; // only update if provided (model hashes it via beforeUpdate)
        if (isVerified !== undefined) user.isVerified = isVerified === true || isVerified === 'true';
        if (role !== undefined) user.role = role;
        if (phone !== undefined) user.phone = phone;
        if (nationality !== undefined) user.nationality = nationality;
        if (studentType !== undefined) user.studentType = studentType;
        if (interests !== undefined) user.interests = interests;
        if (skills !== undefined) user.skills = skills;
        if (grades !== undefined) user.grades = grades;

        await user.save();
        
        res.json({ 
            message: 'User updated successfully',
            user: {
                id: user.id, email: user.email, name: user.name,
                role: user.role, isVerified: user.isVerified,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
});

/**
 * DELETE /admin/users/:id
 * Delete a user
 */
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
    try {
        const user = await AuthUser.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Prevent deleting own account
        if (user.id === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        await user.destroy();
        
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});

/**
 * GET /admin/profile
 * Get admin profile
 */
router.get('/profile', authenticateAdmin, async (req, res) => {
    try {
        const admin = await AuthUser.findByPk(req.user.id, {
            attributes: ['id', 'email', 'name', 'picture', 'role', 'createdAt'],
        });
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        res.json({ admin });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile', details: err.message });
    }
});

// ============================================
// UNIVERSITY MANAGEMENT ROUTES
// ============================================

/**
 * GET /admin/universities
 * Get all universities sorted by ID ascending
 */
router.get('/universities', authenticateAdmin, async (req, res) => {
    try {
        const universities = await University.findAll({
            order: [['id', 'ASC']],
            raw: true,
        });
        
        res.json({ 
            universities
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch universities', details: err.message });
    }
});

/**
 * GET /admin/universities/:id
 * Get single university
 */
router.get('/universities/:id', authenticateAdmin, async (req, res) => {
    try {
        const university = await University.findByPk(req.params.id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.json({ university });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch university', details: err.message });
    }
});

/**
 * POST /admin/universities
 * Create new university
 */
router.post('/universities', authenticateAdmin, async (req, res) => {
    try {
        const { name, description, location, image_url, website, original_link, poster_image_url, slider_image_url } = req.body;
        const resolvedPoster = poster_image_url ?? image_url;
        const resolvedOriginalLink = original_link ?? website;
        
        if (!name) {
            return res.status(400).json({ error: 'University name is required' });
        }

        const university = await University.create({
            name,
            description,
            location,
            poster_image_url: resolvedPoster,
            slider_image_url,
            original_link: resolvedOriginalLink,
            website,
        });

        res.status(201).json({ 
            message: 'University created successfully',
            university 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create university', details: err.message });
    }
});

/**
 * PUT /admin/universities/:id
 * Update university
 */
router.put('/universities/:id', authenticateAdmin, async (req, res) => {
    try {
        const { name, description, location, image_url, website, original_link, poster_image_url, slider_image_url } = req.body;
        const university = await University.findByPk(req.params.id);
        
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        if (name !== undefined) university.name = name;
        if (description !== undefined) university.description = description;
        if (location !== undefined) university.location = location;
        if (poster_image_url !== undefined || image_url !== undefined) {
            university.poster_image_url = poster_image_url ?? image_url;
        }
        if (slider_image_url !== undefined) university.slider_image_url = slider_image_url;
        if (original_link !== undefined) university.original_link = original_link;
        if (website !== undefined) university.website = website;

        await university.save();
        
        res.json({ 
            message: 'University updated successfully',
            university 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update university', details: err.message });
    }
});

/**
 * DELETE /admin/universities/:id
 * Delete university
 */
router.delete('/universities/:id', authenticateAdmin, async (req, res) => {
    try {
        const university = await University.findByPk(req.params.id);
        
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        await university.destroy();
        
        res.json({ message: 'University deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete university', details: err.message });
    }
});

// ============================================
// SCHOLARSHIP MANAGEMENT ROUTES
// ============================================

/**
 * GET /admin/scholarships
 * Get all scholarships sorted by ID ascending
 */
router.get('/scholarships', authenticateAdmin, async (req, res) => {
    try {
        const [cambodia, abroad] = await Promise.all([
            Scholarship.findAll({ where: { type: 'cambodia' }, order: [['id', 'ASC']], raw: true }),
            Scholarship.findAll({ where: { type: 'abroad' }, order: [['id', 'ASC']], raw: true }),
        ]);
        
        res.json({ 
            scholarships: cambodia,
            cambodia,
            abroad,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch scholarships', details: err.message });
    }
});

/**
 * GET /admin/scholarships/:id
 * Get single scholarship
 */
router.get('/scholarships/:id', authenticateAdmin, async (req, res) => {
    try {
        const scholarship = await Scholarship.findByPk(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }
        res.json({ scholarship });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch scholarship', details: err.message });
    }
});

/**
 * POST /admin/scholarships
 * Create new scholarship
 */
router.post('/scholarships', authenticateAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            funded_by,
            course_duration,
            registration_link,
            image_url,
            original_link,
            poster_image_url,
            slider_image_url,
            type,
            eligibility,
            applicable_programs,
            benefits,
        } = req.body;
        const resolvedPoster = poster_image_url ?? image_url;
        const resolvedOriginalLink = original_link ?? registration_link;
        const details = buildDetailsPayload({}, { eligibility, applicable_programs, benefits });
        
        if (!name) {
            return res.status(400).json({ error: 'Scholarship name is required' });
        }

        const scholarship = await Scholarship.create({
            name,
            description,
            funded_by,
            course_duration,
            registration_link,
            original_link: resolvedOriginalLink,
            poster_image_url: resolvedPoster,
            slider_image_url,
            type: type || 'cambodia',
            ...(details !== undefined ? { details } : {}),
        });

        res.status(201).json({ 
            message: 'Scholarship created successfully',
            scholarship 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create scholarship', details: err.message });
    }
});

/**
 * PUT /admin/scholarships/:id
 * Update scholarship
 */
router.put('/scholarships/:id', authenticateAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            funded_by,
            course_duration,
            registration_link,
            image_url,
            original_link,
            poster_image_url,
            slider_image_url,
            type,
            eligibility,
            applicable_programs,
            benefits,
        } = req.body;
        const scholarship = await Scholarship.findByPk(req.params.id);
        
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        if (name !== undefined) scholarship.name = name;
        if (description !== undefined) scholarship.description = description;
        if (funded_by !== undefined) scholarship.funded_by = funded_by;
        if (course_duration !== undefined) scholarship.course_duration = course_duration;
        if (registration_link !== undefined) scholarship.registration_link = registration_link;
        if (original_link !== undefined) scholarship.original_link = original_link;
        if (type !== undefined) scholarship.type = type;
        if (poster_image_url !== undefined || image_url !== undefined) {
            scholarship.poster_image_url = poster_image_url ?? image_url;
        }
        if (slider_image_url !== undefined) scholarship.slider_image_url = slider_image_url;

        const details = buildDetailsPayload(scholarship.details, { eligibility, applicable_programs, benefits });
        if (details !== undefined) scholarship.details = details;

        await scholarship.save();
        
        res.json({ 
            message: 'Scholarship updated successfully',
            scholarship 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update scholarship', details: err.message });
    }
});

/**
 * DELETE /admin/scholarships/:id
 * Delete scholarship
 */
router.delete('/scholarships/:id', authenticateAdmin, async (req, res) => {
    try {
        const scholarship = await Scholarship.findByPk(req.params.id);
        
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        await scholarship.destroy();
        
        res.json({ message: 'Scholarship deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete scholarship', details: err.message });
    }
});

// ============================================
// INTERNSHIP MANAGEMENT ROUTES
// ============================================

/**
 * GET /admin/internships
 * Get all internships sorted by ID ascending
 */
router.get('/internships', authenticateAdmin, async (req, res) => {
    try {
        const internships = await Scholarship.findAll({
            where: { type: 'internship' },
            order: [['id', 'ASC']],
            raw: true,
        });
        
        res.json({ internships });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch internships', details: err.message });
    }
});

/**
 * GET /admin/internships/:id
 * Get single internship (from Scholarship table with type='internship')
 */
router.get('/internships/:id', authenticateAdmin, async (req, res) => {
    try {
        const internship = await Scholarship.findByPk(req.params.id);
        if (!internship) {
            return res.status(404).json({ error: 'Internship not found' });
        }
        res.json({ internship });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch internship', details: err.message });
    }
});

/**
 * POST /admin/internships
 * Create new internship (as Scholarship with type='internship')
 */
router.post('/internships', authenticateAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            company,
            duration,
            registration_link,
            image_url,
            original_link,
            poster_image_url,
            slider_image_url,
            eligibility,
            applicable_programs,
            benefits,
        } = req.body;
        const resolvedPoster = poster_image_url ?? image_url;
        const resolvedOriginalLink = original_link ?? registration_link;
        const details = buildDetailsPayload({}, { eligibility, applicable_programs, benefits });
        
        if (!name) {
            return res.status(400).json({ error: 'Internship name is required' });
        }

        const internship = await Scholarship.create({
            name,
            description,
            funded_by: company,
            course_duration: duration,
            registration_link,
            original_link: resolvedOriginalLink,
            poster_image_url: resolvedPoster,
            slider_image_url,
            type: 'internship',
            ...(details !== undefined ? { details } : {}),
        });

        res.status(201).json({ 
            message: 'Internship created successfully',
            internship 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create internship', details: err.message });
    }
});

/**
 * PUT /admin/internships/:id
 * Update internship (as Scholarship with type='internship')
 */
router.put('/internships/:id', authenticateAdmin, async (req, res) => {
    try {
        const {
            name,
            description,
            company,
            duration,
            registration_link,
            image_url,
            original_link,
            poster_image_url,
            slider_image_url,
            eligibility,
            applicable_programs,
            benefits,
        } = req.body;
        const internship = await Scholarship.findByPk(req.params.id);
        
        if (!internship) {
            return res.status(404).json({ error: 'Internship not found' });
        }

        if (name !== undefined) internship.name = name;
        if (description !== undefined) internship.description = description;
        if (company !== undefined) internship.funded_by = company;
        if (duration !== undefined) internship.course_duration = duration;
        if (registration_link !== undefined) internship.registration_link = registration_link;
        if (original_link !== undefined) internship.original_link = original_link;
        if (poster_image_url !== undefined || image_url !== undefined) {
            internship.poster_image_url = poster_image_url ?? image_url;
        }
        if (slider_image_url !== undefined) internship.slider_image_url = slider_image_url;

        const details = buildDetailsPayload(internship.details, { eligibility, applicable_programs, benefits });
        if (details !== undefined) internship.details = details;

        await internship.save();
        
        res.json({ 
            message: 'Internship updated successfully',
            internship 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update internship', details: err.message });
    }
});

/**
 * DELETE /admin/internships/:id
 * Delete internship (from Scholarship table)
 */
router.delete('/internships/:id', authenticateAdmin, async (req, res) => {
    try {
        const internship = await Scholarship.findByPk(req.params.id);
        
        if (!internship) {
            return res.status(404).json({ error: 'Internship not found' });
        }

        await internship.destroy();
        
        res.json({ message: 'Internship deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete internship', details: err.message });
    }
});

// ============================================
// AI ANALYTICS & INSIGHTS ROUTES
// ============================================

/**
 * GET /admin/ai-analytics
 * Get comprehensive AI analytics data for visualization
 * Returns data about recommendation patterns, feedback distribution, etc.
 */
router.get('/ai-analytics', authenticateAdmin, async (req, res) => {
    try {
        // Get feedback statistics
        const totalFeedback = await UserFeedback.count();
        const feedbackByAction = await UserFeedback.findAll({
            attributes: [
                'action',
                [UserFeedback.sequelize.fn('COUNT', UserFeedback.sequelize.literal('*')), 'count']
            ],
            group: 'action',
            raw: true,
        });

        // Get popularity data (top scholarships)
        const topScholarships = await UserFeedback.findAll({
            attributes: [
                'scholarshipId',
                [UserFeedback.sequelize.fn('COUNT', UserFeedback.sequelize.literal('*')), 'interactions'],
                [UserFeedback.sequelize.fn('SUM', UserFeedback.sequelize.col('score')), 'popularity']
            ],
            group: 'scholarshipId',
            order: [[UserFeedback.sequelize.fn('SUM', UserFeedback.sequelize.col('score')), 'DESC']],
            limit: 10,
            raw: true,
        });

        // Get feedback trends over time (last 7 days by action)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const feedbackTrends = await UserFeedback.findAll({
            attributes: [
                [UserFeedback.sequelize.fn('DATE', UserFeedback.sequelize.col('createdAt')), 'date'],
                'action',
                [UserFeedback.sequelize.fn('COUNT', UserFeedback.sequelize.literal('*')), 'count']
            ],
            where: {
                createdAt: { [Op.gte]: sevenDaysAgo }
            },
            group: [UserFeedback.sequelize.literal('DATE(createdAt)'), 'action'],
            order: [[UserFeedback.sequelize.literal('DATE(createdAt)'), 'ASC']],
            raw: true,
        });

        // Get score distribution analysis
        const scoreDistribution = await UserFeedback.findAll({
            attributes: [
                'score',
                [UserFeedback.sequelize.fn('COUNT', '*'), 'count']
            ],
            group: 'score',
            raw: true,
        });

        // Get scholarship type breakdown
        const scholarshipTypeBreakdown = await UserFeedback.findAll({
            attributes: [
                'scholarshipType',
                [UserFeedback.sequelize.fn('COUNT', '*'), 'count'],
                [UserFeedback.sequelize.fn('AVG', UserFeedback.sequelize.col('score')), 'avgScore']
            ],
            group: 'scholarshipType',
            raw: true,
        });

        // Calculate AI performance metrics
        const recommendationQuality = {
            totalRecommendations: totalFeedback,
            avgScore: await UserFeedback.findAll({
                attributes: [[UserFeedback.sequelize.fn('AVG', UserFeedback.sequelize.col('score')), 'average']],
                raw: true,
            }).then(r => r[0]?.average || 0),
            engagementRate: (feedbackByAction.find(f => f.action === 'click')?.count || 0) / Math.max(totalFeedback, 1),
            saveRate: (feedbackByAction.find(f => f.action === 'save')?.count || 0) / Math.max(totalFeedback, 1),
        };

        res.json({
            success: true,
            data: {
                totalFeedback,
                feedbackByAction: feedbackByAction.reduce((acc, f) => {
                    acc[f.action] = f.count;
                    return acc;
                }, {}),
                topScholarships,
                feedbackTrends,
                scoreDistribution: scoreDistribution.reduce((acc, s) => {
                    acc[s.score] = s.count;
                    return acc;
                }, {}),
                scholarshipTypeBreakdown,
                recommendationQuality,
            }
        });
    } catch (err) {
        console.error('Error fetching AI analytics:', err);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch AI analytics',
            details: err.message 
        });
    }
});

export { router as adminRouter, initAdminRoutes };
