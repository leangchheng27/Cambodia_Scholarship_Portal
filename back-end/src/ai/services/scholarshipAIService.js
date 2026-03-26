/**
 * Scholarship AI Recommendation Service
 * Uses the fine-tuned AI model to recommend scholarships based on student grades
 * 
 * Model: tozenz/cambodia-scholarship-ai-subjects
 * Training: 300 samples with subject grades (A-F)
 */

import { HfInference } from "@huggingface/inference";

// Initialize HuggingFace client
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || "";
const client = new HfInference(HF_TOKEN);

// Model ID
const AI_MODEL = "tozenz/cambodia-scholarship-ai-subjects";

// Define scholarships with descriptions
const SCHOLARSHIPS = [
  {
    id: 1,
    title: "STEM Excellence",
    description: "For students excelling in Science, Technology, Engineering, and Mathematics",
    requiredSubjects: ["Math", "Physics", "Chemistry"]
  },
  {
    id: 2,
    title: "Science Achievement",
    description: "For students with strong performance in natural sciences",
    requiredSubjects: ["Biology", "Chemistry", "Physics"]
  },
  {
    id: 3,
    title: "Business Innovation",
    description: "For students interested in business and entrepreneurship",
    requiredSubjects: ["Math", "History", "Geography"]
  },
  {
    id: 4,
    title: "International Study",
    description: "For students interested in global education opportunities",
    requiredSubjects: ["English", "History", "Geography"]
  },
  {
    id: 5,
    title: "Technology Leaders",
    description: "For students passionate about technology and innovation",
    requiredSubjects: ["Math", "Physics", "English"]
  }
];

/**
 * Get scholarship recommendations for a student
 * @param {Object} studentData - Student profile with grades
 * @param {string} studentData.stream - "science" or "society"
 * @param {Object} studentData.grades - { subjectName: "A" or "B" etc }
 * @returns {Promise<Array>} - Array of recommended scholarships with scores
 */
export const getScholarshipRecommendations = async (studentData) => {
  try {
    // Validate input
    if (!studentData.stream || !studentData.grades) {
      throw new Error("Missing student stream or grades");
    }

    // Create student profile text (same format as training)
    const gradesText = Object.entries(studentData.grades)
      .map(([subject, grade]) => `${subject}:${grade}`)
      .join(", ");

    const studentText = `${studentData.stream.toUpperCase()} stream student. Grades: ${gradesText}`;

    console.log(`[AI] Processing: ${studentText}`);

    // Get embeddings for student profile
    const studentEmbedding = await getEmbedding(studentText);

    // Get recommendations for each scholarship
    const recommendations = [];

    for (const scholarship of SCHOLARSHIPS) {
      const scholarshipText = `${scholarship.title} scholarship program`;
      const scholarshipEmbedding = await getEmbedding(scholarshipText);

      // Calculate cosine similarity
      const similarity = cosineSimilarity(studentEmbedding, scholarshipEmbedding);

      recommendations.push({
        scholarshipId: scholarship.id,
        title: scholarship.title,
        description: scholarship.description,
        matchScore: Math.round(similarity * 100) / 100, // Round to 2 decimals
        matchPercentage: Math.round(similarity * 100)
      });
    }

    // Sort by match score (highest first)
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    console.log(`[AI] Top recommendation: ${recommendations[0].title} (${recommendations[0].matchPercentage}%)`);

    return recommendations;
  } catch (error) {
    console.error("[AI] Recommendation error:", error);
    throw new Error(`Failed to get scholarship recommendations: ${error.message}`);
  }
};

/**
 * Get embedding vector for text
 * @param {string} text - Text to embed
 * @returns {Promise<Array>} - Embedding vector
 */
const getEmbedding = async (text) => {
  try {
    // Using mean pooling to get sentence embedding
    const response = await client.featureExtraction({
      model: AI_MODEL,
      inputs: text
    });

    // Response should be an array of embeddings
    if (Array.isArray(response) && response.length > 0) {
      return response[0]; // Get first embedding
    }

    throw new Error("Invalid embedding response");
  } catch (error) {
    console.error("[AI] Embedding error:", error);
    throw error;
  }
};

/**
 * Calculate cosine similarity between two vectors
 * @param {Array} vecA - First vector
 * @param {Array} vecB - Second vector
 * @returns {number} - Similarity score (0-1)
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    throw new Error("Vector dimensions don't match");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Get top N recommendations
 * @param {Object} studentData - Student profile
 * @param {number} topN - Number of recommendations to return (default 3)
 * @returns {Promise<Array>} - Top N recommendations
 */
export const getTopRecommendations = async (studentData, topN = 3) => {
  const allRecommendations = await getScholarshipRecommendations(studentData);
  return allRecommendations.slice(0, topN);
};

/**
 * Batch recommendations for multiple students
 * @param {Array} studentsData - Array of student profiles
 * @returns {Promise<Object>} - Results for each student
 */
export const getBatchRecommendations = async (studentsData) => {
  const results = {};

  for (const student of studentsData) {
    try {
      results[student.id] = await getScholarshipRecommendations(student);
    } catch (error) {
      results[student.id] = { error: error.message };
    }
  }

  return results;
};

/**
 * Get scholarship info
 * @returns {Array} - All available scholarships
 */
export const getAllScholarships = () => {
  return SCHOLARSHIPS;
};

/**
 * Get scholarship by ID
 * @param {number} id - Scholarship ID
 * @returns {Object|null} - Scholarship info or null
 */
export const getScholarshipById = (id) => {
  return SCHOLARSHIPS.find(s => s.id === id) || null;
};
