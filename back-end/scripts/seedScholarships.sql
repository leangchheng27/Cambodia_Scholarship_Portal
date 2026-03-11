-- ========================================
-- SEED DATA: SCHOLARSHIPS
-- ========================================

-- ABROAD SCHOLARSHIPS
INSERT INTO scholarship (name, description, funded_by, course_duration, registration_link, image_url) VALUES
('Fulbright Scholarship Program', 'Educational exchange opportunity for students and professionals', 'U.S. Department of State', 'Master\'s: 2 years, PhD: 3-5 years', 'www.fulbright.org', 'https://example.com/abroad1.png'),
('Chevening Scholarships', 'UK government scholarships for future leaders', 'Foreign, Commonwealth & Development Office (FCDO)', '1 year Master\'s degree', 'www.chevening.org', 'https://example.com/abroad2.png'),
('DAAD Scholarships', 'German Academic Exchange Service scholarships', 'DAAD (Deutscher Akademischer Austauschdienst)', 'Master\'s: 1-2 years, PhD: 3-4 years', 'www.daad.de', 'https://example.com/abroad3.png'),
('Commonwealth Scholarships', 'Study opportunities in Commonwealth countries', 'UK Foreign, Commonwealth & Development Office', 'Master\'s: 1-2 years', 'www.commonwealthscholarships.org', 'https://example.com/abroad1.png');

-- CAMBODIA SCHOLARSHIPS
INSERT INTO scholarship (name, description, funded_by, course_duration, registration_link, image_url) VALUES
('Techo Digital Talent Scholarship', 'Opportunities to gain Techo Digital Talent Scholarship', 'Government of Cambodia', '4 Years', 'www.cadt.edu.kh/scholarship', 'https://example.com/cambodia1.jpg'),
('CanTech HOPE Youth Program', 'កម្មវិធីសិក្សា HOPE យុវវ័យរបស់ CanTech', 'CanTech Education Foundation', '1-2 Years', 'www.cantech.edu.kh', 'https://example.com/cambodia2.png'),
('Full Scholarship Program 100%', 'អាហារូបករណ៍សិក្សាថ្នាក់ឧត្តមសិក្សា 100%', 'Private Education Foundation', '4 Years', 'www.scholarship900.edu.kh', 'https://example.com/cambodia3.png'),
('Our Community Organization Scholarship', 'Scholarships from OUR COMMUNITY ORGANIZATION', 'Our Community Organization', 'Varies', 'www.ourcommunity.org', 'https://example.com/cambodia4.png');

-- SCHOLARSHIP BENEFITS - Fulbright
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(1, 'Full tuition coverage'),
(1, 'Monthly living stipend'),
(1, 'Round-trip airfare to the United States'),
(1, 'Health insurance'),
(1, 'Accident coverage'),
(1, 'Pre-departure orientation'),
(1, 'Professional development opportunities'),
(1, 'Access to Fulbright alumni network');

-- SCHOLARSHIP BENEFITS - Chevening
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(2, 'Full tuition fees covered'),
(2, 'Monthly living allowance'),
(2, 'Return airfare to the UK'),
(2, 'Arrival allowance'),
(2, 'Thesis grant'),
(2, 'Travel grant for attending Chevening events'),
(2, 'Access to exclusive Chevening community');

-- SCHOLARSHIP BENEFITS - DAAD
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(3, 'Monthly scholarship payment (€934 for graduates, €1,200 for PhD)'),
(3, 'Travel allowance'),
(3, 'Health insurance'),
(3, 'German language course support'),
(3, 'Study and research allowance'),
(3, 'Monthly rent subsidy'),
(3, 'Family allowances (if applicable)');

-- SCHOLARSHIP BENEFITS - Commonwealth
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(4, 'Full tuition coverage'),
(4, 'Monthly stipend'),
(4, 'Travel grants'),
(4, 'Health insurance'),
(4, 'Settling-in allowance'),
(4, 'Air passage to the United Kingdom');

-- SCHOLARSHIP BENEFITS - Techo Digital
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(5, '1 Laptop'),
(5, '100% tuition fee coverage'),
(5, 'Good job opportunities and high salary'),
(5, 'Support from the Ministry of Education, Youth and Sport for 4 years');

-- SCHOLARSHIP BENEFITS - CanTech
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(6, 'Full tuition fee coverage'),
(6, 'Study materials and supplies'),
(6, 'Monthly stipend for transportation'),
(6, 'Academic mentorship program');

-- SCHOLARSHIP BENEFITS - Full Scholarship 100%
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(7, 'Full tuition coverage'),
(7, 'Monthly living allowance'),
(7, 'Accommodation support'),
(7, 'Health insurance'),
(7, 'International exposure opportunities');

-- SCHOLARSHIP BENEFITS - Our Community
INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES
(8, 'Tuition assistance'),
(8, 'Educational materials'),
(8, 'Community mentorship'),
(8, 'Social impact focus');

