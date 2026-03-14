// Import scholarship images
import cambodia1 from '../assets/cambodia/1.jpg';
import cambodia2 from '../assets/cambodia/2.png';
import cambodia3 from '../assets/cambodia/3.png';
import cambodia4 from '../assets/cambodia/4.png';
import cambodia5 from '../assets/cambodia/5.png';
import cambodia6 from '../assets/cambodia/6.png';

export const cambodiaScholarships = [
  {
    id: 1,
    image: cambodia1,
    title: 'Techo Digital Talent Scholarship (Secondary School)',
    description: 'Scholarship for secondary school students in digital and IT fields',
    deadline: 'June 15, 2026',
    // AI Metadata for recommendation engine
    aiMetadata: {
      studentTypes: ['science'], // 'science', 'society', or 'both'
      fieldCategories: ['Computer Science', 'Data Science', 'Digital Business', 'Telecommunication', 'Cybersecurity'],
      requiredSubjects: ['Math', 'English'], // Strong grades needed in these
      minGPA: 3.0, // Minimum GPA requirement (A/B/C = grades A/B/C)
      difficultyLevel: 'competitive', // 'easy', 'moderate', 'competitive', 'very-competitive'
      keywords: ['technology', 'digital', 'IT', 'computer science', 'software engineering', 'data science']
    },
    // Detailed information for detail pages
    details: {
      title: 'Opportunities to gain Techo Digital Talent Scholarship',
      subtitle: 'Techo Digital Talent Scholarship 500places Year 2025/2026',
      fundedBy: 'This a scholarship provide by Government',
      fieldsOfStudy: 'This a scholarship provide by Government',
      courseDuration: '4 Year',
      deadlines: [
        { institute: 'CADT/other institutes', date: 'October 22, 2025' },
        { institute: 'AUPP', date: 'October 8, 2025' }
      ],
      registrationLinks: {
        website: 'www.cadt.edu.kh/scholarship',
        telegram: '070 358 623 / 093 366 623'
      },
      overseasInfo: {
        telegram: 'https://t.me/camstudentcambodia',
        facebook: 'https://www.facebook.com/camstudentcambodia'
      },
      programs: [
        'Bachelor of Computer Science in Software Engineering',
        'Bachelor of Telecommunication & Network in Cybersecurity',
        'Bachelor of Digital Business in e-Commerce',
        'Bachelor of Digital Business in Digital Economy',
        'Bachelor of Computer Science in Data Science'
      ],
      benefits: [
        '1 Laptop',
        {
          title: '100% tuition fee coverage at:',
          items: [
            '1. Cambodia Academy of Digital Technology (CADT)',
            '2. Cambodia Institute of Technology',
            '3. Phnom Penh International University',
            '4. National University of Management',
            '5. Paragon International University',
            '6. American University of Phnom Penh (AUPP)'
          ]
        },
        'Good job opportunities and high salary',
        'Support from the Ministry of Education, Youth and Sport for 4 years'
      ],
      eligibility: [
        'Students who pass the 2025 baccalaureate exam (Grades A/B/C)',
        'Exams: Mathematics, Science, English + Interview',
        'Encouragement given to disadvantaged students, students from remote areas, students with disabilities, and female students'
      ]
    }
  },
  {
    id: 2,
    image: cambodia2,
    title: 'HOPE Youth Scholarship (CanTech)',
    description: 'HOPE Youth scholarship program by CanTech Education Foundation',
    deadline: 'July 20, 2026',
    // AI Metadata for recommendation engine
    aiMetadata: {
      studentTypes: ['both'], // Suitable for both science and society students
      fieldCategories: ['General Education', 'Secondary Education', 'Science', 'Mathematics', 'Humanities'],
      requiredSubjects: [], // No specific subject requirements
      minGPA: 2.5, // Moderate GPA requirement
      difficultyLevel: 'moderate',
      keywords: ['secondary education', 'high school', 'general studies', 'academic support']
    },
    details: {
      title: 'Scholarship for Secondary School Students',
      subtitle: 'HOPE Youth program by CanTech',
      fundedBy: 'CanTech Education Foundation',
      fieldsOfStudy: 'Secondary Education Support',
      courseDuration: '1-2 Years',
      deadlines: [
        { institute: 'All participating schools', date: 'July 20, 2026' }
      ],
      registrationLinks: {
        website: 'www.cantech.edu.kh',
        telegram: '012 345 678'
      },
      overseasInfo: {
        telegram: 'https://t.me/cantechscholarship',
        facebook: 'https://www.facebook.com/cantechscholarship'
      },
      programs: [
        'General Secondary Education',
        'Science and Mathematics Focus',
        'Language and Humanities'
      ],
      benefits: [
        'Full tuition fee coverage',
        'Study materials and supplies',
        'Monthly stipend for transportation',
        'Academic mentorship program'
      ],
      eligibility: [
        'Currently enrolled in secondary school',
        'Good academic standing',
        'Financial need demonstrated',
        'Strong motivation to learn'
      ]
    }
  },
  {
    id: 3,
    image: cambodia3,
    title: '100% Full Undergraduate Scholarship Program',
    description: 'Comprehensive full scholarship support program for outstanding students',
    deadline: 'August 10, 2026',
    // AI Metadata for recommendation engine
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Engineering', 'Technology', 'Business Administration', 'Medical Sciences', 'Social Sciences'],
      requiredSubjects: [], // Open to all
      minGPA: 3.5, // High GPA requirement (excellent grades)
      difficultyLevel: 'very-competitive',
      keywords: ['undergraduate', 'full scholarship', 'all majors', 'comprehensive support', 'leadership']
    },
    details: {
      title: '100% Full Undergraduate Scholarship',
      subtitle: 'Comprehensive full scholarship program',
      fundedBy: 'Private Education Foundation',
      fieldsOfStudy: 'All undergraduate programs',
      courseDuration: '4 Years',
      deadlines: [
        { institute: 'Partner Universities', date: 'August 10, 2026' }
      ],
      registrationLinks: {
        website: 'www.scholarship900.edu.kh',
        telegram: '098 765 432'
      },
      overseasInfo: {
        telegram: 'https://t.me/scholarship900',
        facebook: 'https://www.facebook.com/scholarship900'
      },
      programs: [
        'Engineering and Technology',
        'Business Administration',
        'Medical Sciences',
        'Social Sciences'
      ],
      benefits: [
        'Full tuition coverage',
        'Monthly living allowance',
        'Accommodation support',
        'Health insurance',
        'International exposure opportunities'
      ],
      eligibility: [
        'High school graduation with excellent grades',
        'Pass entrance examination',
        'Demonstrate leadership potential',
        'Community service experience preferred'
      ]
    }
  },
  {
    id: 4,
    image: cambodia4,
    title: 'Opportunities from OUR COMMUNITY ORGANIZATION',
    description: 'Scholarships from OUR COMMUNITY ORGANIZATION',
    deadline: 'September 5, 2026',
    details: {
      title: 'OUR COMMUNITY ORGANIZATION Scholarship',
        subtitle: 'Community-Based Educational Support',
      fundedBy: 'Our Community Organization',
      fieldsOfStudy: 'Various fields of study',
      courseDuration: 'Varies by program',
      deadlines: [
        { institute: 'All partner institutions', date: 'September 5, 2026' }
      ],
      registrationLinks: {
        website: 'www.ourcommunity.org',
        telegram: '077 888 999'
      },
      overseasInfo: {
        telegram: 'https://t.me/ourcommunityscholarship',
        facebook: 'https://www.facebook.com/ourcommunityscholarship'
      },
      programs: [
        'Community Development',
        'Education',
        'Healthcare',
        'Agriculture'
      ],
      benefits: [
        'Tuition assistance',
        'Community mentorship',
        'Practical training opportunities',
        'Networking with professionals'
      ],
      eligibility: [
        'Members of partner communities',
        'Demonstrated financial need',
        'Commitment to community service',
        'Good academic record'
      ]
    }
  },
  {
    id: 5,
    image: cambodia5,
    title: '100% Scholarship for International High School Students',
    description: 'Full scholarship program for high-achieving students at international schools',
    deadline: 'October 12, 2026',
    details: {
      title: '100% Scholarship for International High School Students',
      subtitle: 'Full scholarship program for high-achieving international students',
      fundedBy: 'International School Foundation',
      fieldsOfStudy: 'International curriculum programs',
      courseDuration: '3-4 Years',
      deadlines: [
        { institute: 'International Schools', date: 'October 12, 2026' }
      ],
      registrationLinks: {
        website: 'www.intschool.edu.kh',
        telegram: '016 222 333'
      },
      overseasInfo: {
        telegram: 'https://t.me/intschoolscholarship',
        facebook: 'https://www.facebook.com/intschoolscholarship'
      },
      programs: [
        'International Baccalaureate (IB)',
        'Cambridge A-Levels',
        'Advanced Placement (AP)',
        'IGCSE Programs'
      ],
      benefits: [
        '100% tuition fee waiver',
        'Learning materials provided',
        'Access to international curriculum',
        'University placement support'
      ],
      eligibility: [
        'Exceptional academic performance',
        'Strong English proficiency',
        'Pass entrance assessment',
        'Demonstrated leadership skills'
      ]
    }
  },
  {
    id: 6,
    image: cambodia6,
    title: 'National Full Scholarship Program',
    description: 'Government and private partnership full scholarship program',
    deadline: 'November 25, 2026',
    details: {
      title: 'National Full Scholarship Program',
      subtitle: 'Government and private partnership full scholarship program',
      fundedBy: 'Government and Private Partnership',
      fieldsOfStudy: 'Priority fields for national development',
      courseDuration: '4 Years',
      deadlines: [
        { institute: 'National Universities', date: 'November 25, 2026' }
      ],
      registrationLinks: {
        website: 'www.nationalscholarship.gov.kh',
        telegram: '023 456 789'
      },
      overseasInfo: {
        telegram: 'https://t.me/nationalscholarship',
        facebook: 'https://www.facebook.com/nationalscholarship'
      },
      programs: [
        'STEM Fields',
        'Education',
        'Public Administration',
        'Healthcare'
      ],
      benefits: [
        'Complete financial support',
        'Living stipend',
        'Book allowance',
        'Guaranteed employment after graduation'
      ],
      eligibility: [
        'Cambodian citizenship required',
        'Top academic performers',
        'Commitment to work in Cambodia after graduation',
        'Pass competitive examination'
      ]
    }
  },
  {
    id: 7,
    image: cambodia1,
    title: 'Secondary School Scholarship (Ministry Support)',
    description: 'Scholarship support program for secondary school students',
    deadline: 'December 8, 2026',
    details: {
      title: 'Secondary School Scholarship',
      subtitle: 'Support for Secondary Education Students',
      fundedBy: 'Ministry of Education',
      fieldsOfStudy: 'Secondary Education',
      courseDuration: '2-3 Years',
      deadlines: [
        { institute: 'Public and Private Schools', date: 'December 8, 2026' }
      ],
      registrationLinks: {
        website: 'www.moeys.gov.kh/scholarship',
        telegram: '012 999 888'
      },
      overseasInfo: {
        telegram: 'https://t.me/moeys_scholarship',
        facebook: 'https://www.facebook.com/moeys_scholarship'
      },
      programs: [
        'General Secondary Education',
        'Technical Vocational Education',
        'Science Stream',
        'Arts Stream'
      ],
      benefits: [
        'Partial to full tuition support',
        'School supplies',
        'Transportation allowance',
        'Tutorial support'
      ],
      eligibility: [
        'Enrolled in secondary school',
        'Financial need',
        'Good academic standing',
        'Cambodian citizenship'
      ]
    }
  },
  {
    id: 8,
    image: cambodia2,
    title: 'National Education Fund Scholarship',
    description: 'Need-based scholarship program from the National Education Fund',
    deadline: 'January 15, 2027',
    details: {
      title: 'National Education Fund Scholarship',
      subtitle: 'National Education Fund Scholarship',
      fundedBy: 'National Education Fund',
      fieldsOfStudy: 'All fields of study',
      courseDuration: 'Varies',
      deadlines: [
        { institute: 'All educational institutions', date: 'January 15, 2027' }
      ],
      registrationLinks: {
        website: 'www.nef.edu.kh',
        telegram: '070 111 222'
      },
      overseasInfo: {
        telegram: 'https://t.me/nef_cambodia',
        facebook: 'https://www.facebook.com/nef_cambodia'
      },
      programs: [
        'All undergraduate programs',
        'Vocational training',
        'Technical education',
        'Professional certifications'
      ],
      benefits: [
        'Financial assistance based on need',
        'Educational materials',
        'Living support for rural students',
        'Career counseling'
      ],
      eligibility: [
        'Demonstrated financial need',
        'Satisfactory academic performance',
        'Priority to rural and disadvantaged students',
        'Cambodian citizenship required'
      ]
    }
  },
  {
    id: 9,
    image: cambodia3,
    title: 'Higher Education Scholarship Program',
    description: 'Scholarship program for university-level studies',
    deadline: 'February 20, 2027',
    details: {
      title: 'Higher Education Scholarship',
      subtitle: 'Higher Education Scholarship Program',
      fundedBy: 'Higher Education Council',
      fieldsOfStudy: 'University level programs',
      courseDuration: '4 Years',
      deadlines: [
        { institute: 'Universities nationwide', date: 'February 20, 2027' }
      ],
      registrationLinks: {
        website: 'www.higheredu.gov.kh',
        telegram: '099 333 444'
      },
      overseasInfo: {
        telegram: 'https://t.me/higheredu_kh',
        facebook: 'https://www.facebook.com/higheredu_kh'
      },
      programs: [
        'Engineering',
        'Sciences',
        'Business and Economics',
        'Humanities and Social Sciences'
      ],
      benefits: [
        'Tuition coverage',
        'Monthly stipend',
        'Research opportunities',
        'Graduate school preparation'
      ],
      eligibility: [
        'High school graduation',
        'Entrance exam qualification',
        'Good academic record',
        'Commitment to national development'
      ]
    }
  },
  // Additional Scholarships for Testing AI
  {
    id: 10,
    image: cambodia1,
    title: 'Engineering Excellence Scholarship',
    description: 'Full scholarship for engineering students',
    deadline: 'December 1, 2026',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
      requiredSubjects: ['Math', 'Physics'],
      minGPA: 3.2,
      difficultyLevel: 'competitive',
      keywords: ['engineering', 'design', 'construction', 'mechanics']
    },
    details: {
      title: 'Engineering Excellence Scholarship Program',
      subtitle: 'Build the Future of Cambodia',
      fundedBy: 'Institute of Technology',
      fieldsOfStudy: 'All Engineering Fields',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'ITC', date: 'December 1, 2026' }],
      registrationLinks: { website: 'www.itc.edu.kh', telegram: '012 345 678' },
      programs: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
      benefits: ['Full tuition', 'Lab equipment', 'Internship placements'],
      eligibility: ['Math & Physics grades A or B', 'GPA above 3.2']
    }
  },
  {
    id: 11,
    image: cambodia2,
    title: 'Medical Sciences Scholarship',
    description: 'Future doctors and nurses program',
    deadline: 'November 15, 2026',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Medicine', 'Nursing', 'Pharmacy', 'Health Sciences'],
      requiredSubjects: ['Biology', 'Chemistry'],
      minGPA: 3.5,
      difficultyLevel: 'very-competitive',
      keywords: ['medicine', 'healthcare', 'doctor',  'nurse', 'pharmacy']
    },
    details: {
      title: 'Medical Sciences Scholarship',
      subtitle: 'Train Healthcare Professionals',
      fundedBy: 'Ministry of Health',
      fieldsOfStudy: 'Medical Fields',
      courseDuration: '5-6 Years',
      deadlines: [{ institute: 'Medical Universities', date: 'November 15, 2026' }],
      registrationLinks: { website: 'www.medschool.edu.kh', telegram: '016 789 012' },
      programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing'],
      benefits: ['Full tuition', 'Clinical training', 'Equipment provided'],
      eligibility: ['Biology & Chemistry A grades', 'GPA 3.5+', 'Health screening']
    }
  },
  {
    id: 12,
    image: cambodia3,
    title: 'Business Administration Scholarship',
    description: 'Future business leaders program',
    deadline: 'January 20, 2027',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Business Administration', 'Management', 'Accounting', 'Finance'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['business', 'management', 'finance', 'accounting', 'entrepreneurship']
    },
    details: {
      title: 'Business Administration Scholarship',
      subtitle: 'Develop Business Leaders',
      fundedBy: 'Chamber of Commerce',
      fieldsOfStudy: 'Business Fields',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Business Schools', date: 'January 20, 2027' }],
      registrationLinks: { website: 'www.business.edu.kh', telegram: '089 234 567' },
      programs: ['Business Administration', 'Accounting', 'Marketing', 'Finance'],
      benefits: ['Tuition support', 'Internships', 'Networking events'],
      eligibility: ['Good Math & English', 'GPA 3.0+', 'Leadership potential']
    }
  },
  {
    id: 13,
    image: cambodia4,
    title: 'Tourism & Hospitality Scholarship',
    description: 'Tourism industry leaders',
    deadline: 'February 28, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Tourism', 'Hotel Management', 'Hospitality', 'Event Management'],
      requiredSubjects: ['Geography', 'English'],
      minGPA: 2.8,
      difficultyLevel: 'easy',
      keywords: ['tourism', 'hotel', 'hospitality', 'travel', 'service']
    },
    details: {
      title: 'Tourism & Hospitality Scholarship',
      subtitle: 'Boost Tourism Sector',
      fundedBy: 'Ministry of Tourism',
      fieldsOfStudy: 'Tourism Fields',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Tourism Institutes', date: 'February 28, 2027' }],
      registrationLinks: { website: 'www.tourism.edu.kh',  telegram: '077 345 890' },
      programs: ['Tourism Management', 'Hotel Management', 'Event Planning'],
      benefits: ['Partial tuition', 'Industry exposure', 'Job placement'],
      eligibility: ['Geography & English proficiency', 'GPA 2.8+']
    }
  },
  {
    id: 14,
    image: cambodia5,
    title: 'Agriculture & Environment Scholarship',
    description: 'Sustainable agriculture program',
    deadline: 'March 31, 2027',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Agriculture', 'Environmental Science', 'Forestry', 'Agribusiness'],
      requiredSubjects: ['Biology'],
      minGPA: 2.5,
      difficultyLevel: 'moderate',
      keywords: ['agriculture', 'farming', 'environment', 'sustainability', 'crops']
    },
    details: {
      title: 'Agriculture & Environment Scholarship',
      subtitle: 'Food Security & Sustainability',
      fundedBy: 'Ministry of Agriculture',
      fieldsOfStudy: 'Agriculture & Environment',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Agricultural Universities', date: 'March 31, 2027' }],
      registrationLinks: { website: 'www.agriculture.edu.kh', telegram: '092 567 123' },
      programs: ['Agriculture', 'Animal Science', 'Environmental Management'],
      benefits: ['Full tuition', 'Field training', 'Equipment'],
      eligibility: ['Biology interest', 'GPA 2.5+', 'Rural students encouraged']
    }
  },
  {
    id: 15,
    image: cambodia6,
    title: 'Law & Legal Studies Scholarship',
    description: 'Future lawyers and judges',
    deadline: 'April 15, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Law', 'Legal Studies', 'Political Science', 'International Relations'],
      requiredSubjects: ['History', 'English'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['law', 'legal', 'justice', 'court', 'lawyer']
    },
    details: {
      title: 'Law & Legal Studies Scholarship',
      subtitle: 'Justice System Development',
      fundedBy: 'Bar Association',
      fieldsOfStudy: 'Law',
      courseDuration: '5 Years',
      deadlines: [{ institute: 'Law Schools', date: 'April 15, 2027' }],
      registrationLinks: { website: 'www.lawschool.edu.kh', telegram: '070 890 234' },
      programs: ['Law', 'Legal Studies', 'International Law'],
      benefits: ['Tuition coverage', 'Court internships', 'Bar exam prep'],
      eligibility: ['History & English excellence', 'GPA 3.3+', 'Strong analytical skills']
    }
  },
  {
    id: 16,
    image: cambodia1,
    title: 'Architecture & Design Scholarship',
    description: 'Creative design professionals',
    deadline: 'May 10, 2027',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Architecture', 'Interior Design', 'Urban Planning', 'Landscape Architecture'],
      requiredSubjects: ['Math', 'Physics'],
      minGPA: 3.0,
      difficultyLevel: 'competitive',
      keywords: ['architecture', 'design', 'building', 'urban', 'construction']
    },
    details: {
      title: 'Architecture & Design Scholarship',
      subtitle: 'Design the Future Cities',
      fundedBy: 'Architects Association',
      fieldsOfStudy: 'Architecture & Design',
      courseDuration: '5 Years',
      deadlines: [{ institute: 'Design Schools', date: 'May 10, 2027' }],
      registrationLinks: { website: 'www.architecture.edu.kh', telegram: '093 456 789' },
      programs: ['Architecture', 'Interior Design', 'Urban Planning'],
      benefits: ['Tuition support', 'Design software', 'Studio access'],
      eligibility: ['Math & Physics proficiency', 'GPA 3.0+', 'Creative portfolio']
    }
  },
  {
    id: 17,
    image: cambodia2,
    title: 'Education & Teaching Scholarship',
    description: 'Train future teachers',
    deadline: 'June 5, 2027',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Education', 'Teaching', 'Educational Psychology', 'Curriculum Development'],
      requiredSubjects: [],
      minGPA: 2.7,
      difficultyLevel: 'easy',
      keywords: ['education', 'teaching', 'teacher', 'school', 'pedagogy']
    },
    details: {
      title: 'Education & Teaching Scholarship',
      subtitle: 'Educate the Next Generation',
      fundedBy: 'Ministry of Education',
      fieldsOfStudy: 'Education',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Teacher Training Institutes', date: 'June 5, 2027' }],
      registrationLinks: { website: 'www.teacher.edu.kh', telegram: '017 678 345' },
      programs: ['Primary Education', 'Secondary Education', 'Special Education'],
      benefits: ['Full scholarship', 'Teaching practice',' Guaranteed employment'],
      eligibility: ['Passion for teaching', 'GPA 2.7+', 'Communication skills']
    }
  },
  {
    id: 18,
    image: cambodia3,
    title: 'Economics & Finance Scholarship',
    description: 'Economic development specialists',
    deadline: 'July 22, 2027',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Economics', 'Finance', 'Banking', 'Business Analytics'],
      requiredSubjects: ['Math'],
      minGPA: 3.2,
      difficultyLevel: 'competitive',
      keywords: ['economics', 'finance', 'banking', 'investment', 'market']
    },
    details: {
      title: 'Economics & Finance Scholarship',
      subtitle: 'Drive Economic Growth',
      fundedBy: 'National Bank',
      fieldsOfStudy: 'Economics & Finance',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Economics Faculties', date: 'July 22, 2027' }],
      registrationLinks: { website: 'www.economics.edu.kh', telegram: '081 234 890' },
      programs: ['Economics', 'Finance', 'Banking', 'Investment Analysis'],
      benefits: ['Scholarship', 'Bank internships', 'Professional certifications'],
      eligibility: ['Strong Math', 'GPA 3.2+', 'Analytical thinking']
    }
  },
  {
    id: 19,
    image: cambodia4,
    title: 'Journalism & Media Scholarship',
    description: 'Media and communication professionals',
    deadline: 'August 8, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Journalism', 'Media Studies', 'Communication', 'Broadcasting'],
      requiredSubjects: ['English'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['journalism', 'media', 'news', 'communication', 'broadcasting']
    },
    details: {
      title: 'Journalism & Media Scholarship',
      subtitle: 'Free Press Development',
      fundedBy: 'Media Association',
      fieldsOfStudy: 'Journalism & Media',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Media Schools', date: 'August 8, 2027' }],
      registrationLinks: { website: 'www.journalism.edu.kh', telegram: '099 567 234' },
      programs: ['Journalism', 'Broadcasting', 'Digital Media', 'Public Relations'],
      benefits: ['Tuition waiver', 'Media internships', 'Equipment access'],
      eligibility: ['English proficiency', 'GPA 2.9+', 'Writing skills']
    }
  },
  {
    id: 20,
    image: cambodia5,
    title: 'Psychology & Social Work Scholarship',
    description: 'Mental health and social services',
    deadline: 'September 15, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Psychology', 'Social Work', 'Counseling', 'Sociology'],
      requiredSubjects: ['Morality'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['psychology', 'counseling', 'social work', 'mental health', 'therapy']
    },
    details: {
      title: 'Psychology & Social Work Scholarship',
      subtitle: 'Mental Health Support',
      fundedBy: 'Health Ministry',
      fieldsOfStudy: 'Psychology & Social Services',
      courseDuration: '4 Years',
      deadlines: [{ institute: 'Social Science Faculties', date: 'September 15, 2027' }],
      registrationLinks: { website: 'www.psychology.edu.kh', telegram: '012 789 456' },
      programs: ['Psychology', 'Social Work', 'Counseling', 'Clinical Psychology'],
      benefits: ['Full tuition', 'Clinical training', 'Certification support'],
      eligibility: ['Empathy & compassion', 'GPA 2.8+', 'Communication skills']
    }
  },
  {
    id: 21,
    image: cambodia1,
    title: 'Agricultural Innovation Scholarship',
    description: 'For students advancing sustainable farming practices',
    deadline: 'August 1, 2027',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Agriculture', 'Environmental Science', 'Agronomy'],
      requiredSubjects: ['Science', 'Math'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['agriculture', 'farming', 'sustainability', 'environment']
    }
  },
  {
    id: 22,
    image: cambodia2,
    title: 'Tourism & Hospitality Excellence',
    description: 'For students pursuing hospitality and tourism management',
    deadline: 'September 5, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Tourism Management', 'Business Administration', 'Hospitality'],
      requiredSubjects: ['English'],
      minGPA: 2.7,
      difficultyLevel: 'moderate',
      keywords: ['tourism', 'hospitality', 'business', 'management']
    }
  },
  {
    id: 23,
    image: cambodia3,
    title: 'Textile & Fashion Design Scholarship',
    description: 'Supporting traditional and modern fashion studies',
    deadline: 'October 10, 2027',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Fashion Design', 'Textile Arts', 'Business'],
      requiredSubjects: ['Art', 'English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['fashion', 'textile', 'design', 'arts', 'traditional']
    }
  },
  {
    id: 24,
    image: cambodia4,
    title: 'Infrastructure Development Scholarship',
    description: 'Civil engineering for national development',
    deadline: 'November 15, 2027',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Civil Engineering', 'Infrastructure', 'Construction'],
      requiredSubjects: ['Math', 'Physics', 'Science'],
      minGPA: 3.1,
      difficultyLevel: 'competitive',
      keywords: ['engineering', 'infrastructure', 'construction', 'development']
    }
  },
  {
    id: 25,
    image: cambodia5,
    title: 'Social Entrepreneurship Program',
    description: 'For students creating social enterprises',
    deadline: 'December 1, 2027',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Business', 'Social Sciences', 'Entrepreneurship'],
      requiredSubjects: ['English'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['entrepreneurship', 'social', 'business', 'innovation']
    }
  },
  {
    id: 26,
    image: cambodia6,
    title: 'Water Resources Management',
    description: 'Environmental science for water sustainability',
    deadline: 'January 20, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Environmental Science', 'Water Management', 'Engineering'],
      requiredSubjects: ['Science', 'Math'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['water', 'environment', 'sustainability', 'resource management']
    }
  },
  {
    id: 27,
    image: cambodia1,
    title: 'Human Rights & Justice Studies',
    description: 'For law and human rights advocates',
    deadline: 'February 28, 2028',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Law', 'Social Sciences', 'Human Rights'],
      requiredSubjects: ['English'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['law', 'justice', 'human rights', 'social']
    }
  },
  {
    id: 28,
    image: cambodia2,
    title: 'Renewable Energy Technology',
    description: 'Solar and alternative energy engineering',
    deadline: 'March 30, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Engineering', 'Energy Science', 'Technology'],
      requiredSubjects: ['Physics', 'Math', 'Science'],
      minGPA: 3.2,
      difficultyLevel: 'competitive',
      keywords: ['energy', 'renewable', 'solar', 'technology', 'engineering']
    }
  },
  {
    id: 29,
    image: cambodia3,
    title: 'Cultural Heritage Protection',
    description: 'Preserving Cambodia\'s historical treasures',
    deadline: 'April 15, 2028',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['History', 'Cultural Studies', 'Archaeology'],
      requiredSubjects: ['English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['heritage', 'culture', 'history', 'preservation', 'archaeology']
    }
  },
  {
    id: 30,
    image: cambodia4,
    title: 'Urban Development & Planning',
    description: 'City planning and sustainable development',
    deadline: 'May 10, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Urban Planning', 'Architecture', 'Engineering'],
      requiredSubjects: ['Math', 'Science'],
      minGPA: 3.1,
      difficultyLevel: 'competitive',
      keywords: ['urban', 'planning', 'development', 'sustainability', 'architecture']
    }
  },
  {
    id: 31,
    image: cambodia5,
    title: 'Microfinance & Community Development',
    description: 'Financial services for poverty alleviation',
    deadline: 'June 5, 2028',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Finance', 'Economics', 'Development'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['finance', 'microfinance', 'development', 'economics']
    }
  },
  {
    id: 32,
    image: cambodia6,
    title: 'Biotechnology Research Excellence',
    description: 'Advanced life sciences research',
    deadline: 'July 8, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Biotechnology', 'Biology', 'Research'],
      requiredSubjects: ['Science', 'Chemistry', 'Biology'],
      minGPA: 3.4,
      difficultyLevel: 'very-competitive',
      keywords: ['biotechnology', 'research', 'biology', 'science']
    }
  },
  {
    id: 33,
    image: cambodia1,
    title: 'Community Health Worker Program',
    description: 'Public health service to rural communities',
    deadline: 'August 12, 2028',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Public Health', 'Medicine', 'Social Services'],
      requiredSubjects: ['Science', 'English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['health', 'community', 'public health', 'service']
    }
  },
  {
    id: 34,
    image: cambodia2,
    title: 'Software Development Bootcamp',
    description: 'IT skills for digital transformation',
    deadline: 'September 20, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Computer Science', 'Information Technology', 'Software Engineering'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['software', 'programming', 'technology', 'digital', 'coding']
    }
  },
  {
    id: 35,
    image: cambodia3,
    title: 'Journalism & Media Studies',
    description: 'Digital and investigative journalism',
    deadline: 'October 3, 2028',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Journalism', 'Communication', 'Media'],
      requiredSubjects: ['English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['journalism', 'media', 'communication', 'writing']
    }
  },
  {
    id: 36,
    image: cambodia4,
    title: 'Electrical Power Systems',
    description: 'National electricity infrastructure development',
    deadline: 'November 8, 2028',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Electrical Engineering', 'Energy', 'Infrastructure'],
      requiredSubjects: ['Physics', 'Math', 'Science'],
      minGPA: 3.2,
      difficultyLevel: 'competitive',
      keywords: ['electrical', 'power', 'engineering', 'energy']
    }
  },
  {
    id: 37,
    image: cambodia5,
    title: 'NGO Management & Leadership',
    description: 'Nonprofit organization management',
    deadline: 'December 10, 2028',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Management', 'Business', 'Social Sciences'],
      requiredSubjects: ['English'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['ngo', 'management', 'leadership', 'nonprofit']
    }
  },
  {
    id: 38,
    image: cambodia6,
    title: 'Marine Science & Fisheries',
    description: 'Sustainable fisheries management',
    deadline: 'January 5, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Marine Science', 'Biology', 'Environmental Science'],
      requiredSubjects: ['Science', 'Biology'],
      minGPA: 3.0,
      difficultyLevel: 'competitive',
      keywords: ['marine', 'fisheries', 'ocean', 'science', 'sustainability']
    }
  },
  {
    id: 39,
    image: cambodia1,
    title: 'Sports Management & Development',
    description: 'Athletic excellence and sports administration',
    deadline: 'February 12, 2029',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Sports Management', 'Physical Education', 'Business'],
      requiredSubjects: ['English'],
      minGPA: 2.7,
      difficultyLevel: 'moderate',
      keywords: ['sports', 'management', 'athletic', 'physical education']
    }
  },
  {
    id: 40,
    image: cambodia2,
    title: 'Mechanical Engineering Excellence',
    description: 'Advanced mechanical design and manufacturing',
    deadline: 'March 15, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Mechanical Engineering', 'Manufacturing', 'Engineering'],
      requiredSubjects: ['Physics', 'Math', 'Science'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['mechanical', 'engineering', 'design', 'manufacturing']
    }
  },
  {
    id: 41,
    image: cambodia3,
    title: 'Art & Cultural Management',
    description: 'Arts administration and cultural leadership',
    deadline: 'April 5, 2029',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Arts', 'Cultural Studies', 'Management'],
      requiredSubjects: ['English', 'Art'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['arts', 'culture', 'management', 'creativity']
    }
  },
  {
    id: 42,
    image: cambodia4,
    title: 'Database Management Systems',
    description: 'Data science and database administration',
    deadline: 'May 20, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Computer Science', 'Data Science', 'Information Technology'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 3.1,
      difficultyLevel: 'competitive',
      keywords: ['database', 'data science', 'programming', 'technology']
    }
  },
  {
    id: 43,
    image: cambodia5,
    title: 'Gender Equality & Social Justice',
    description: 'Advancing women\'s rights and equality',
    deadline: 'June 10, 2029',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Social Sciences', 'Gender Studies', 'Law'],
      requiredSubjects: ['English'],
      minGPA: 2.9,
      difficultyLevel: 'moderate',
      keywords: ['gender', 'equality', 'social justice', 'rights']
    }
  },
  {
    id: 44,
    image: cambodia6,
    title: 'Food Science & Nutrition',
    description: 'Nutritional science and food technology',
    deadline: 'July 18, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Food Science', 'Nutrition', 'Biology'],
      requiredSubjects: ['Science', 'Chemistry'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['food', 'nutrition', 'science', 'health', 'technology']
    }
  },
  {
    id: 45,
    image: cambodia1,
    title: 'Disaster Risk Reduction',
    description: 'Climate adaptation and emergency management',
    deadline: 'August 25, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Environmental Science', 'Engineering', 'Public Administration'],
      requiredSubjects: ['Science', 'Math'],
      minGPA: 3.0,
      difficultyLevel: 'moderate',
      keywords: ['disaster', 'climate', 'environment', 'risk management']
    }
  },
  {
    id: 46,
    image: cambodia2,
    title: 'Museum & Archive Studies',
    description: 'Heritage preservation and curation',
    deadline: 'September 30, 2029',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['History', 'Cultural Studies', 'Management'],
      requiredSubjects: ['English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['museum', 'archive', 'heritage', 'curation', 'history']
    }
  },
  {
    id: 47,
    image: cambodia3,
    title: 'Pharmaceutical Sciences',
    description: 'Drug development and pharmacy',
    deadline: 'October 20, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Pharmacy', 'Chemistry', 'Medicine'],
      requiredSubjects: ['Science', 'Chemistry', 'Biology'],
      minGPA: 3.3,
      difficultyLevel: 'competitive',
      keywords: ['pharmacy', 'pharmaceutical', 'medicine', 'chemistry']
    }
  },
  {
    id: 48,
    image: cambodia4,
    title: 'Cooperative Business Development',
    description: 'Cooperative enterprise and community business',
    deadline: 'November 5, 2029',
    aiMetadata: {
      studentTypes: ['society'],
      fieldCategories: ['Business', 'Economics', 'Social Sciences'],
      requiredSubjects: ['Math', 'English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['cooperative', 'business', 'enterprise', 'community']
    }
  },
  {
    id: 49,
    image: cambodia5,
    title: 'Molecular Biology Research',
    description: 'Cutting-edge biological research',
    deadline: 'December 12, 2029',
    aiMetadata: {
      studentTypes: ['science'],
      fieldCategories: ['Biology', 'Biotechnology', 'Research'],
      requiredSubjects: ['Science', 'Biology', 'Chemistry'],
      minGPA: 3.5,
      difficultyLevel: 'very-competitive',
      keywords: ['molecular', 'biology', 'research', 'science']
    }
  },
  {
    id: 50,
    image: cambodia6,
    title: 'Child Development & Care',
    description: 'Early childhood education and development',
    deadline: 'January 25, 2030',
    aiMetadata: {
      studentTypes: ['both'],
      fieldCategories: ['Education', 'Social Sciences', 'Psychology'],
      requiredSubjects: ['English'],
      minGPA: 2.8,
      difficultyLevel: 'moderate',
      keywords: ['child', 'development', 'education', 'care', 'psychology']
    }
  }
];

// Related scholarships for detail pages
export const relatedScholarships = [
  { id: 2, image: cambodia2, title: 'HOPE Youth Scholarship (CanTech)' },
  { id: 3, image: cambodia3, title: '100% Full Undergraduate Scholarship Program' },
  { id: 1, image: cambodia1, title: 'Techo Digital Talent Scholarship (Secondary School)' }
];

// Helper function to get scholarship by ID
export const getScholarshipById = (id) => {
  return cambodiaScholarships.find(s => s.id === parseInt(id)) || cambodiaScholarships[0];
};
