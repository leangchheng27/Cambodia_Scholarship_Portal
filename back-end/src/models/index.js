import University from './university/University.js';
import UniversityMajor from './university/UniversityMajor.js';
import UniversityApplicationGuideStep from './university/UniversityApplicationGuideStep.js';
import UniversityTuitionFee from './university/UniversityTuitionFee.js';
import UniversityCampus from './university/UniversityCampus.js';
import UniversityNews from './university/UniversityNews.js';
import UniversityStudentAchievement from './university/UniversityStudentAchievement.js';

import Scholarship from './scholarship/Scholarship.js';
import ScholarshipBenefit from './scholarship/ScholarshipBenefit.js';
import ScholarshipDeadline from './scholarship/ScholarshipDeadline.js';
import ScholarshipEligibility from './scholarship/ScholarshipEligibility.js';
import ScholarshipFieldOfStudy from './scholarship/ScholarshipFieldOfStudy.js';

import Saved from './saved/saved.js';

// Initialize all associations
const initializeModels = () => {
  // University associations
  University.hasMany(UniversityMajor, { foreignKey: 'university_id' });
  University.hasMany(UniversityApplicationGuideStep, { foreignKey: 'university_id' });
  University.hasMany(UniversityTuitionFee, { foreignKey: 'university_id' });
  University.hasMany(UniversityCampus, { foreignKey: 'university_id' });
  University.hasMany(UniversityNews, { foreignKey: 'university_id' });
  University.hasMany(UniversityStudentAchievement, { foreignKey: 'university_id' });

  UniversityMajor.belongsTo(University, { foreignKey: 'university_id' });
  UniversityApplicationGuideStep.belongsTo(University, { foreignKey: 'university_id' });
  UniversityTuitionFee.belongsTo(University, { foreignKey: 'university_id' });
  UniversityCampus.belongsTo(University, { foreignKey: 'university_id' });
  UniversityNews.belongsTo(University, { foreignKey: 'university_id' });
  UniversityStudentAchievement.belongsTo(University, { foreignKey: 'university_id' });

  // Saved — no associations needed for now
};

export {
  University,
  UniversityMajor,
  UniversityApplicationGuideStep,
  UniversityTuitionFee,
  UniversityCampus,
  UniversityNews,
  UniversityStudentAchievement,
  Scholarship,
  ScholarshipBenefit,
  ScholarshipDeadline,
  ScholarshipEligibility,
  ScholarshipFieldOfStudy,
  Saved,
  initializeModels,
};