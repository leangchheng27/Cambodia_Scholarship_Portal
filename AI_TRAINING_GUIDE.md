# AI Training Workflow Guide

## Overview
This guide explains how to train the AI recommendation system using fake user data.

## Complete Workflow

### Step 1: Generate Fake User Accounts & Training Data
```bash
cd back-end
node scripts/createFakeUsersForTraining.js
```

**What this does:**
- Creates 10 test users with different profiles (science/business/humanities)
- Each user has GPA, grade, major fields, and student type
- Simulates realistic interactions (view, click, save, dismiss) with 150 scholarships
- Generates 300-500 feedback records from diverse user interactions

**Output:**
```
✅ Created user: Emma Science (ID: 1)
   → Generated 35 interactions
✅ Created user: Vinh STEM (ID: 2)
   → Generated 42 interactions
... (8 more users)

✅ Training data generation complete!
📊 Summary:
   • Fake users created: 10
   • Total feedback records: 385
```

---

### Step 2: Export Training Data
```bash
curl http://localhost:5000/api/feedback/training-data > training_data.json
```

Or via API:
```javascript
// GET /api/feedback/training-data
{
  "trainingPairs": [
    {
      "userText": "GPA: 3.7, Major: Physics, Chemistry, Mathematics",
      "scholarshipText": "STEM Education Excellence... minimum GPA 3.3",
      "label": 1.0  // User saved (strong positive)
    },
    {
      "userText": "GPA: 3.7, Major: Physics, Chemistry, Mathematics",
      "scholarshipText": "Business & Economics Scholarship... minimum GPA 3.2",
      "label": -0.2  // User dismissed (negative)
    }
    // ... more pairs
  ]
}
```

**How labels are calculated:**
- **Save**: +3 points = Strong positive signal (label 1.0)
- **Click**: +2 points = Weak positive signal (label 0.5)
- **View**: +1 point = Very weak signal (label 0.25)
- **Dismiss**: -2 points = Negative signal (label 0.0)

---

### Step 3: Fine-tune AI Model
```bash
cd back-end/scripts
python finetune_model.py
```

**What this does:**
1. Loads the training pairs
2. Converts them to embeddings using Hugging Face
3. Fine-tunes the sentence-transformers model
4. Saves updated model weights locally
5. AI system uses the fine-tuned model for better recommendations

**Output:**
```
Loading training data...
Found 385 training pairs
Fine-tuning model on sentence-transformers/all-MiniLM-L6-v2...
Epoch 1/10: Loss = 0.45
Epoch 2/10: Loss = 0.38
...
✅ Model fine-tuned successfully!
Saved to: models/fine_tuned_model
```

---

### Step 4: Test the Trained AI
Visit the admin dashboard to see AI metrics:
- **Recommendation Quality**: % of recommended scholarships clicked by users
- **Engagement Rate**: Click-through rate on AI recommendations
- **Top Recommended**: Most frequently recommended scholarships
- **User Feedback Distribution**: View/Click/Save/Dismiss breakdown

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Fake Users (10 accounts)                                    │
│ • Science students (Emma, Vinh, Alicia, Raj, James)        │
│ • Business students (Kamal, Sofia)                          │
│ • Humanities/Social (Marco, Priya, Diana)                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ (Simulate interactions)
┌─────────────────────────────────────────────────────────────┐
│ UserFeedback Table (300-500 records)                        │
│ • User ID, Scholarship ID, Action (view/click/save/dismiss)│
│ • Timestamp, Score calculated from action                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ (Export via /feedback/training-data API)
┌─────────────────────────────────────────────────────────────┐
│ Training Data (JSON)                                        │
│ {                                                           │
│   "userText": "GPA 3.7, Major: Physics, Chemistry...",     │
│   "scholarshipText": "STEM Excellence... minGPA 3.3...",   │
│   "label": 1.0                                             │
│ }                                                           │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ (Fine-tune using finetune_model.py)
┌─────────────────────────────────────────────────────────────┐
│ Fine-tuned AI Model                                         │
│ (sentence-transformers with custom weights)                 │
│ • Better at understanding user preferences                 │
│ • Learns patterns from real feedback data                  │
│ • Improves over time with more interactions                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼ (Used by getAIRecommendations())
┌─────────────────────────────────────────────────────────────┐
│ Better Scholarship Recommendations                          │
│ • More relevant matches                                     │
│ • Higher engagement rates                                   │
│ • Reduced dismiss rates                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Files

| File | Purpose |
|------|---------|
| `scripts/createFakeUsersForTraining.js` | Creates fake users & simulates interactions |
| `src/models/feedback/UserFeedback.js` | Stores user interactions for training |
| `src/routes/feedbackRoutes.js` | `/feedback/training-data` endpoint |
| `scripts/finetune_model.py` | Fine-tunes AI model on training data |
| `src/utils/huggingface.js` | Uses fine-tuned model for recommendations |

---

## Important Notes

### Minimum Training Data
- **Threshold**: 50+ feedback records for fine-tuning to be effective
- **Optimal**: 200+ records for good pattern learning
- **Current**: 385 records from 10 fake users ✅

### How AI Learns
1. **Semantic Understanding**: Learns what makes scholarships suitable for users
2. **Field Matching**: Understands relationship between student majors and scholarship categories
3. **GPA Patterns**: Learns optimal GPA ranges for different scholarships
4. **User Behavior**: Patterns in which scholarships users find valuable

### Production Considerations
- **Real Data**: Replace fake users with real user feedback over time
- **Continuous Learning**: Model improves as more users interact
- **A/B Testing**: Compare old vs new model recommendations
- **Monitoring**: Track recommendation quality metrics

---

## Quick Start Commands

```bash
# 1. Generate training data
cd back-end
node scripts/createFakeUsersForTraining.js

# 2. Export to file (optional)
curl http://localhost:5000/api/feedback/training-data > training_data.json

# 3. Fine-tune model
cd scripts
python finetune_model.py

# 4. Restart backend to use new model
# (or the app auto-reloads it)

# 5. Test in admin dashboard
# Visit: http://localhost:5173/admin/ai-analytics
```

---

## Expected Results

After training with fake data, you should see:
- ✅ Scholarships matched by field (science students see science scholarships)
- ✅ GPA-appropriate recommendations (high GPA students see competitive scholarships)
- ✅ Higher click-through rates on recommendations
- ✅ More saved scholarships from recommended results
- ✅ Fewer dismissals of recommendations

---

## Next Steps

1. **Run the fake user generation** to create training data
2. **Monitor admin dashboard** to see AI performance metrics
3. **Gather real user feedback** as actual students use the system
4. **Periodically retrain** (weekly/monthly) with accumulated real data
5. **A/B test** recommendations: show some users rule-based, others AI-based
