# Backend Folder Structure - Visual Guide

```
📁 Cambodia_Scholarship_Portal/
│
├── 📁 src/                          # Frontend Source Code
│   ├── 📁 features/                # Feature-based components
│   ├── 📁 pages/                   # Page components
│   ├── 📁 components/              # Shared components
│   ├── 📁 layouts/                 # Layout components
│   ├── 📁 data/                    # Static data
│   ├── 📁 assets/                  # Images, icons, etc.
│   │
│   └── 📁 backend/                 # ✨ NEW: Backend Logic (AI Engine)
│       │
│       ├── 📄 index.js            # 🚪 Main entry point - import from here!
│       ├── 📄 README.md           # 📖 Getting started guide
│       ├── 📄 MIGRATION.md        # 🔄 Migration guide
│       └── 📄 ARCHITECTURE.md     # 🏗️ Architecture details
│       │
│       ├── 📁 api/                # 🎯 API Controllers
│       │   └── 📄 scholarships.js     # Scholarship endpoints & filtering
│       │
│       ├── 📁 services/           # 💼 Business Logic
│       │   └── 📁 ai/            # 🤖 AI Services
│       │       ├── 📄 recommendationEngine.js  # Rule-based matching
│       │       └── 📄 huggingface.js          # AI-powered matching
│       │
│       ├── 📁 utils/              # 🛠️ Utilities
│       │   ├── 📄 profileAnalyzer.js   # GPA, grades analysis
│       │   └── 📄 fieldMatcher.js      # Field matching logic
│       │
│       └── 📁 config/             # ⚙️ Configuration
│           └── 📄 constants.js        # Constants, mappings, configs
│
├── 📁 public/                      # Static assets
├── 📄 package.json                # Dependencies
├── 📄 vite.config.js             # Vite configuration
└── 📄 README.md                  # Project README
```

---

## 🎯 Quick Navigation

### Want to use AI recommendations?
👉 Import from: `backend/index.js`
```javascript
import { getAIRecommendations } from './backend';
```

### Want to calculate GPA?
👉 Import from: `backend/index.js`
```javascript
import { calculateGPA } from './backend';
```

### Want to understand the architecture?
👉 Read: `backend/ARCHITECTURE.md`

### Migrating old code?
👉 Read: `backend/MIGRATION.md`

---

## 📊 Module Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Components                       │
│          (ProfilePage, AIRecommendations, etc.)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ import from 'backend'
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    backend/index.js                          │
│                 (Central Export Point)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ↓              ↓              ↓
┌──────────────┐ ┌─────────────┐ ┌────────────┐
│  API Layer   │ │Service Layer│ │Utils Layer │
│              │ │             │ │            │
│scholarships.js│ │ai/hugging..│ │profile...  │
│              │ │ai/recommend│ │field...    │
└──────────────┘ └──────┬──────┘ └─────┬──────┘
                        │              │
                        └──────┬───────┘
                               ↓
                    ┌────────────────────┐
                    │   Config Layer     │
                    │   constants.js     │
                    └────────────────────┘
```

---

## 🔄 Data Flow Example: Getting AI Recommendations

```
1️⃣  User Profile Component
    └── calls getAIRecommendations()
         │
         ↓
2️⃣  backend/index.js
    └── exports from services/ai/huggingface.js
         │
         ↓
3️⃣  services/ai/huggingface.js
    ├── Uses utils/profileAnalyzer.js (calculateGPA)
    ├── Uses services/ai/recommendationEngine.js (getText functions)
    └── Uses config/constants.js (AI_CONFIG)
         │
         ↓
4️⃣  Returns scored scholarships
    └── Component displays recommendations
```

---

## 🎨 Color Legend

- 📁 = Folder
- 📄 = File
- 🚪 = Entry Point (import from here)
- 📖 = Documentation
- 🔄 = Migration Info
- 🏗️ = Architecture
- 🎯 = API/Controllers
- 💼 = Business Logic
- 🤖 = AI Services
- 🛠️ = Utilities
- ⚙️ = Configuration

---

## 📝 File Size & Complexity

| File | Lines | Complexity | Purpose |
|------|-------|-----------|---------|
| `index.js` | ~40 | ⭐ Low | Export central |
| `constants.js` | ~90 | ⭐ Low | Data only |
| `profileAnalyzer.js` | ~70 | ⭐⭐ Medium | Pure functions |
| `fieldMatcher.js` | ~60 | ⭐⭐ Medium | Matching logic |
| `recommendationEngine.js` | ~150 | ⭐⭐⭐ High | Core algorithm |
| `huggingface.js` | ~200 | ⭐⭐⭐ High | AI integration |
| `scholarships.js` | ~100 | ⭐⭐ Medium | API controllers |

---

## ✨ Benefits Summary

### Before
- ❌ All logic in 2 large files
- ❌ Mixed concerns
- ❌ Hard to maintain
- ❌ Difficult to test
- ❌ No clear organization

### After
- ✅ Organized into 7 focused modules
- ✅ Clear separation of concerns
- ✅ Easy to maintain and extend
- ✅ Testable components
- ✅ Professional structure
- ✅ Scalable architecture

---

## 🚀 Quick Start

### For Developers

**Step 1**: Import what you need
```javascript
import { 
  getAIRecommendations,
  calculateGPA,
  SUBJECTS 
} from './backend';
```

**Step 2**: Use it
```javascript
const gpa = calculateGPA(userGrades);
const recommendations = await getAIRecommendations(profile, scholarships);
```

**That's it!** No need to know the internal structure.

---

## 📚 Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| `README.md` | Getting started | All |
| `MIGRATION.md` | Migration guide | Existing developers |
| `ARCHITECTURE.md` | Technical details | Advanced developers |
| `STRUCTURE.md` | Visual guide (this) | All |

---

**Created**: 2026-03-06  
**Status**: ✅ Active  
**Next Review**: As needed
