# Backend Architecture Documentation

## 📁 Folder Structure

```
backend/
├── api/                           # API Controllers & Endpoints
│   └── scholarships.js           # Scholarship-related endpoints
│
├── services/                      # Business Logic Layer
│   └── ai/                       # AI Services
│       ├── recommendationEngine.js  # Core recommendation algorithm
│       └── huggingface.js          # HuggingFace AI integration
│
├── utils/                        # Utility Functions
│   ├── profileAnalyzer.js       # Student profile analysis
│   └── fieldMatcher.js          # Field matching algorithms
│
├── config/                       # Configuration
│   └── constants.js             # Constants, mappings, configs
│
├── index.js                      # Main export file
├── README.md                     # Getting started
├── MIGRATION.md                  # Migration guide
└── ARCHITECTURE.md              # This file
```

## 🏗️ Architecture Layers

### 1. API Layer (`/api`)
**Purpose**: Handle HTTP requests and responses (future)

**Current Files**:
- `scholarships.js`: Scholarship endpoints and filtering logic

**Responsibilities**:
- Request validation
- Response formatting
- Error handling
- API versioning (future)

### 2. Service Layer (`/services`)
**Purpose**: Core business logic

**Current Structure**:
```
services/
└── ai/
    ├── recommendationEngine.js  # Rule-based matching
    └── huggingface.js          # AI-powered matching
```

**Responsibilities**:
- Recommendation algorithms
- AI integration
- Business rules
- Data processing

### 3. Utility Layer (`/utils`)
**Purpose**: Reusable helper functions

**Current Files**:
- `profileAnalyzer.js`: GPA calculation, subject analysis, validation
- `fieldMatcher.js`: Field matching and mapping

**Responsibilities**:
- Pure functions
- No side effects
- Testable utilities
- Data transformations

### 4. Configuration Layer (`/config`)
**Purpose**: Application configuration

**Current Files**:
- `constants.js`: All constants, mappings, and configs

**Responsibilities**:
- Configuration management
- Environment variables
- Constants and mappings
- Feature flags (future)

## 🔄 Data Flow

```
Frontend Component
       ↓
   backend/index.js (Import)
       ↓
   Service Layer (AI/Recommendation)
       ↓
   Utility Layer (Calculations)
       ↓
   Config Layer (Constants)
       ↓
   Return Results
```

### Example Flow: Get AI Recommendations

```javascript
// 1. Frontend calls API
import { getAIRecommendations } from '../backend';
const recommendations = await getAIRecommendations(profile, scholarships);

// 2. Goes to huggingface.js service
export async function getAIRecommendations(...) {
  // 3. Uses utilities
  const gpa = calculateGPA(userProfile.grades);
  const text = getUserProfileEmbeddingText(userProfile);
  
  // 4. Accesses configuration
  const model = AI_CONFIG.EMBEDDING_MODEL;
  
  // 5. Returns processed results
  return scoredScholarships;
}
```

## 📦 Module Exports

### Main Export (`backend/index.js`)
Central export point for all backend functionality:

```javascript
// AI Services
export { 
  getAIRecommendations,
  getScholarshipRecommendations 
} from './services/ai/...';

// Utilities
export { 
  calculateGPA,
  analyzeStrongSubjects 
} from './utils/...';

// Constants
export { 
  SUBJECTS,
  GRADE_POINTS 
} from './config/constants.js';
```

## 🧩 Component Details

### RecommendationEngine (`services/ai/recommendationEngine.js`)

**Purpose**: Core rule-based recommendation algorithm

**Key Functions**:
- `calculateMatchScore()`: Calculate 0-100 match score
- `getScholarshipRecommendations()`: Get top N recommendations
- `generateMatchReasons()`: Explain why scholarship matches

**Algorithm**:
1. **Student Type Match** (20 pts): Check science/society compatibility
2. **Field Match** (40 pts): Match recommended fields with scholarship
3. **GPA Requirements** (20 pts): Verify GPA eligibility
4. **Subject Match** (20 pts): Check required subjects

### HuggingFace Service (`services/ai/huggingface.js`)

**Purpose**: AI-powered semantic matching

**Key Functions**:
- `generateEmbedding()`: Generate embedding vectors
- `getAIRecommendations()`: AI-based recommendations
- `precomputeScholarshipEmbeddings()`: Cache embeddings

**Process**:
1. Generate user profile embedding
2. Generate scholarship embeddings
3. Calculate cosine similarity
4. Apply eligibility filters
5. Return sorted results

