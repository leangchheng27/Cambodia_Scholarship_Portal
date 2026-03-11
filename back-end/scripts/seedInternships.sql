-- ========================================
-- SEED DATA: INTERNSHIPS
-- ========================================

INSERT INTO internship (name, description, company, duration, registration_link, image_url) VALUES
('Google Summer of Code', 'Paid internship program for university students', 'Google LLC', '3 months (Summer)', 'summerofcode.withgoogle.com', 'https://example.com/internship1.png'),
('Microsoft TEALS Program', 'Teaching and technology internship opportunity', 'Microsoft Corporation', '1 academic year', 'www.microsoft.com/teals', 'https://example.com/internship2.png'),
('Goldman Sachs Internship', 'Finance and technology internship program', 'Goldman Sachs Group, Inc.', '10-12 weeks (Summer)', 'www.goldmansachs.com/careers', 'https://example.com/internship3.png'),
('Facebook/Meta Internship', 'Software engineering internship at Meta', 'Meta (Facebook)', 'Summer internship', 'www.metacareers.com', 'https://example.com/internship1.png'),
('Amazon Internship Program', 'Technology and business internship opportunities', 'Amazon.com, Inc.', '12 weeks', 'www.amazon.jobs', 'https://example.com/internship2.png');

-- INTERNSHIP BENEFITS - Google Summer of Code
INSERT INTO internship_benefit (internship_id, benefit) VALUES
(1, 'Stipend: $1,500 - $3,000 (based on project size)'),
(1, 'Work remotely from anywhere'),
(1, 'Mentorship from experienced developers'),
(1, 'Certificate of completion'),
(1, 'Build portfolio with real projects'),
(1, 'Networking opportunities'),
(1, 'Potential for future employment at Google');

-- INTERNSHIP BENEFITS - Microsoft TEALS
INSERT INTO internship_benefit (internship_id, benefit) VALUES
(2, 'Professional development in education technology'),
(2, 'Teaching experience with mentorship'),
(2, 'Certificate from Microsoft'),
(2, 'Access to Microsoft resources and tools'),
(2, 'Networking with education professionals'),
(2, 'Potential career path in tech education'),
(2, 'Make impact in local schools');

-- INTERNSHIP BENEFITS - Goldman Sachs
INSERT INTO internship_benefit (internship_id, benefit) VALUES
(3, 'Competitive salary (pro-rated)'),
(3, 'Housing assistance or stipend'),
(3, 'Professional training and development'),
(3, 'Networking events'),
(3, 'Mentorship program'),
(3, 'Potential full-time offer after graduation'),
(3, 'Exposure to global financial markets');

-- INTERNSHIP BENEFITS - Meta
INSERT INTO internship_benefit (internship_id, benefit) VALUES
(4, 'Competitive internship salary'),
(4, 'Housing stipend or on-campus housing'),
(4, 'Free meals and beverages'),
(4, 'Mentorship and training programs'),
(4, 'Networking events with engineers'),
(4, 'Career development opportunities'),
(4, 'Potential for return offer');

-- INTERNSHIP BENEFITS - Amazon
INSERT INTO internship_benefit (internship_id, benefit) VALUES
(5, 'Competitive salary for interns'),
(5, 'Relocation assistance'),
(5, 'Free housing in summer'),
(5, 'Full benefits package'),
(5, 'Technical mentorship'),
(5, 'Networking with Amazon engineers'),
(5, 'Potential for full-time conversion');

-- INTERNSHIP DEADLINES - Google Summer of Code
INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES
(1, 'Application Deadline', '2026-06-15');

-- INTERNSHIP DEADLINES - Microsoft TEALS
INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES
(2, 'Application Deadline', '2026-07-20');

-- INTERNSHIP DEADLINES - Goldman Sachs
INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES
(3, 'Summer Internship', '2026-08-10');

-- INTERNSHIP DEADLINES - Meta
INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES
(4, 'Application Deadline', '2026-09-05');

-- INTERNSHIP DEADLINES - Amazon
INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES
(5, 'Summer Application', '2026-08-20');

-- INTERNSHIP ELIGIBILITY - Google Summer of Code
INSERT INTO internship_eligibility (internship_id, eligibility) VALUES
(1, 'Currently enrolled university student (18+ years)'),
(1, 'Strong programming skills'),
(1, 'Familiar with open source development'),
(1, 'Good communication skills in English'),
(1, 'Available to work 175-350 hours over summer'),
(1, 'Passion for coding and learning');

-- INTERNSHIP ELIGIBILITY - Microsoft TEALS
INSERT INTO internship_eligibility (internship_id, eligibility) VALUES
(2, 'Background in computer science or technology'),
(2, 'Passion for teaching and education'),
(2, 'Good communication skills'),
(2, 'Commitment for one academic year'),
(2, 'Available 2-4 hours per week during school terms'),
(2, 'Pass background check');

-- INTERNSHIP ELIGIBILITY - Goldman Sachs
INSERT INTO internship_eligibility (internship_id, eligibility) VALUES
(3, 'Currently pursuing undergraduate or graduate degree'),
(3, 'Strong academic record'),
(3, 'Excellent analytical and quantitative skills'),
(3, 'Fluency in English'),
(3, 'Leadership experience'),
(3, 'Interest in financial services or technology'),
(3, 'Authorization to work in internship location');

-- INTERNSHIP ELIGIBILITY - Meta
INSERT INTO internship_eligibility (internship_id, eligibility) VALUES
(4, 'Enrolled in accredited university'),
(4, 'Strong computer science fundamentals'),
(4, 'Proficiency in at least one programming language'),
(4, 'Problem-solving and analytical skills'),
(4, 'Excellent communication abilities'),
(4, 'Ability to work in the USA'),
(4, 'Available for summer internship');

-- INTERNSHIP ELIGIBILITY - Amazon
INSERT INTO internship_eligibility (internship_id, eligibility) VALUES
(5, 'Currently enrolled in accredited university'),
(5, 'Strong technical skills and knowledge'),
(5, 'Working towards a relevant degree'),
(5, 'Excellent problem-solving skills'),
(5, 'Great communication abilities'),
(5, 'Interest in technology or operations'),
(5, 'Available for 12-week internship');

-- INTERNSHIP FIELD OF STUDY
INSERT INTO internship_field_of_study (internship_id, field_name) VALUES
(1, 'Computer Science'),
(1, 'Software Engineering'),
(1, 'Information Technology'),
(1, 'Data Science'),
(1, 'Web Development'),
(2, 'Computer Science'),
(2, 'Education'),
(2, 'Information Technology'),
(2, 'Teaching'),
(3, 'Finance'),
(3, 'Economics'),
(3, 'Business Administration'),
(3, 'Computer Science'),
(3, 'Engineering'),
(3, 'Banking'),
(4, 'Computer Science'),
(4, 'Software Engineering'),
(4, 'Data Science'),
(4, 'Artificial Intelligence'),
(4, 'Machine Learning'),
(5, 'Computer Science'),
(5, 'Software Engineering'),
(5, 'Business'),
(5, 'Operations'),
(5, 'Mechanical Engineering');
