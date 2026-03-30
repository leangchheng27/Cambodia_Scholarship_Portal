// Script to auto-fill missing internship data with 12 core fields
// Core 12 fields: id, name, description, company, duration, registration_link, 
// original_link, image_url, poster_image_url, slider_image_url, ai_metadata, timestamps
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import InternshipModel from '../src/models/internship/Internship.js';

const Internship = InternshipModel;

// Field mappings for auto-fill - Using exact 12 standard fields
const FIELD_MAPPINGS = {
  // IT & Computer Science
  'Google': ['IT & Computer Science', 'Engineering'],
  'Microsoft': ['IT & Computer Science', 'Engineering'],
  'Meta': ['IT & Computer Science', 'Engineering'],
  'Amazon': ['IT & Computer Science', 'Engineering'],
  'Apple': ['IT & Computer Science', 'Engineering'],
  'IBM': ['IT & Computer Science', 'Engineering'],
  'Oracle': ['IT & Computer Science', 'Engineering'],
  'Stripe': ['IT & Computer Science', 'Business & Economics'],
  'tech': ['IT & Computer Science'],
  'software': ['IT & Computer Science', 'Engineering'],
  'data science': ['IT & Computer Science'],
  'AI': ['IT & Computer Science'],
  'machine learning': ['IT & Computer Science'],
  'blockchain': ['IT & Computer Science'],
  'cybersecurity': ['IT & Computer Science'],
  'web': ['IT & Computer Science'],
  'network': ['IT & Computer Science'],
  'database': ['IT & Computer Science'],
  
  // Engineering
  'engineering': ['Engineering', 'Architecture & Urban Planning'],
  'mechanical': ['Engineering'],
  'civil': ['Engineering', 'Architecture & Urban Planning'],
  'electrical': ['Engineering'],
  'chemical': ['Engineering'],
  'aerospace': ['Engineering'],
  'construction': ['Architecture & Urban Planning'],
  'infrastructure': ['Architecture & Urban Planning'],
  
  // Health & Medical Sciences
  'healthcare': ['Health & Medical Sciences'],
  'hospital': ['Health & Medical Sciences'],
  'medical': ['Health & Medical Sciences'],
  'nursing': ['Health & Medical Sciences'],
  'pharmacy': ['Health & Medical Sciences'],
  'WHO': ['Health & Medical Sciences'],
  'clinic': ['Health & Medical Sciences'],
  'biomedical': ['Health & Medical Sciences'],
  'health': ['Health & Medical Sciences'],
  'dental': ['Health & Medical Sciences'],
  
  // Agriculture & Environmental
  'agriculture': ['Agriculture & Environmental'],
  'farming': ['Agriculture & Environmental'],
  'environmental': ['Agriculture & Environmental'],
  'sustainability': ['Agriculture & Environmental'],
  'conservation': ['Agriculture & Environmental'],
  'food': ['Agriculture & Environmental'],
  
  // Architecture & Urban Planning
  'architect': ['Architecture & Urban Planning'],
  'urban': ['Architecture & Urban Planning'],
  'planning': ['Architecture & Urban Planning'],
  'construction': ['Architecture & Urban Planning'],
  'real estate': ['Architecture & Urban Planning'],
  
  // Business & Economics
  'McKinsey': ['Business & Economics'],
  'Goldman Sachs': ['Business & Economics'],
  'JPMorgan': ['Business & Economics'],
  'World Bank': ['Business & Economics'],
  'business': ['Business & Economics'],
  'marketing': ['Business & Economics'],
  'sales': ['Business & Economics'],
  'finance': ['Business & Economics'],
  'accounting': ['Business & Economics'],
  'economics': ['Business & Economics'],
  'logistics': ['Business & Economics'],
  'supply chain': ['Business & Economics'],
  'consulting': ['Business & Economics'],
  'management': ['Business & Economics'],
  'commerce': ['Business & Economics'],
  'trade': ['Business & Economics'],
  
  // Education
  'teaching': ['Education'],
  'education': ['Education'],
  'training': ['Education'],
  'instructor': ['Education'],
  'school': ['Education'],
  'university': ['Education'],
  
  // Arts & Media
  'media': ['Arts & Media'],
  'journalism': ['Arts & Media'],
  'creative': ['Arts & Media'],
  'entertainment': ['Arts & Media'],
  'advertising': ['Arts & Media'],
  'film': ['Arts & Media'],
  'photography': ['Arts & Media'],
  'publishing': ['Arts & Media'],
  'music': ['Arts & Media'],
  'graphic': ['Arts & Media'],
  
  // Law & Legal Studies
  'law': ['Law & Legal Studies'],
  'legal': ['Law & Legal Studies'],
  'attorney': ['Law & Legal Studies'],
  'court': ['Law & Legal Studies'],
  'justice': ['Law & Legal Studies'],
  'paralegal': ['Law & Legal Studies'],
  
  // Social Sciences
  'sociology': ['Social Sciences'],
  'psychology': ['Social Sciences'],
  'anthropology': ['Social Sciences'],
  'social work': ['Social Sciences'],
  'UNICEF': ['Social Sciences'],
  'UN': ['Social Sciences'],
  'humanitarian': ['Social Sciences'],
  'development': ['Social Sciences'],
  'NGO': ['Social Sciences'],
  'nonprofit': ['Social Sciences'],
  'community': ['Social Sciences'],
  
  // Tourism & Hospitality
  'hotel': ['Tourism & Hospitality'],
  'tourism': ['Tourism & Hospitality'],
  'hospitality': ['Tourism & Hospitality'],
  'restaurant': ['Tourism & Hospitality'],
  'travel': ['Tourism & Hospitality'],
  'resort': ['Tourism & Hospitality'],
  'catering': ['Tourism & Hospitality'],
  'events': ['Tourism & Hospitality'],
  'dining': ['Tourism & Hospitality'],
  
  // Languages & Literature
  'language': ['Languages & Literature'],
  'linguistic': ['Languages & Literature'],
  'translation': ['Languages & Literature'],
  'literature': ['Languages & Literature'],
};

