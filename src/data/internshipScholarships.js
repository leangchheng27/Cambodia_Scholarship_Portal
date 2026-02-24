// Import internship images
import internship1 from '../assets/internship/1.png';
import internship2 from '../assets/internship/2.png';
import internship3 from '../assets/internship/3.png';

export const internshipScholarships = [
  {
    id: 1,
    image: internship1,
    title: 'Google Summer of Code',
    description: 'Paid internship program for university students',
    deadline: 'មិថុនា ១៥, ២០២៦',
    details: {
      title: 'Google Summer of Code',
      subtitle: 'Google\'s Global Program for Student Developers',
      fundedBy: 'Google LLC',
      fieldsOfStudy: 'Computer Science, Software Engineering',
      courseDuration: '3 months (Summer)',
      deadlines: [
        { institute: 'Application Deadline', date: 'June 15, 2026' }
      ],
      registrationLinks: {
        website: 'summerofcode.withgoogle.com',
        telegram: 'Online Application'
      },
      overseasInfo: {
        telegram: 'https://t.me/gsoc',
        facebook: 'https://www.facebook.com/gsoc'
      },
      programs: [
        'Open Source Software Development',
        'Web Development',
        'Mobile App Development',
        'Machine Learning Projects',
        'DevOps and Infrastructure',
        'Data Science Applications'
      ],
      benefits: [
        'Stipend: $1,500 - $3,000 (based on project size)',
        'Work remotely from anywhere',
        'Mentorship from experienced developers',
        'Certificate of completion',
        'Build portfolio with real projects',
        'Networking opportunities',
        'Potential for future employment at Google'
      ],
      eligibility: [
        'Currently enrolled university student (18+ years)',
        'Strong programming skills',
        'Familiar with open source development',
        'Good communication skills in English',
        'Available to work 175-350 hours over summer',
        'Passion for coding and learning'
      ]
    }
  },
  {
    id: 2,
    image: internship2,
    title: 'Microsoft TEALS Program',
    description: 'Teaching and technology internship opportunity',
    deadline: 'កក្កដា ២០, ២០២៦',
    details: {
      title: 'Microsoft TEALS Program',
      subtitle: 'Technology Education and Literacy in Schools',
      fundedBy: 'Microsoft Corporation',
      fieldsOfStudy: 'Computer Science, Education',
      courseDuration: '1 academic year',
      deadlines: [
        { institute: 'Application Deadline', date: 'July 20, 2026' }
      ],
      registrationLinks: {
        website: 'www.microsoft.com/teals',
        telegram: 'Online Application'
      },
      overseasInfo: {
        telegram: 'https://t.me/microsoft_teals',
        facebook: 'https://www.facebook.com/MicrosoftTEALS'
      },
      programs: [
        'Computer Science Teaching Assistant',
        'Curriculum Development',
        'Student Mentorship',
        'Technology Integration in Education',
        'Educational Program Management'
      ],
      benefits: [
        'Professional development in education technology',
        'Teaching experience with mentorship',
        'Certificate from Microsoft',
        'Access to Microsoft resources and tools',
        'Networking with education professionals',
        'Potential career path in tech education',
        'Make impact in local schools'
      ],
      eligibility: [
        'Background in computer science or technology',
        'Passion for teaching and education',
        'Good communication skills',
        'Commitment for one academic year',
        'Available 2-4 hours per week during school terms',
        'Pass background check'
      ]
    }
  },
  {
    id: 3,
    image: internship3,
    title: 'Goldman Sachs Internship',
    description: 'Finance and technology internship program',
    deadline: 'សីហា ១០, ២០២៦',
    details: {
      title: 'Goldman Sachs Internship Program',
      subtitle: 'Global Banking and Technology Internship',
      fundedBy: 'Goldman Sachs Group, Inc.',
      fieldsOfStudy: 'Finance, Economics, Computer Science, Engineering',
      courseDuration: '10-12 weeks (Summer)',
      deadlines: [
        { institute: 'Summer Internship', date: 'August 10, 2026' }
      ],
      registrationLinks: {
        website: 'www.goldmansachs.com/careers',
        telegram: 'Online Application Portal'
      },
      overseasInfo: {
        telegram: 'https://t.me/goldmansachs_careers',
        facebook: 'https://www.facebook.com/GoldmanSachs'
      },
      programs: [
        'Investment Banking Division',
        'Global Markets',
        'Engineering Division',
        'Operations Division',
        'Controllers Division',
        'Risk Division'
      ],
      benefits: [
        'Competitive salary (pro-rated)',
        'Housing assistance or stipend',
        'Professional training and development',
        'Networking events',
        'Mentorship program',
        'Potential full-time offer after graduation',
        'Exposure to global financial markets'
      ],
      eligibility: [
        'Currently pursuing undergraduate or graduate degree',
        'Strong academic record',
        'Excellent analytical and quantitative skills',
        'Fluency in English',
        'Leadership experience',
        'Interest in financial services or technology',
        'Authorization to work in internship location'
      ]
    }
  },
  {
    id: 4,
    image: internship1,
    title: 'Facebook/Meta Internship',
    description: 'Software engineering internship at Meta',
    deadline: 'កញ្ញា ០៥, ២០២៦'
  },
  {
    id: 5,
    image: internship2,
    title: 'Amazon Internship Program',
    description: 'Technology and business internship opportunities',
    deadline: 'តុលា ១២, ២០២៦'
  },
  {
    id: 6,
    image: internship3,
    title: 'Accenture Internship',
    description: 'Consulting and technology internship program',
    deadline: 'វិច្ឆិកា ២៥, ២០២៦'
  },
  {
    id: 7,
    image: internship1,
    title: 'Deloitte Internship',
    description: 'Consulting and audit internship opportunities',
    deadline: 'ធ្នូ ០៨, ២០២៦'
  },
  {
    id: 8,
    image: internship2,
    title: 'McKinsey & Company Internship',
    description: 'Management consulting internship program',
    deadline: 'មករា ១៥, ២០២៧'
  },
  {
    id: 9,
    image: internship3,
    title: 'Boston Consulting Group Internship',
    description: 'Strategy and consulting internship opportunity',
    deadline: 'កុម្ភៈ ២០, ២០២៧'
  }
];

// Related internships for detail pages
export const relatedInternshipScholarships = [
  { id: 2, image: internship2, title: 'Microsoft TEALS Program' },
  { id: 3, image: internship3, title: 'Goldman Sachs Internship' },
  { id: 1, image: internship1, title: 'Google Summer of Code' }
];

// Helper function to get internship by ID
export const getInternshipScholarshipById = (id) => {
  return internshipScholarships.find(s => s.id === parseInt(id)) || internshipScholarships[0];
};
