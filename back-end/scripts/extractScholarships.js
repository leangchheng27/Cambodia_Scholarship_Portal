import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Extract scholarship data from JavaScript files and convert to JSON
 * Removes image imports and image properties
 */

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const cambodiaFilePath = path.join(__dirname, '../../front-end/src/data/cambodiaScholarships.js');
const abroadFilePath = path.join(__dirname, '../../front-end/src/data/abroadScholarships.js');
const outputPath = path.join(__dirname, 'scholarshipSeedData.json');

/**
 * Remove image imports and convert JS file to JSON-parseable format
 */
function extractArrayFromFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove all import statements (lines starting with 'import')
  content = content.replace(/import\s+.*?from\s+['"].*?['"];?\n/g, '');

  // Remove single-line comments (// comments)
  content = content.replace(/\/\/.*$/gm, '');

  // Remove multi-line comments (/* comments */)
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Extract the array content between [ and ]
  // Match: export const scholarshipName = [ ... ];
  const arrayMatch = content.match(/export\s+const\s+\w+\s+=\s+(\[\s*[\s\S]*?\]);/);
  
  if (!arrayMatch) {
    throw new Error(`Could not find exported array in ${filePath}`);
  }

  let arrayContent = arrayMatch[1];

  // Remove the image property from each object
  // This regex removes lines like "image: cambodia1," or "image: abroad1,"
  arrayContent = arrayContent.replace(/^\s*image:\s*\w+,?\s*$/gm, '');

  // Remove trailing commas before closing braces/brackets
  arrayContent = arrayContent.replace(/,(\s*[}\]])/g, '$1');

  // Convert unquoted property names to quoted (valid JavaScript object notation to JSON)
  // Match: word: (text/number/object/array) and convert to "word": 
  arrayContent = arrayContent.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // Convert single quotes to double quotes
  arrayContent = arrayContent.replace(/'/g, '"');

  // Remove any remaining whitespace issues
  arrayContent = arrayContent.replace(/:\s*undefined/g, ':null');

  // Parse and re-stringify to ensure valid JSON
  try {
    const parsed = JSON.parse(arrayContent);
    return parsed;
  } catch (error) {
    // If still fails, log the problematic content for debugging
    console.error(`\n❌ JSON Parse Error Details:`);
    console.error(`File: ${filePath}`);
    console.error(`Error: ${error.message}`);
    // Log first 800 chars of the problematic content
    console.error(`Content preview:\n${arrayContent.substring(0, 800)}`);
    throw error;
  }
}

/**
 * Main extraction function
 */
function extractAndSaveScholarships() {
  try {
    console.log('🔍 Extracting cambodia scholarships...');
    const cambodiaScholarships = extractArrayFromFile(cambodiaFilePath);
    console.log(`✅ Extracted ${cambodiaScholarships.length} cambodia scholarships`);

    console.log('🔍 Extracting abroad scholarships...');
    const abroadScholarships = extractArrayFromFile(abroadFilePath);
    console.log(`✅ Extracted ${abroadScholarships.length} abroad scholarships`);

    // Combine into final structure
    const seedData = {
      cambodia: cambodiaScholarships,
      abroad: abroadScholarships
    };

    // Write to JSON file
    console.log(`📝 Writing to ${outputPath}...`);
    fs.writeFileSync(
      outputPath,
      JSON.stringify(seedData, null, 2),
      'utf-8'
    );

    console.log(`✨ Success! Extracted ${cambodiaScholarships.length + abroadScholarships.length} total scholarships`);
    console.log(`📂 Saved to: ${outputPath}`);

    return seedData;
  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Always execute this script when called directly
console.log('Starting scholarship extraction...');
extractAndSaveScholarships();

export { extractAndSaveScholarships };
