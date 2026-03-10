# Backend - AI Recommendation Engine

This folder contains the backend logic for the Cambodia Scholarship Portal, including AI-powered scholarship recommendation algorithms.

## Structure

```
backend/
├── api/                    # API endpoints and controllers
│   ├── scholarships.js    # Scholarship-related endpoints
│   └── recommendations.js # AI recommendation endpoints
├── services/              # Business logic services
│   └── ai/               # AI-related services
│       ├── huggingface.js        # HuggingFace API integration
│       └── recommendationEngine.js # Core recommendation logic
├── utils/                # Backend utilities
│   └── scholarshipMatcher.js # Matching algorithms
├── config/              # Configuration files
│   └── constants.js    # Constants and mappings
└── README.md          # This file
```

## Features

- **AI-Powered Recommendations**: Uses HuggingFace embeddings for semantic scholarship matching
- **Rule-Based Matching**: Fallback algorithm based on grades, subjects, and GPA
- **Student Profile Analysis**: Analyzes student strengths and recommends suitable fields
- **Match Scoring**: Calculates compatibility scores (0-100) between students and scholarships

## Usage

The backend services can be imported and used in the frontend:

```javascript
import { getAIRecommendations } from '@/backend/services/ai/huggingface';
import { getScholarshipRecommendations } from '@/backend/services/ai/recommendationEngine';
```

## Environment Variables

Required in `.env`:
- `VITE_HUGGINGFACE_API_KEY` - Your HuggingFace API key for AI features
