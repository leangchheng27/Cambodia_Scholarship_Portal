// Import scholarship images
import abroad1 from '../assets/abroad/1.png';
import abroad2 from '../assets/abroad/2.png';
import abroad3 from '../assets/abroad/3.png';

export const abroadScholarships = [
  {
    id: 1,
    image: abroad1,
    title: 'Fulbright Scholarship Program',
    description: 'Educational exchange opportunity for students and professionals',
    deadline: 'មិថុនា ១៥, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['All Fields', 'Engineering', 'Science', 'Business', 'Social Sciences', 'Arts', 'Humanities'],
      requiredSubjects: ['English'],
      minGPA: 3.5,
      difficultyLevel: 'very-competitive',
      keywords: ['fulbright', 'usa', 'america', 'graduate', 'masters', 'phd', 'research', 'prestigious']
    },
    details: {
      title: 'Fulbright Scholarship Program',
      subtitle: 'U.S. Government\'s International Educational Exchange Program',
      fundedBy: 'U.S. Department of State',
      fieldsOfStudy: 'All fields of study',
      courseDuration: 'Master\'s: 2 years, PhD: 3-5 years',
      deadlines: [
        { institute: 'Master\'s Programs', date: 'June 15, 2026' },
        { institute: 'PhD Programs', date: 'July 1, 2026' }
      ],
      registrationLinks: {
        website: 'www.fulbright.org',
        telegram: 'Contact U.S. Embassy'
      },
      overseasInfo: {
        telegram: 'https://t.me/fulbright_cambodia',
        facebook: 'https://www.facebook.com/FulbrightCambodia'
      },
      programs: [
        'Master\'s Degree Programs in any field',
        'PhD Programs in any field',
        'Research Programs',
        'Teaching Assistantships',
        'Professional Development Programs'
      ],
      benefits: [
        'Full tuition coverage',
        'Monthly living stipend',
        'Round-trip airfare to the United States',
        'Health insurance',
        'Accident coverage',
        'Pre-departure orientation',
        'Professional development opportunities',
        'Access to Fulbright alumni network'
      ],
      eligibility: [
        'Cambodian citizenship required',
        'Bachelor\'s degree with excellent academic record',
        'English proficiency (TOEFL/IELTS required)',
        'Leadership potential and commitment to return to Cambodia',
        'No prior study in the United States for more than one year',
        'Strong motivation to contribute to Cambodia\'s development'
      ]
    }
  },
  {
    id: 2,
    image: abroad2,
    title: 'Chevening Scholarships',
    description: 'UK government scholarships for future leaders',
    deadline: 'កក្កដា ២០, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Business Administration', 'Management', 'International Relations', 'Public Policy', 'Engineering', 'Science', 'Arts', 'Humanities'],
      requiredSubjects: ['English'],
      minGPA: 3.3,
      difficultyLevel: 'very-competitive',
      keywords: ['chevening', 'uk', 'britain', 'leadership', 'masters', 'work experience']
    },
    details: {
      title: 'Chevening Scholarships',
      subtitle: 'UK Government\'s Global Scholarship Programme',
      fundedBy: 'Foreign, Commonwealth & Development Office (FCDO)',
      fieldsOfStudy: 'All fields available at UK universities',
      courseDuration: '1 year Master\'s degree',
      deadlines: [
        { institute: 'All UK Universities', date: 'July 20, 2026' }
      ],
      registrationLinks: {
        website: 'www.chevening.org',
        telegram: 'Contact British Embassy'
      },
      overseasInfo: {
        telegram: 'https://t.me/chevening_cambodia',
        facebook: 'https://www.facebook.com/CheveningCambodia'
      },
      programs: [
        'Master\'s in Business and Management',
        'Master\'s in International Relations',
        'Master\'s in Public Policy',
        'Master\'s in Engineering',
        'Master\'s in Sciences',
        'Master\'s in Arts and Humanities'
      ],
      benefits: [
        'Full tuition fees covered',
        'Monthly living allowance',
        'Return airfare to the UK',
        'Arrival allowance',
        'Thesis grant',
        'Travel grant for attending Chevening events',
        'Access to exclusive Chevening community'
      ],
      eligibility: [
        'Citizen of Cambodia',
        'Minimum 2 years work experience',
        'Undergraduate degree (equivalent to UK upper second-class)',
        'Meet English language requirement',
        'Apply to three eligible UK university courses',
        'Return to Cambodia for minimum 2 years after scholarship'
      ]
    }
  },
  {
    id: 3,
    image: abroad3,
    title: 'DAAD Scholarships',
    description: 'German Academic Exchange Service scholarships',
    deadline: 'សីហា ១០, ២០២៦',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Engineering', 'Natural Sciences', 'Economics', 'Business Administration', 'Development Studies', 'Mathematics', 'Computer Science'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['daad', 'germany', 'engineering', 'science', 'development', 'masters', 'phd']
    },
    details: {
      title: 'DAAD Scholarships',
      subtitle: 'German Academic Exchange Service Scholarship Programme',
      fundedBy: 'DAAD (Deutscher Akademischer Austauschdienst)',
      fieldsOfStudy: 'Engineering, Sciences, Economics, Development Studies',
      courseDuration: 'Master\'s: 1-2 years, PhD: 3-4 years',
      deadlines: [
        { institute: 'Master\'s Programs', date: 'August 10, 2026' },
        { institute: 'PhD Programs', date: 'September 15, 2026' }
      ],
      registrationLinks: {
        website: 'www.daad.de',
        telegram: 'Contact German Embassy'
      },
      overseasInfo: {
        telegram: 'https://t.me/daad_cambodia',
        facebook: 'https://www.facebook.com/DAADCambodia'
      },
      programs: [
        'Engineering Sciences',
        'Natural Sciences',
        'Economics and Business Administration',
        'Development Cooperation',
        'Mathematics and Computer Science',
        'Regional Studies and Development Studies'
      ],
      benefits: [
        'Monthly scholarship payment (€934 for graduates, €1,200 for PhD)',
        'Travel allowance',
        'Health insurance',
        'German language course support',
        'Study and research allowance',
        'Monthly rent subsidy',
        'Family allowances (if applicable)'
      ],
      eligibility: [
        'Excellent Bachelor\'s/Master\'s degree',
        'Work experience preferred',
        'German or English language proficiency',
        'Acceptance from German university',
        'Strong academic and professional background',
        'Commitment to development cooperation'
      ]
    }
  },
  {
    id: 4,
    image: abroad1,
    title: 'Commonwealth Scholarships',
    description: 'Study opportunities in Commonwealth countries',
    deadline: 'កញ្ញា ០៥, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Development Studies', 'Public Health', 'Education', 'Environment', 'Climate Change', 'Governance', 'Public Policy', 'Science'],
      requiredSubjects: ['English'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['commonwealth', 'uk', 'development', 'public health', 'education', 'sustainable']
    },
    details: {
      title: 'Commonwealth Scholarships',
      subtitle: 'Commonwealth Scholarship and Fellowship Plan',
      fundedBy: 'UK Foreign, Commonwealth & Development Office',
      fieldsOfStudy: 'Development-related subjects',
      courseDuration: 'Master\'s: 1-2 years',
      deadlines: [
        { institute: 'UK Universities', date: 'September 5, 2026' }
      ],
      registrationLinks: {
        website: 'www.cscuk.org.uk',
        telegram: 'Contact British Council'
      },
      overseasInfo: {
        telegram: 'https://t.me/commonwealth_scholarships',
        facebook: 'https://www.facebook.com/CommonwealthScholarships'
      },
      programs: [
        'Development Studies',
        'Public Health',
        'Education',
        'Environment and Climate Change',
        'Governance and Public Policy',
        'Science and Technology for Development'
      ],
      benefits: [
        'Approved airfare from Cambodia to UK',
        'Tuition and examination fees',
        'Living allowance (£1,347 per month)',
        'Thesis grant',
        'Study travel grant',
        'Arrival allowance',
        'Family allowances (if applicable)'
      ],
      eligibility: [
        'Citizen or permanent resident of Cambodia',
        'Hold a first degree of at least upper second class',
        'Not afford to study in the UK without scholarship',
        'Focus on development-related subjects',
        'Intention to return to Cambodia after studies'
      ]
    }
  },
  {
    id: 5,
    image: abroad2,
    title: 'Erasmus+ Scholarships',
    description: 'European education and training opportunities',
    deadline: 'តុលា ១២, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['All Fields', 'Engineering', 'Business', 'Education', 'Science', 'Arts', 'Social Sciences'],
      requiredSubjects: ['English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['erasmus', 'europe', 'eu', 'exchange', 'masters', 'mobility', 'international']
    }
  },
  {
    id: 6,
    image: abroad3,
    title: 'Australia Awards Scholarships',
    description: 'Scholarships to study in Australian universities',
    deadline: 'វិច្ឆិកា ២៥, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['All Fields', 'Engineering', 'Agriculture', 'Education', 'Public Health', 'Development', 'Business', 'Science'],
      requiredSubjects: ['English'],
      minGPA: 3.2,
      difficultyLevel: 'competitive',
      keywords: ['australia', 'australian', 'masters', 'development', 'leadership', 'english']
    }
  },
  {
    id: 7,
    image: abroad1,
    title: 'Confucius Institute Scholarships',
    description: 'Opportunities to study in China',
    deadline: 'ធ្នូ ០៨, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Chinese Language', 'Chinese Culture', 'International Relations', 'Business', 'Engineering', 'Technology'],
      requiredSubjects: ['English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['china', 'chinese', 'confucius', 'language', 'culture', 'asia']
    }
  },
  {
    id: 8,
    image: abroad2,
    title: 'Canada Graduate Scholarships',
    description: 'Canadian government support for graduate studies',
    deadline: 'មករា ១៥, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['All Fields', 'Engineering', 'Science', 'Health Sciences', 'Business', 'Social Sciences', 'Humanities'],
      requiredSubjects: ['English'],
      minGPA: 3.5,
      difficultyLevel: 'very-competitive',
      keywords: ['canada', 'canadian', 'graduate', 'masters', 'phd', 'research', 'excellence']
    }
  },
  {
    id: 9,
    image: abroad3,
    title: 'Netherlands Fellowships Programme',
    description: 'Study and fellowship opportunities in the Netherlands',
    deadline: 'កុម្ភៈ ២០, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Development Studies', 'Public Administration', 'Engineering', 'Agriculture', 'Water Management', 'Environmental Science'],
      requiredSubjects: ['English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['netherlands', 'holland', 'development', 'fellowship', 'masters', 'professional']
    }
  },
  // Additional International Scholarships for Testing
  {
    id: 10,
    image: abroad1,
    title: 'Japanese Government  MEXT Scholarship',
    description: 'Study in Japan with full support',
    deadline: 'មេសា ៣០, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Science', 'Technology', 'Business', 'Social Sciences'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.0,
      difficultyLevel: 'competitive',
      keywords: ['japan', 'mext', 'technology', 'engineering', 'cultural exchange']
    },
    details: {
      title: 'MEXT Japanese Government Scholarship',
      subtitle: 'Study in Japan - Full Scholarship',
      fundedBy: 'Japanese Ministry of Education',
      fieldsOfStudy: 'All fields',
      courseDuration: 'Undergraduate: 5 years, Graduate: 2-3 years',
      deadlines: [{ institute: 'Japanese Embassy', date: 'April 30, 2027' }],
      registrationLinks: { website: 'www.mext.go.jp', telegram: 'Contact Embassy' },
      programs: ['Engineering', 'Natural Sciences', 'Social Sciences', 'Humanities'],
      benefits: ['Full tuition', 'Monthly stipend ¥117,000', 'Airfare', 'Japanese language training'],
      eligibility: ['Strong academic record', 'GPA 3.0+', 'Age under 25', 'Japanese language proficiency (preferred)']
    }
  },
  {
    id: 11,
    image: abroad2,
    title: 'Chinese Government CSC Scholarship',
    description: 'Full scholarship for study in China',
    deadline: 'មីនា ២០, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Medicine', 'Business', 'Technology', 'Economics'],
      requiredSubjects: ['Math'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['china', 'csc', 'medicine', 'engineering', 'mandarin']
    },
    details: {
      title: 'Chinese Government CSC Scholarship',
      subtitle: 'Study in China with Full Support',
      fundedBy: 'China Scholarship Council',
      fieldsOfStudy: 'All majors',
      courseDuration: 'Bachelor: 4-5 years, Master: 2-3 years',
      deadlines: [{ institute: 'Chinese Universities', date: 'March 20, 2027' }],
      registrationLinks: { website: 'www.csc.edu.cn', telegram: 'Contact Universities' },
      programs: ['Medicine', 'Engineering', 'Business', 'Chinese Language'],
      benefits: ['Full tuition waiver', 'Monthly stipend', 'Accommodation', 'Medical insurance'],
      eligibility: ['GPA 3.0+', 'Age under 30', 'Good health', 'No Chinese government scholarship in past']
    }
  },
  {
    id: 12,
    image: abroad3,
    title: 'Korean Government KGSP Scholarship',
    description: 'Global Korea Scholarship program',
    deadline: 'កុម្ភៈ ២៨, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Technology', 'Business', 'Science', 'Arts'],
      requiredSubjects: ['English'],
      minGPA: 3.2,
      difficultyLevel: 'very-competitive',
      keywords: ['korea', 'kgsp', 'technology', 'k-culture', 'scholarship']
    },
    details: {
      title: 'Korean Government KGSP Scholarship',
      subtitle: 'Study in South Korea - Global Korea Scholarship',
      fundedBy: 'Korean Government',
      fieldsOfStudy: 'All fields',
      courseDuration: 'Bachelor: 5 years (1 year Korean + 4 years study), Master: 3 years',
      deadlines: [{ institute: 'Korean Embassy', date: 'February 28, 2027' }],
      registrationLinks: { website: 'www.studyinkorea.go.kr', telegram: 'Contact Embassy' },
      programs: ['Engineering', 'IT', 'Business', 'Korean Studies', 'Arts'],
      benefits: ['Full tuition', 'Monthly stipend 1,000,000 KRW', 'Airfare', 'Korean language program'],
      eligibility: ['GPA 3.2+', 'Age under 25 (bachelor)/40 (master)', 'No Korean heritage', 'Excellent English']
    }
  },
  {
    id: 13,
    image: abroad1,
    title: 'Turkey Türkiye Scholarships',
    description: 'Study in Turkey with government support',
    deadline: 'កុម្ភៈ ២០, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Medicine', 'Social Sciences', 'Islamic Studies', 'Business'],
      requiredSubjects: [],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['turkey', 'istanbul', 'engineering', 'medicine', 'islamic']
    },
    details: {
      title: 'Türkiye Scholarships',
      subtitle: 'Study in Turkey - Government Scholarship',
      fundedBy: 'Turkish Government',
      fieldsOfStudy: 'All majors',
      courseDuration: 'Bachelor: 5-6 years, Master: 2-3 years',
      deadlines: [{ institute: 'Turkish Universities', date: 'February 20, 2027' }],
      registrationLinks: { website: 'www.turkiyeburslari.gov.tr', telegram: 'Online application' },
      programs: ['Engineering', 'Medicine', 'Islamic Studies', 'Social Sciences'],
      benefits: ['Full tuition', 'Monthly stipend 3,000 TL', 'Accommodation', 'Health insurance', 'Turkish language course'],
      eligibility: ['GPA 2.8+', 'Age under 21 (bachelor)', 'Good academic standing']
    }
  },
  {
    id: 14,
    image: abroad2,
    title: 'Malaysia International Scholarship',
    description: 'Study in Malaysia with MIS program',
    deadline: 'មីនា ៣១, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Science', 'Technology', 'Islamic Studies', 'Business'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['malaysia', 'islamic', 'engineering', 'technology', 'southeast asia']
    },
    details: {
      title: 'Malaysia International Scholarship (MIS)',
      subtitle: 'Study in Malaysia',
      fundedBy: 'Malaysian Government',
      fieldsOfStudy: 'Science, Technology, Engineering',
      courseDuration: 'Master: 2 years, PhD: 3-4 years',
      deadlines: [{ institute: 'Malaysian Universities', date: 'March 31, 2027' }],
      registrationLinks: { website: 'www.moe.gov.my/mis', telegram: 'Contact embassy' },
      programs: ['Engineering', 'Computer Science', 'Islamic Studies', 'Sciences'],
      benefits: ['Tuition fees', 'Monthly allowance', 'Thesis allowance', 'Medical insurance'],
      eligibility: ['GPA 3.0+', 'Good English', 'Age under 35', 'Research proposal']
    }
  },
  {
    id: 15,
    image: abroad3,
    title: 'Singapore ASEAN Scholarship',
    description: 'Study in Singapore universities',
    deadline: 'កុម្ភៈ ១, ២០២៧',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Engineering', 'Computer Science', 'Business', 'Medicine', 'Science'],
      requiredSubjects: ['Math', 'English', 'Physics'],
      minGPA: 3.7,
      difficultyLevel: 'very-competitive',
      keywords: ['singapore', 'asean', 'technology', 'engineering', 'excellence']
    },
    details: {
      title: 'Singapore ASEAN Scholarship',
      subtitle: 'Excellence in Education',
      fundedBy: 'Singapore Government',
      fieldsOfStudy: 'Science, Engineering, Medicine',
      courseDuration: 'Bachelor: 4 years',
      deadlines: [{ institute: 'Singapore Universities', date: 'February 1, 2027' }],
      registrationLinks: { website: 'www.moe.gov.sg/scholarships', telegram: 'Contact MOE' },
      programs: ['Engineering', 'Computer Science', 'Medicine', 'Business'],
      benefits: ['Full tuition', 'Monthly stipend SGD 500', 'Accommodation allowance', 'Airfare'],
      eligibility: ['Excellent grades (GPA 3.7+)', 'Strong Math & Science', 'ASEAN citizen', 'Age under 18']
    }
  },
  {
    id: 16,
    image: abroad1,
    title: 'ADB-Japan Scholarship Program',
    description: 'Asian Development Bank scholarship',
    deadline: 'កក្កដា ៣១, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Economics', 'Development Studies', 'Business', 'Engineering', 'Environmental Science'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.0,
      difficultyLevel: 'competitive',
      keywords: ['adb', 'development', 'economics', 'asia', 'graduate']
    },
    details: {
      title: 'ADB-JSP Scholarship',
      subtitle: 'Graduate Studies in Development',
      fundedBy: 'Asian Development Bank & Japan',
      fieldsOfStudy: 'Development related fields',
      courseDuration: 'Master: 1-2 years',
      deadlines: [{ institute: 'Partner Universities', date: 'July 31, 2026' }],
      registrationLinks: { website: 'www.adb.org/jspscholarship', telegram: 'Contact ADB' },
      programs: ['Economics', 'Development Studies', 'Public Policy', 'Environmental Management'],
      benefits: ['Full tuition', 'Monthly subsistence', 'Housing', 'Books', 'Medical insurance', 'Travel'],
      eligibility: ['Work experience 2+ years', 'GPA 3.0+', 'ADB member country', 'Admission to designated university']
    }
  },
  {
    id: 17,
    image: abroad2,
    title: 'Swedish Institute Scholarships',
    description: 'Study in Sweden with full funding',
    deadline: 'កុម្ភៈ ៨, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Science', 'Social Sciences', 'Sustainability', 'Design'],
      requiredSubjects: ['English'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['sweden', 'sustainability', 'innovation', 'design', 'nordic']
    },
    details: {
      title: 'Swedish Institute Scholarships for Global Professionals',
      subtitle: 'Study in Sweden - Innovation & Sustainability',
      fundedBy: 'Swedish Institute',
      fieldsOfStudy: 'All master programs',
      courseDuration: 'Master: 1-2 years',
      deadlines: [{ institute: 'Swedish Universities', date: 'February 8, 2027' }],
      registrationLinks: { website: 'www.si.se/scholarships', telegram: 'Online application' },
      programs: ['Engineering', 'Environmental Science', 'Design', 'Social Sciences'],
      benefits: ['Full tuition', 'Monthly allowance SEK 11,000', 'Travel grant', 'Insurance'],
      eligibility: ['GPA 3.3+', 'Leadership experience', 'Work experience', 'English proficiency', 'Developing country citizen']
    }
  },
  {
    id: 18,
    image: abroad3,
    title: 'New Zealand Development Scholarships',
    description: 'NZDS for development leaders',
    deadline: 'មីនា ២០, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Agriculture', 'Economics', 'Health', 'Education', 'Engineering'],
      requiredSubjects: [],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['new zealand', 'development', 'agriculture', 'health', 'pacific']
    },
    details: {
      title: 'New Zealand Development Scholarships',
      subtitle: 'Contribute to Development',
      fundedBy: 'New Zealand Government',
      fieldsOfStudy: 'Development-related fields',
      courseDuration: 'Bachelor: 3-4 years, Master/PhD: 2-4 years',
      deadlines: [{ institute: 'New Zealand Universities', date: 'March 20, 2027' }],
      registrationLinks: { website: 'www.mfat.govt.nz/scholarships', telegram: 'Contact embassy' },
      programs: ['Agriculture', 'Health', 'Education', 'Engineering', 'Environment'],
      benefits: ['Full tuition', 'Living allowance NZD 491/week', 'Airfare', 'Medical insurance'],
      eligibility: ['GPA 3.0+', 'Commitment to return', 'Development focus', 'English proficiency']
    }
  },
  {
    id: 19,
    image: abroad1,
    title: 'Taiwan ICDF Scholarship',
    description: 'Study in Taiwan for development',
    deadline: 'មីនា ៣១, ២០២៧',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Agriculture', 'Public Health', 'Business', 'Technology'],
      requiredSubjects: ['Math'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['taiwan', 'technology', 'engineering', 'development', 'mandarin']
    },
    details: {
      title: 'Taiwan ICDF Scholarship',
      subtitle: 'International Cooperation and Development',
      fundedBy: 'Taiwan ICDF',
      fieldsOfStudy: 'Development fields',
      courseDuration: 'Bachelor: 4 years, Master: 2 years',
      deadlines: [{ institute: 'Taiwan Universities', date: 'March 31, 2027' }],
      registrationLinks: { website: 'www.icdf.org.tw', telegram: 'Contact ICDF' },
      programs: ['Engineering', 'ICT', 'Agriculture', 'Public Health', 'Business'],
      benefits: ['Full tuition', 'Monthly stipend NT$ 15,000', 'Accommodation', 'Insurance', 'Mandarin training'],
      eligibility: ['GPA 3.0+', 'Diplomatic allies', 'Age under 45', 'Development focus']
    }
  },
  {
    id: 20,
    image: abroad2,
    title: 'Indian Council for Cultural Relations Scholarship',
    description: 'Study in India with ICCR',
    deadline: 'ធ្នូ ៣១, ២០២៦',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Medicine', 'Arts', 'Science', 'Management'],
      requiredSubjects: [],
      minGPA: 2.8,
      difficultyLevel: 'easy',
      keywords: ['india', 'iccr', 'engineering', 'medicine', 'culture']
    },
    details: {
      title: 'ICCR Scholarship Scheme',
      subtitle: 'Study in India',
      fundedBy: 'Indian Government',
      fieldsOfStudy: 'All fields',
      courseDuration: 'Bachelor: 3-5 years, Master: 2-3 years',
      deadlines: [{ institute: 'Indian Universities', date: 'December 31, 2026' }],
      registrationLinks: { website: 'www.iccr.gov.in', telegram: 'Contact embassy' },
      programs: ['Engineering', 'Medicine', 'Management', 'Arts', 'Sciences'],
      benefits: ['Tuition waiver', 'Monthly stipend INR 18,000', 'Accommodation', 'Annual grant'],
      eligibility: ['GPA 2.8+', 'Age under 35', 'Good academic record', 'No other Indian scholarship']
    }
  }
];

// Related scholarships for detail pages
export const relatedAbroadScholarships = [
  { id: 2, image: abroad2, title: 'Chevening Scholarships' },
  { id: 3, image: abroad3, title: 'DAAD Scholarships' },
  { id: 1, image: abroad1, title: 'Fulbright Scholarship Program' }
];

// Helper function to get scholarship by ID
export const getAbroadScholarshipById = (id) => {
  return abroadScholarships.find(s => s.id === parseInt(id)) || abroadScholarships[0];
};
