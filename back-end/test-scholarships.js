import sequelize from './src/db/database.js';

(async () => {
  try {
    // Check: Scholarship 2044 fields
    const [results] = await sequelize.query(`
      SELECT s.id, s.name, sfs.field_name 
      FROM scholarship s
      LEFT JOIN scholarship_field_of_study sfs ON s.id = sfs.scholarship_id
      WHERE s.id = 2044
    `);
    console.log('Scholarship ID 2044 fields:');
    results.forEach(r => console.log('-', r.name, '→', r.field_name));
    
    // Count total scholarships with fields
    const [counts] = await sequelize.query(`
      SELECT COUNT(DISTINCT s.id) as with_fields,
             (SELECT COUNT(*) FROM scholarship) as total_scholarships
      FROM scholarship s
      INNER JOIN scholarship_field_of_study sfs ON s.id = sfs.scholarship_id
    `);
    console.log('\nDatabase stats:');
    console.log('- Scholarships WITH fields:', counts[0].with_fields);
    console.log('- Total scholarships:', counts[0].total_scholarships);
    console.log('- Scholarships WITHOUT fields:', counts[0].total_scholarships - counts[0].with_fields);
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
