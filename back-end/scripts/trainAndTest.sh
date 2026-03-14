#!/bin/bash
# AI Training & Testing Script for 30 Users

echo "🚀 STEP 1: Generate 30 Fake Users with Training Data"
echo "====================================================="
node scripts/createFakeUsersForTraining.js

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Step 1 Complete: 30 fake users created!"
  echo ""
  
  echo "📊 STEP 2: Export Training Data"
  echo "================================"
  echo "Run this curl command to export training data:"
  echo ""
  echo "curl -X GET http://localhost:3000/api/feedback/training-data -H 'Authorization: Bearer YOUR_TOKEN' > training_data.json"
  echo ""
  echo "Or manually visit: http://localhost:3000/api/feedback/training-data"
  echo ""
  
  echo "🤖 STEP 3: Fine-tune AI Model"
  echo "=============================="
  echo "Once you have training_data.json, run:"
  echo ""
  echo "python scripts/finetune_model.py"
  echo ""
  
  echo "🧪 STEP 4: Test AI Recommendations"
  echo "==================================="
  echo "After fine-tuning, check admin dashboard:"
  echo "http://localhost:5173/admin/ai-analytics"
  echo ""
  echo "Test recommendations with different user profiles:"
  echo ""
  echo "Test Case 1: Science Student (High GPA)"
  echo "  Expected: STEM scholarships ranked higher"
  echo ""
  echo "Test Case 2: Business Student (Medium GPA)"
  echo "  Expected: Business/Economics scholarships ranked higher"
  echo ""
  echo "Test Case 3: Student with Low Grade"
  echo "  Expected: Scholarships with lower GPA requirements"
  echo ""
  echo "✨ All Steps Complete!"
else
  echo "❌ Error generating fake users. Check database connection."
  exit 1
fi
