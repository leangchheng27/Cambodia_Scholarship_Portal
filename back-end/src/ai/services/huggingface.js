/**
 * Hugging Face AI Service
 * Provides AI-powered scholarship matching using semantic embeddings
 */

import { HfInference } from '@huggingface/inference';
import { 
  getScholarshipEmbeddingText, 
  getUserProfileEmbeddingText
} from './recommendationEngine.js';
import { AI_CONFIG, MATCH_THRESHOLDS } from '../config/constants.js';

// Initialize Hugging Face client
// API key should be set in environment variables
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || '';
const hf = HF_API_KEY ? new HfInference(HF_API_KEY) : null;

// In-memory cache for scholarship embeddings (in production, use Redis)
const embeddingsCache = {};

/**
 * Generate embedding vector for text using Hugging Face
 * @param {string} text - The text to generate embedding for
 * @returns {Promise<number[]|null>} - The embedding vector or null on error
 */
async function generateEmbedding(text) {
  try {
    if (!HF_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is missing. AI-only mode requires a valid key.');
    }

    const response = await hf.featureExtraction({
      model: AI_CONFIG.EMBEDDING_MODEL,
      inputs: text
    });
    
    return response;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
}

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} - Similarity score (0-1)
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generate match reasons based on AI analysis
 * @param {Object} userProfile - User's profile
 * @param {Object} scholarship - Scholarship object
 * @param {number} matchScore - Calculated match score
 * @param {number} aiScore - AI similarity score
 * @returns {string[]} - Array of reason strings with emojis
 */
function generateAIMatchReasons(userProfile, scholarship, matchScore, aiScore) {
  const reasons = [];
  
  // AI-based compatibility
  if (matchScore >= MATCH_THRESHOLDS.EXCEPTIONAL) {
    reasons.push('🎯 Exceptional AI match - Highly recommended');
  } else if (matchScore >= MATCH_THRESHOLDS.STRONG) {
    reasons.push('✨ Strong AI compatibility with your profile');
  } else if (matchScore >= MATCH_THRESHOLDS.GOOD) {
    reasons.push('👍 Good match based on AI analysis');
  } else {
    reasons.push('💡 Potential opportunity to consider');
  }
  
  // Field categories
  if (scholarship.aiMetadata?.fieldCategories) {
    const fields = scholarship.aiMetadata.fieldCategories.slice(0, 2).join(', ');
    reasons.push(`📚 Fields: ${fields}`);
  }
  
  // Student type match
  if (scholarship.aiMetadata?.studentTypes) {
    const types = scholarship.aiMetadata.studentTypes;
    if (types.includes('both')) {
      reasons.push('🎓 Open to all student types');
    } else if (types.includes(userProfile.studentType)) {
      reasons.push(`🎓 Perfect for ${userProfile.studentType} students`);
    }
  }
  
  // GPA compatibility
  if (scholarship.aiMetadata?.minGPA && userProfile.gpa) {
    if (userProfile.gpa >= scholarship.aiMetadata.minGPA + 0.5) {
      reasons.push('⭐ Your GPA exceeds requirements');
    } else if (userProfile.gpa >= scholarship.aiMetadata.minGPA) {
      reasons.push('✓ Meets GPA requirements');
    }
  }
  
  // Difficulty level
  if (scholarship.aiMetadata?.difficultyLevel) {
    const difficulty = scholarship.aiMetadata.difficultyLevel;
    if (difficulty === 'easy') {
      reasons.push('🟢 Easy application process');
    } else if (difficulty === 'moderate') {
      reasons.push('🟡 Moderate competition level');
    } else if (difficulty === 'competitive' || difficulty === 'very-competitive') {
      reasons.push('🔴 Highly competitive - Strong application needed');
    }
  }
  
  return reasons;
}

/**
 * Get AI-powered scholarship recommendations
 * Uses Hugging Face semantic similarity matching
 * @param {Object} userProfile - User's academic profile
 * @param {Array} scholarships - List of available scholarships
 * @param {number} limit - Maximum number of recommendations
 * @returns {Promise<Array>} - Sorted list of scholarships with match scores
 */