-- SCHOLARSHIP DEADLINES - Fulbright
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(1, 'Master\'s Programs', '2026-06-15'),
(1, 'PhD Programs', '2026-07-01');

-- SCHOLARSHIP DEADLINES - Chevening
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(2, 'All UK Universities', '2026-07-20');

-- SCHOLARSHIP DEADLINES - DAAD
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(3, 'Master\'s Programs', '2026-08-10'),
(3, 'PhD Programs', '2026-09-15');

-- SCHOLARSHIP DEADLINES - Commonwealth
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(4, 'All Universities', '2026-09-05');

-- SCHOLARSHIP DEADLINES - Techo
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(5, 'CADT/other institutes', '2025-10-22'),
(5, 'AUPP', '2025-10-08');

-- SCHOLARSHIP DEADLINES - CanTech
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(6, 'All participating schools', '2026-07-20');

-- SCHOLARSHIP DEADLINES - Full Scholarship 100%
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(7, 'Partner Universities', '2026-08-10');

-- SCHOLARSHIP DEADLINES - Our Community
INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES
(8, 'All partner institutions', '2026-09-05');

-- SCHOLARSHIP ELIGIBILITY - Fulbright
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(1, 'Cambodian citizenship required'),
(1, 'Bachelor\'s degree with excellent academic record'),
(1, 'English proficiency (TOEFL/IELTS required)'),
(1, 'Leadership potential and commitment to return to Cambodia'),
(1, 'No prior study in the United States for more than one year'),
(1, 'Strong motivation to contribute to Cambodia\'s development');

-- SCHOLARSHIP ELIGIBILITY - Chevening
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(2, 'Citizen of Cambodia'),
(2, 'Minimum 2 years work experience'),
(2, 'Undergraduate degree (equivalent to UK upper second-class)'),
(2, 'Meet English language requirement'),
(2, 'Apply to three eligible UK university courses'),
(2, 'Return to Cambodia for minimum 2 years after scholarship');

-- SCHOLARSHIP ELIGIBILITY - DAAD
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(3, 'Excellent Bachelor\'s/Master\'s degree'),
(3, 'Work experience preferred'),
(3, 'German or English language proficiency'),
(3, 'Acceptance from German university'),
(3, 'Strong academic and professional background'),
(3, 'Commitment to development cooperation');

-- SCHOLARSHIP ELIGIBILITY - Commonwealth
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(4, 'Cambodian citizenship'),
(4, 'First-class honours degree or equivalent'),
(4, 'Work experience (2+ years preferred)'),
(4, 'Select priority developing country areas'),
(4, 'English language proficiency'),
(4, 'Strong academic record');

-- SCHOLARSHIP ELIGIBILITY - Techo
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(5, 'Students who pass the 2025 baccalaureate exam (Grades A/B/C)'),
(5, 'Exams: Mathematics, Science, English + Interview'),
(5, 'Encouragement given to disadvantaged students, students from remote areas, students with disabilities, and female students');

-- SCHOLARSHIP ELIGIBILITY - CanTech
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(6, 'Currently enrolled in secondary school'),
(6, 'Good academic standing'),
(6, 'Financial need demonstrated'),
(6, 'Strong motivation to learn');

-- SCHOLARSHIP ELIGIBILITY - Full Scholarship 100%
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(7, 'High school graduation with excellent grades'),
(7, 'Pass entrance examination'),
(7, 'Demonstrate leadership potential'),
(7, 'Community service experience preferred');

-- SCHOLARSHIP ELIGIBILITY - Our Community
INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES
(8, 'Cambodian student'),
(8, 'Demonstrated financial need'),
(8, 'Good academic record'),
(8, 'Community involvement');

-- SCHOLARSHIP FIELD OF STUDY
INSERT INTO scholarship_field_of_study (scholarship_id, field_name) VALUES
(1, 'All Fields'),
(1, 'Engineering'),
(1, 'Science'),
(1, 'Business'),
(1, 'Social Sciences'),
(1, 'Arts'),
(1, 'Humanities'),
(2, 'Business Administration'),
(2, 'Management'),
(2, 'International Relations'),
(2, 'Engineering'),
(3, 'Engineering'),
(3, 'Natural Sciences'),
(3, 'Economics'),
(3, 'Development Studies'),
(3, 'Computer Science'),
(4, 'Development Studies'),
(4, 'Public Health'),
(4, 'Education'),
(4, 'Environment'),
(5, 'Computer Science'),
(5, 'Data Science'),
(5, 'Digital Business'),
(5, 'Telecommunication'),
(5, 'Cybersecurity'),
(6, 'General Education'),
(6, 'Science'),
(6, 'Mathematics'),
(7, 'Engineering'),
(7, 'Technology'),
(7, 'Business Administration'),
(7, 'Medical Sciences'),
(8, 'Various Fields');
