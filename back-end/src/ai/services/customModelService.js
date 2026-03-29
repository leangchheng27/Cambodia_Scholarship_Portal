/**
 * Custom Hugging Face Model Integration Service
 * Uses Gradio API with proper feature formatting
 * Model expects: 11 numeric features (10 subjects + stream indicator)
 * Returns scores for ALL 12 majors in a single API call
 */

const GRADIO_BASE_URL = "https://leangchheng27-cambodia-scholarship-portal.hf.space/gradio_api";

const GRADE_MAP = { 'A': 5.0, 'B': 4.0, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'F': 0.0 };

const SUBJECT_ORDER = [
  'mathematics', 'biology', 'chemistry', 'physics',
  'khmer', 'history', 'geography', 'moral_civics',
  'earth_science', 'english'
];

const TARGET_COLUMNS = [
  'IT & Computer Science', 'Engineering', 'Health & Medical Sciences',
  'Agriculture & Environmental', 'Architecture & Urban Planning',
  'Business & Economics', 'Education', 'Arts & Media',
  'Law & Legal Studies', 'Social Sciences', 'Tourism & Hospitality',
  'Languages & Literature'
];

/**
 * Normalize grade keys from app format to model format
 */
function normalizeGradeKey(key) {
  const map = {
    'math': 'mathematics',
    'mathematics': 'mathematics',
    'biology': 'biology',
    'chemistry': 'chemistry',
    'physics': 'physics',
    'physical science': 'physics',
    'english': 'english',
    'history': 'history',
    'khmer literature': 'khmer',
    'khmer': 'khmer',
    'geography': 'geography',
    'moral civics': 'moral_civics',
    'moral_civics': 'moral_civics',
    'earth science': 'earth_science',
    'earth_science': 'earth_science',
  };
  return map[key.toLowerCase()] || key.toLowerCase().replace(/\s+/g, '_');
}

/**
 * Format student profile to 11 numeric features
 */
function formatFeatures(studentProfile) {
  const grades = studentProfile.grades || {};

  const normalizedGrades = {};
  Object.entries(grades).forEach(([key, val]) => {
    normalizedGrades[normalizeGradeKey(key)] = val;
  });

  console.log('    Normalized grades:', normalizedGrades);

  const features = SUBJECT_ORDER.map(subject => {
    const grade = normalizedGrades[subject] || 'F';
    return GRADE_MAP[grade.toString().toUpperCase()] ?? 0.0;
  });

  const streamIsScience = studentProfile.stream?.toLowerCase() === 'science' ? 1 : 0;
  features.push(streamIsScience);

  return features.join(',');
}

/**
 * Call Gradio API ONCE and get scores for all 12 majors
 */
async function callGradioOnce(studentProfile) {
  const featuresInput = formatFeatures(studentProfile);
  console.log(`  🚀 Calling Gradio API once for all majors`);
  console.log(`  Features: ${featuresInput}`);

  // STEP 1: POST to get event_id
  const postRes = await fetch(`${GRADIO_BASE_URL}/call/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [featuresInput] }),
  });

  if (!postRes.ok) throw new Error(`API request failed: ${postRes.status}`);
  const { event_id } = await postRes.json();
  if (!event_id) throw new Error('No event_id returned from Gradio');

  // STEP 2: Read SSE response
  const sseRes = await fetch(`${GRADIO_BASE_URL}/call/predict/${event_id}`);
  if (!sseRes.ok) throw new Error(`SSE request failed: ${sseRes.status}`);

  const text = await sseRes.text();

  // Parse SSE — find 'event: complete' and its data line
  const lines = text.split('\n');
  let resultData = null;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'event: complete' && lines[i + 1]?.startsWith('data: ')) {
      resultData = JSON.parse(lines[i + 1].slice(6));
      break;
    }
  }

  if (!resultData) throw new Error('No complete event found in SSE response');

  // resultData = ["[[0.087, 0.083, ...12 scores...]]"]
  const parsed = JSON.parse(resultData[0]);
  const allScores = Array.isArray(parsed[0]) ? parsed[0] : parsed;

  console.log(`  ✅ Got ${allScores.length} scores from model`);
  return allScores;
}

/**
 * Get major recommendations for a student using HF model
 * Makes a SINGLE API call and maps scores to all majors
 */
export async function getCustomModelRecommendations(studentProfile, majors) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎓 Scoring majors with HF Model`);
  console.log(`👤 Stream: ${studentProfile.stream || 'science (default)'}`);
  console.log(`📚 Total majors: ${majors.length}`);
  console.log(`${'='.repeat(60)}`);

  if (!majors || majors.length === 0) {
    console.warn(`⚠️  No majors provided to score`);
    return [];
  }

  try {
    // Single API call gets all 12 scores at once
    const allScores = await callGradioOnce(studentProfile);

    // Map scores to majors using TARGET_COLUMNS index
    const scored = majors.map(major => {
      const majorIndex = TARGET_COLUMNS.indexOf(major.title);
      const rawScore = majorIndex >= 0 && allScores[majorIndex] != null
        ? allScores[majorIndex]
        : 0;
      const score = Math.round(rawScore * 100);
      console.log(`  📐 ${major.title}: ${score}%`);
      return { ...major, matchScore: score, matchPercentage: `${score}%` };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);

    console.log(`\n📊 Results Summary:`);
    console.log(`   ✅ Successful: ${scored.length}`);
    console.log(`\n✅ Top recommendations:`);
    scored.slice(0, 5).forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.title} - ${s.matchScore}%`);
    });
    console.log(`${'='.repeat(60)}\n`);

    return scored;

  } catch (error) {
    console.error(`❌ Model call failed: ${error.message}`);
    console.log('⚠️  Using fallback random scores');

    // Fallback: return random scores if model fails
    return majors
      .map(major => {
        const fallbackScore = Math.floor(Math.random() * 40) + 30;
        return { ...major, matchScore: fallbackScore, matchPercentage: `${fallbackScore}%`, error: true };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }
}

/**
 * Check model accessibility and configuration
 */
export async function healthCheck() {
  try {
    const testFeatures = formatFeatures({
      stream: 'science',
      grades: { 'Math': 'A', 'Physics': 'B' }
    });

    const response = await fetch(`${GRADIO_BASE_URL}/call/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [testFeatures] }),
    });

    return {
      service: 'gradio-custom-model',
      apiStatus: response.ok ? 'accessible' : `error-${response.status}`,
      endpoint: GRADIO_BASE_URL,
      apiVersion: 'Gradio 6.x (/call/predict SSE)',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return { service: 'gradio-custom-model', status: 'error', error: error.message };
  }
}

export default { getCustomModelRecommendations, healthCheck };