async function getAIRecommendations(userProfile, scholarships, limit = AI_CONFIG.DEFAULT_LIMIT) {
  try {
    // STAGE 1: Filter by hard eligibility requirements (MUST MEET)
    const eligibleScholarships = scholarships.filter(scholarship => {
      // Check GPA requirement (hard constraint)
      if (scholarship.aiMetadata?.minGPA && userProfile.gpa) {
        if (userProfile.gpa < scholarship.aiMetadata.minGPA) {
          return false; // User doesn't meet GPA requirement - EXCLUDE
        }
      }
      
      // Check student type eligibility
      // If studentTypes is missing, treat as 'both' (available to all students)
      // This is important for internships which don't specify student type limitations
      if (scholarship.aiMetadata?.studentTypes) {
        const types = scholarship.aiMetadata.studentTypes;
        if (!types.includes('both') && !types.includes(userProfile.studentType)) {
          return false; // Wrong student type - EXCLUDE
        }
      }
      // If studentTypes is missing or empty, allow all students (implicit 'both')
      
      return true; // Meets all hard constraints
    });
    
    // STAGE 2: Generate user profile embedding
    const userText = getUserProfileEmbeddingText(userProfile);
    const userEmbedding = await generateEmbedding(userText);
    if (!userEmbedding) {
      throw new Error('Failed to generate user embedding in AI-only mode.');
    }
    
    // STAGE 3: Calculate scores for eligible scholarships only
    const scoredScholarships = await Promise.all(
      eligibleScholarships.map(async (scholarship) => {
        let aiScore = 0;
        let matchScore = 0;
        
        // Get AI semantic similarity score
        if (userEmbedding) {
          const scholarshipText = getScholarshipEmbeddingText(scholarship);
          
          // Check cache first
          let scholarshipEmbedding = embeddingsCache[scholarship.id];
          if (!scholarshipEmbedding) {
            scholarshipEmbedding = await generateEmbedding(scholarshipText);
            if (scholarshipEmbedding) {
              embeddingsCache[scholarship.id] = scholarshipEmbedding;
            }
          }
          
          if (scholarshipEmbedding) {
            // Convert cosine similarity (0-1) to score (0-100)
            const similarity = cosineSimilarity(userEmbedding, scholarshipEmbedding);
            aiScore = similarity * 100;
            
            // Apply eligibility bonuses (since we already filtered)
            let eligibilityBonus = 0;
            
            // Check student type compatibility
            // If studentTypes is missing, treat as 'both' (+10 bonus for all students)
            if (scholarship.aiMetadata?.studentTypes) {
              const types = scholarship.aiMetadata.studentTypes;
              if (types.includes('both') || types.includes(userProfile.studentType)) {
                eligibilityBonus += 10;
              }
            } else {
              // Missing studentTypes = available to all students = bonus applies
              eligibilityBonus += 10;
            }
            
            // GPA requirement bonus (since we filtered, user meets it)
            if (scholarship.aiMetadata?.minGPA && userProfile.gpa) {
              eligibilityBonus += 10;
            }
            
            matchScore = Math.min(100, Math.round(aiScore + eligibilityBonus));
          }
        } else {
          throw new Error('Failed to generate scholarship embedding in AI-only mode.');
        }
        
        return {
          ...scholarship,
          matchScore: Math.round(matchScore),
          aiScore: Math.round(aiScore),
          matchReasons: generateAIMatchReasons(userProfile, scholarship, matchScore, aiScore)
        };
      })
    );
    
    // Sort by combined score (highest first)
    scoredScholarships.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top matches
    return scoredScholarships.slice(0, limit);
    
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    throw error;
  }
}

/**
 * Batch process scholarships to generate and cache embeddings
 * Call this once to pre-compute embeddings for all scholarships
 * @param {Array} scholarships - List of scholarships
 * @returns {Promise<Object>} - Object with scholarship IDs as keys and embeddings as values
 */
async function precomputeScholarshipEmbeddings(scholarships) {
  console.log('Precomputing scholarship embeddings...');
  
  for (const scholarship of scholarships) {
    const text = getScholarshipEmbeddingText(scholarship);
    const embedding = await generateEmbedding(text);
    
    if (embedding) {
      embeddingsCache[scholarship.id] = embedding;
    }
    
    // Add small delay to respect API rate limits
    await new Promise(resolve => setTimeout(resolve, AI_CONFIG.API_DELAY_MS));
  }
  
  console.log(`Cached embeddings for ${Object.keys(embeddingsCache).length} scholarships`);
  return embeddingsCache;
}

/**
 * Get cached scholarship embeddings
 * @returns {Object} - Cached embeddings or empty object
 */
function getCachedEmbeddings() {
  return { ...embeddingsCache };
}

/**
 * Clear the embeddings cache
 */
function clearEmbeddingsCache() {
  Object.keys(embeddingsCache).forEach(key => delete embeddingsCache[key]);
  console.log('Embeddings cache cleared');
}

/**
 * Get AI-powered recommendations blended with real user-feedback signals.
 *
 * How the "training" loop works at runtime:
 *   1. The AI computes a semantic similarity score (0-100) via Hugging Face
 *   2. We fetch a popularity map — an object keyed by scholarshipId whose
 *      values are normalised engagement scores (0-10) accumulated from all
 *      user interactions stored in the user_feedback table.
 *   3. Final score = (AI score × 0.85) + (popularity bonus × 1.5)
 *      → AI drives 85 % of the ranking; real engagement refines the last 15 %.
 *
 * Over time, as more users interact, the popularity map reflects which
 * scholarships students actually care about — this IS the model learning.
 *
 * @param {Object} userProfile    - Student academic profile
 * @param {Array}  scholarships   - Candidate scholarships
 * @param {number} limit          - Max results to return
 * @param {Object} popularityMap  - { [scholarshipId]: 0-10 bonus }
 *                                  Fetch from GET /feedback/popularity-map
 *                                  Pass {} if not available.
 */
async function getAIRecommendationsWithFeedback(
  userProfile,
  scholarships,
  limit = AI_CONFIG.DEFAULT_LIMIT,
  popularityMap = {}
) {
  // Get base AI recommendations first
  const aiResults = await getAIRecommendations(userProfile, scholarships, scholarships.length);

  // Blend in the popularity bonus
  const blended = aiResults.map(scholarship => {
    const popularityBonus = popularityMap[String(scholarship.id)] ?? 0;
    const blendedScore = Math.min(100, Math.round(scholarship.matchScore * 0.85 + popularityBonus * 1.5));

    let updatedReasons = [...(scholarship.matchReasons || [])];
    if (popularityBonus >= 7) {
      updatedReasons = ['🔥 Highly popular among students', ...updatedReasons];
    } else if (popularityBonus >= 4) {
      updatedReasons = ['📈 Trending with students like you', ...updatedReasons];
    }

    return { ...scholarship, matchScore: blendedScore, matchReasons: updatedReasons };
  });

  // Re-sort after blending
  blended.sort((a, b) => b.matchScore - a.matchScore);
  return blended.slice(0, limit);
}

export {
  generateEmbedding,
  cosineSimilarity,
  getAIRecommendations,
  getAIRecommendationsWithFeedback,
  precomputeScholarshipEmbeddings,
  getCachedEmbeddings,
  clearEmbeddingsCache
};