### Profile Analyzer (`utils/profileAnalyzer.js`)

**Purpose**: Analyze student academic profiles

**Functions**:
- `calculateGPA()`: Calculate GPA from grades
- `analyzeStrongSubjects()`: Find subjects with A/B grades
- `getPerformanceLevel()`: Categorize performance
- `validateProfile()`: Ensure profile completeness

### Field Matcher (`utils/fieldMatcher.js`)

**Purpose**: Match subjects to recommended fields

**Functions**:
- `getRecommendedFields()`: Get recommended fields from grades
- `isFieldMatch()`: Check if field matches recommendations
- `getMatchingFields()`: Find overlapping fields

## 🔧 Configuration

### Constants (`config/constants.js`)

**SUBJECT_FIELD_MAPPING**:
Maps subject combinations to recommended fields:
```javascript
science: {
  'Math-Physics': ['Engineering', 'Computer Science', ...],
  'Biology-Chemistry': ['Medicine', 'Pharmacy', ...]
}
```

**GRADE_POINTS**:
Grade to GPA conversion:
```javascript
{ 'A': 4.0, 'B': 3.0, 'C': 2.0, ... }
```

**AI_CONFIG**:
AI service configuration:
```javascript
{
  EMBEDDING_MODEL: 'sentence-transformers/all-MiniLM-L6-v2',
  CACHE_KEY: 'scholarship_embeddings',
  DEFAULT_LIMIT: 10
}
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
Each module has a single, well-defined responsibility.

### 2. **DRY (Don't Repeat Yourself)**
Common logic extracted into reusable utilities.

### 3. **Single Source of Truth**
Constants defined once in config layer.

### 4. **Modularity**
Small, focused modules that can be tested independently.

### 5. **Scalability**
Structure supports growth into full backend service.

### 6. **Backward Compatibility**
Frontend imports work seamlessly with new structure.

## 🔐 Security Considerations

### API Keys
- HuggingFace API key stored in environment variables
- Never commit API keys to version control
- Use `.env` file for local development

### Data Validation
- Validate user inputs in utils/profileAnalyzer.js
- Sanitize data before processing
- Check data types and ranges

## 🧪 Testing Strategy

### Unit Tests
Each module should have unit tests:
```javascript
// profileAnalyzer.test.js
test('calculateGPA returns correct GPA', () => {
  const grades = { 'Math': 'A', 'Physics': 'B' };
  expect(calculateGPA(grades)).toBe(3.5);
});
```

### Integration Tests
Test module interactions:
```javascript
// recommendationEngine.test.js
test('getScholarshipRecommendations returns sorted list', () => {
  const results = getScholarshipRecommendations(profile, scholarships);
  expect(results[0].matchScore).toBeGreaterThan(results[1].matchScore);
});
```

## 📊 Performance Optimization

### Caching
- Cache AI embeddings in localStorage
- Precompute scholarship embeddings
- Cache recommendation results

### Lazy Loading
- Load AI service only when needed
- Defer embedding generation

### Batch Processing
- Process multiple scholarships efficiently
- Parallel API calls where possible

## 🚀 Future Enhancements

### Phase 1: API Server
- Express.js server
- REST API endpoints
- JWT authentication

### Phase 2: Database
- PostgreSQL for data storage
- Prisma ORM
- Migration scripts

### Phase 3: Advanced Features
- Machine learning model training
- Real-time recommendations
- Analytics dashboard
- A/B testing

### Phase 4: Microservices
- Split into microservices
- Message queue (RabbitMQ)
- Service mesh
- Docker containers

## 📝 Coding Standards

### File Naming
- camelCase for files: `profileAnalyzer.js`
- PascalCase for React components
- Descriptive names

### Function Naming
- Verbs for functions: `calculateGPA()`, `getRecommendations()`
- Clear and descriptive
- No abbreviations

### Comments
- JSDoc for all functions
- Explain "why" not "what"
- Keep comments updated

### Imports
- Absolute imports from backend
- Group by category
- Alphabetical order

## 🤝 Contributing

### Adding New Features
1. Identify the appropriate layer (api/service/util/config)
2. Create new module or extend existing
3. Update index.js exports
4. Write tests
5. Update documentation

### Modifying Existing Code
1. Maintain backward compatibility
2. Update affected tests
3. Update documentation
4. Consider migration impact

---

**Last Updated**: 2026-03-06  
**Version**: 1.0.0  
**Maintainer**: Development Team