const DEMO_POSTER_URL = 'https://csp-media.sgp1.cdn.digitaloceanspaces.com/universities/posters/demo-pic.png';

// Get field categories based on internship name and company
const getFieldsForInternship = (name, company) => {
  const text = `${name} ${company}`.toLowerCase();
  const fields = [];

  // Check for matching keywords
  for (const [keyword, matchedFields] of Object.entries(FIELD_MAPPINGS)) {
    if (text.includes(keyword.toLowerCase())) {
      fields.push(...matchedFields);
    }
  }

  // Default to IT & Computer Science if no matches
  if (fields.length === 0) {
    fields.push('IT & Computer Science');
  }

  // Remove duplicates
  return [...new Set(fields)];
};

// Generate default duration if missing
const getDefaultDuration = (name, company) => {
  const text = `${name} ${company}`.toLowerCase();
  if (text.includes('summer')) return '2-3 months';
  if (text.includes('winter')) return '1-2 months';
  if (text.includes('semester')) return '3-4 months';
  return '2-3 months';
};

// Generate description if missing
const generateDescription = (name, company, duration) => {
  return `${name} internship opportunity at ${company || 'partner organization'}. Duration: ${duration}. This is a valuable opportunity to gain practical experience and develop professional skills.`;
};

// Create ai_metadata object
const createAiMetadata = (name, company, description) => {
  const fieldCategories = getFieldsForInternship(name, company);

  return {
    fieldCategories: fieldCategories,
    minGPA: 2.8,
    difficultyLevel: 'competitive',
    keywords: [name, company].filter(Boolean),
    description: description?.substring(0, 300) || '',
  };
};

const fillMissingData = async () => {
  try {
    console.log('🔧 Auto-filling missing internship data\n');

    await sequelize.sync();

    const internships = await Internship.findAll();
    console.log(`📊 Found ${internships.length} internships\n`);

    let updated = 0;
    let skipped = 0;

    for (const internship of internships) {
      try {
        let needsUpdate = false;
        const updates = {};

        // Check and fill only essential missing fields (keep to 12 core fields)
        // Core 12: id, name, description, company, duration, registration_link, 
        // original_link (computed), image_url, poster_image_url, slider_image_url, ai_metadata, (timestamps if enabled)
        
        if (!internship.description) {
          const defaultDuration = getDefaultDuration(internship.name, internship.company);
          updates.description = generateDescription(
            internship.name,
            internship.company,
            defaultDuration
          );
          needsUpdate = true;
          console.log(`   📝 Added description`);
        }

        if (!internship.duration) {
          updates.duration = getDefaultDuration(internship.name, internship.company);
          needsUpdate = true;
          console.log(`   ⏱️  Added duration: ${updates.duration}`);
        }

        if (!internship.registration_link) {
          updates.registration_link = 'https://example.com/register';
          needsUpdate = true;
          console.log(`   🔗 Added registration link`);
        }

        // Always regenerate AI metadata to ensure correct field categories for all 12 standard fields
        updates.ai_metadata = createAiMetadata(
          internship.name,
          internship.company,
          internship.description || updates.description
        );
        needsUpdate = true;

        // Use single image URL (poster_image_url) for all images - reduces redundancy
        if (!internship.poster_image_url && !internship.image_url && !internship.slider_image_url) {
          updates.poster_image_url = DEMO_POSTER_URL;
          needsUpdate = true;
          console.log(`   🖼️  Added image URL`);
        }

        if (needsUpdate) {
          await internship.update(updates);
          console.log(`✅ ${internship.name}`);
          updated++;
        } else {
          console.log(`⏭️  ${internship.name} (all fields complete)`);
          skipped++;
        }
      } catch (error) {
        console.error(`❌ Error updating ${internship.name}:`, error.message);
      }
    }

    console.log('\n========================================');
    console.log('✅ Auto-fill completed (12 core fields)!');
    console.log('========================================');
    console.log(`📊 Total internships: ${internships.length}`);
    console.log(`✏️  Updated: ${updated}`);
    console.log(`⏭️  Already complete: ${skipped}`);
    console.log('\n📋 Core 12 Fields:');
    console.log('  1. id (auto)');
    console.log('  2. name');
    console.log('  3. description');
    console.log('  4. company');
    console.log('  5. duration');
    console.log('  6. registration_link');
    console.log('  7. original_link (computed)');
    console.log('  8. image_url');
    console.log('  9. poster_image_url');
    console.log('  10. slider_image_url');
    console.log('  11. ai_metadata');
    console.log('  12. timestamps');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error filling data:', error);
    process.exit(1);
  }
};

fillMissingData();
