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
    title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា',
    description: 'អាហារូបករណ៍សម្រាប់សិស្សានុសិស្សកម្រិតថ្នាក់វិទ្យាល័យ',
    deadline: 'មិថុនា ១៥, ២០២៦',
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
    title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមស្រេច',
    description: 'កម្មវិធីសិក្សា HOPE យុវវ័យរបស់ CanTech',
    deadline: 'កក្កដា ២០, ២០២៦',
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
      title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមស្រេច',
      subtitle: 'កម្មវិធីសិក្សា HOPE យុវវ័យរបស់ CanTech',
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
    title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 100%ត្រឹមត្រូវ ទ្រទ្រង់លើទំនុកចិត្ត៣២',
    description: 'កម្មវិធីជំនួយសិក្សាពេញលេញ',
    deadline: 'សីហា ១០, ២០២៦',
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
      title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 100%',
      subtitle: 'កម្មវិធីជំនួយសិក្សាពេញលេញ',
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
    deadline: 'កញ្ញា ០៥, ២០២៦',
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
    title: 'អាហារូបករណ៍សម្រាប់សិស្ស ១០០% នៅវិទ្យាល័យជាតិអន្ដរជាតិ',
    description: 'កម្មវិធីជំនួយ ១០០% សំរាប់សិស្សខ្លាំងៗ',
    deadline: 'តុលា ១២, ២០២៦',
    details: {
      title: 'អាហារូបករណ៍សម្រាប់សិស្ស ១០០% នៅវិទ្យាល័យជាតិអន្ដរជាតិ',
      subtitle: 'កម្មវិធីជំនួយ ១០០% សំរាប់សិស្សខ្លាំងៗ',
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
    title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 900% តែកំពុងការពារពីក្រោយ',
    description: 'កម្មវិធីជំនួយសិក្សាពេញលេញ',
    deadline: 'វិច្ឆិកា ២៥, ២០២៦',
    details: {
      title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 900%',
      subtitle: 'កម្មវិធីជំនួយសិក្សាពេញលេញ',
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
    title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា',
    description: 'អាហារូបករណ៍សម្រាប់សិស្សានុសិស្សកម្រិតថ្នាក់វិទ្យាល័យ',
    deadline: 'ធ្នូ ០៨, ២០២៦',
    details: {
      title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា',
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
    title: 'អាហារូបករណ៍មូលនិធិជាតិសម្រាប់ការអប់រំ',
    description: 'កម្មវិធីជំនួយសិស្សក្រីក្រ',
    deadline: 'មករា ១៥, ២០២៧',
    details: {
      title: 'អាហារូបករណ៍មូលនិធិជាតិសម្រាប់ការអប់រំ',
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
    title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា',
    description: 'កម្មវិធីជំនួយឧត្តមសិក្សា',
    deadline: 'កុម្ភៈ ២០, ២០២៧',
    details: {
      title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា',
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
    deadline: 'ធ្នូ ១, ២០២៦',
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
    deadline: 'វិច្ឆិកា ១៥, ២០២៦',
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
    deadline: 'មករា ២០, ២០២៧',
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
    deadline: 'កុម្ភៈ ២៨, ២០២៧',
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
    deadline: 'មីនា ៣១, ២០២៧',
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
    deadline: 'មេសា ១៥, ២០២៧',
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
    deadline: 'ឧសភា ១០, ២០២៧',
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
    deadline: 'មិថុនា ៥, ២០២៧',
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
    deadline: 'កក្កដា ២២, ២០២៧',
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
    deadline: 'សីហា ៨, ២០២៧',
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
    deadline: 'កញ្ញា ១៥, ២០២៧',
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
  }
];

// Related scholarships for detail pages
export const relatedScholarships = [
  { id: 2, image: cambodia2, title: 'អាហារូបករណ៍សម្រាប់កម្រិតថ្នាក់វិទ្យាល័យមធ្យមសិក្សា' },
  { id: 3, image: cambodia3, title: 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 900%' },
  { id: 1, image: cambodia1, title: 'កម្មវិធីសិក្សា HOPE យុវវ័យ' }
];

// Helper function to get scholarship by ID
export const getScholarshipById = (id) => {
  return cambodiaScholarships.find(s => s.id === parseInt(id)) || cambodiaScholarships[0];
};
