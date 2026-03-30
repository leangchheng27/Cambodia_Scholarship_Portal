// Script to check internship ai_metadata field contents
import 'dotenv/config';
import sequelize from '../src/db/database.js';
import InternshipModel from '../src/models/internship/Internship.js';

const Internship = InternshipModel;

const checkMetadata = async () => {
    try {
        await sequelize.sync();

        const internships = await Internship.findAll({ limit: 10, raw: true });
        
        console.log('\n🔍 Checking Internship AI Metadata:\n');
        
        let hasMetadata = 0;
        let missingMetadata = 0;
        
        internships.forEach((internship, index) => {
            console.log(`${index + 1}. ${internship.name}`);
            if (internship.ai_metadata) {
                hasMetadata++;
                console.log(`   ✅ Has AI Metadata: ${JSON.stringify(internship.ai_metadata).substring(0, 100)}...`);
            } else {
                missingMetadata++;
                console.log(`   ⚠️  No AI Metadata`);
            }
        });
        
        console.log(`\n📊 Summary: ${hasMetadata} with metadata, ${missingMetadata} without`);
        
        // Check the database schema directly
        console.log('\n🗄️  Database Column Check:');
        const table = await sequelize.getQueryInterface().describeTable('internship');
        if (table['ai_metadata']) {
            console.log(`✅ ai_metadata column exists`);
            console.log(`   Type: ${table['ai_metadata'].type}`);
        } else {
            console.log(`❌ ai_metadata column does NOT exist`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking metadata:', error.message);
        process.exit(1);
    }
};

checkMetadata();
