import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import fs from 'fs';

const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

try {
  console.log('📊 Exporting training data from database...\n');
  
  // Get all user feedback with user and scholarship info
  const [feedbacks] = await seq.query(`
    SELECT 
      uf.userId,
      uf.scholarshipId,
      uf.scholarshipType,
      uf.action,
      uf.score,
      uf.userProfile,
      u.name as userName,
      u.email
    FROM user_feedback uf
    JOIN users u ON uf.userId = u.id
    ORDER BY uf.userId, uf.createdAt
  `);

  console.log(`✅ Fetched ${feedbacks.length} feedback records\n`);

  // Transform into training pairs
  const trainingPairs = feedbacks.map(fb => {
    const profile = typeof fb.userProfile === 'string' ? JSON.parse(fb.userProfile) : fb.userProfile;
    
    const userText = `GPA: ${profile.gpa}, Grade: ${profile.grade}, Major: ${profile.majorFields.join(', ')}, Type: ${profile.studentType}`;
    const scholarshipText = `Scholarship ID: ${fb.scholarshipId}, Type: ${fb.scholarshipType}`;
    
    // Label mapping: higher scores = more positive signal
    const labelMap = {
      'view': 0.25,
      'click': 0.5,
      'save': 1.0,
      'apply': 1.0,
      'dismiss': 0.0
    };
    
    return {
      userText,
      scholarshipText,
      label: labelMap[fb.action] || 0.5,
      action: fb.action,
      score: fb.score,
      userId: fb.userId,
      userName: fb.userName
    };
  });

  // Split into train (80%) and validation (20%) sets
  const shuffled = trainingPairs.sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(shuffled.length * 0.8);
  const trainData = shuffled.slice(0, splitIndex);
  const valData = shuffled.slice(splitIndex);

  // Convert to sentence-transformers format (sentence1, sentence2, label)
  const trainExamples = trainData.map(p => ({
    sentence1: p.userText,
    sentence2: p.scholarshipText,
    label: p.label,
  }));

  const valExamples = valData.map(p => ({
    sentence1: p.userText,
    sentence2: p.scholarshipText,
    label: p.label,
  }));

  // Count by action
  const actionCounts = {};
  trainingPairs.forEach(pair => {
    actionCounts[pair.action] = (actionCounts[pair.action] || 0) + 1;
  });

  // Save to file
  const outputPath = 'training_data.json';
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    train_data: trainExamples,
    val_data: valExamples,
    total_pairs: trainingPairs.length,
    label_distribution: actionCounts
  }, null, 2));

  console.log(`\n✅ Training data exported to: ${outputPath}`);
  console.log(`\n📈 Summary:`);
  console.log(`  Total training pairs: ${trainingPairs.length}`);
  console.log(`  Train/Val split: ${trainExamples.length}/${valExamples.length}`);
  
  console.log(`\n  Distribution by action:`);
  Object.entries(actionCounts).forEach(([action, count]) => {
    console.log(`    ${action}: ${count} pairs`);
  });

  console.log(`\n🎯 Next Step: Run fine-tuning`);
  console.log(`  python scripts/finetune_model.py\n`);

  await seq.close();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
