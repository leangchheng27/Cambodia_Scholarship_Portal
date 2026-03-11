-- ========================================
-- SEED DATA: UNIVERSITIES
-- ========================================

INSERT INTO university (name, description, location, image_url, website) VALUES
('Cambodia Academy of Digital Technology', 'National public research and education institution dedicated to advancing digital technology, innovation, and building a digital society', 'Phnom Penh', 'https://example.com/cadt.png', 'www.cadt.edu.kh'),
('Royal University of Phnom Penh', 'Premier university offering comprehensive education programs', 'Phnom Penh', 'https://example.com/rupp.png', 'www.rupp.edu.kh'),
('Institute of Technology of Cambodia', 'Leading technology and engineering education institution', 'Phnom Penh', 'https://example.com/itc.png', 'www.itc.edu.kh'),
('Royal University of Agriculture', 'Focus on agricultural sciences and sustainable development', 'Phnom Penh', 'https://example.com/rua.png', 'www.rua.edu.kh'),
('Royal University of Law and Economics', 'Specialized in law, economics, and social sciences', 'Phnom Penh', 'https://example.com/rule.png', 'www.rule.edu.kh'),
('Siem Reap University', 'Regional university serving Siem Reap province', 'Siem Reap', 'https://example.com/sru.png', 'www.sru.edu.kh'),
('Preah Ang Mealea University', 'Higher education provider in Sihanoukville', 'Sihanoukville', 'https://example.com/pamu.png', 'www.pamu.edu.kh'),
('Battambang University', 'Regional university in Battambang province', 'Battambang', 'https://example.com/bu.png', 'www.bu.edu.kh'),
('Kampot University', 'Educational institution in Kampot province', 'Kampot', 'https://example.com/kepu.png', 'www.kepu.edu.kh'),
('Kep Institute of Technology', 'Technology-focused institution in Kep', 'Kep', 'https://example.com/kit.png', 'www.kit.edu.kh'),
('Kandal Provincial University', 'University serving Kandal province', 'Ta Khmau', 'https://example.com/kpu.png', 'www.kpu.edu.kh'),
('Banteay Meanchey University', 'Higher education in Banteay Meanchey', 'Sisophon', 'https://example.com/bmu.png', 'www.bmu.edu.kh'),
('Kampong Cham University', 'University in Kampong Cham province', 'Kampong Cham', 'https://example.com/kcamu.png', 'www.kcamu.edu.kh'),
('Kampong Thom University', 'Educational institution in Kampong Thom', 'Stung Sen', 'https://example.com/ktmu.png', 'www.ktmu.edu.kh'),
('Kampong Chhnang University', 'University serving Kampong Chhnang province', 'Kampong Chhnang', 'https://example.com/kcuu.png', 'www.kcuu.edu.kh'),
('Stoeung Treng College of Technology', 'Technology college in Stoeung Treng', 'Stoeung Treng', 'https://example.com/stct.png', 'www.stct.edu.kh'),
('Kompong Speu University', 'University in Kompong Speu province', 'Chbar Mon', 'https://example.com/ksu.png', 'www.ksu.edu.kh'),
('Pursat University', 'Higher education provider in Pursat', 'Pursat', 'https://example.com/pu.png', 'www.pu.edu.kh'),
('Oddar Meanchey College', 'College of higher education in Oddar Meanchey', 'Samraong', 'https://example.com/omc.png', 'www.omc.edu.kh'),
('Svay Rieng University', 'University in Svay Rieng province', 'Svay Rieng', 'https://example.com/sru2.png', 'www.sru2.edu.kh'),
('Koh Kong University', 'Higher education in Koh Kong province', 'Koh Kong', 'https://example.com/kku.png', 'www.kku.edu.kh'),
('Tbong Khmum University', 'University in Tbong Khmum province', 'Tbong Khmum', 'https://example.com/tku.png', 'www.tku.edu.kh'),
('Preah Vihear College of Arts', 'Arts-focused institution in Preah Vihear', 'Preah Vihear', 'https://example.com/pvca.png', 'www.pvca.edu.kh'),
('Mondulkiri University', 'University in Mondulkiri province', 'Sen Monorom', 'https://example.com/mu.png', 'www.mu.edu.kh'),
('Ratanakiri University', 'Higher education in Ratanakiri province', 'Banlung', 'https://example.com/ru.png', 'www.ru.edu.kh'),
('Kratie University', 'University serving Kratie province', 'Kratie', 'https://example.com/kru.png', 'www.kru.edu.kh'),
('Pailin College of Technology', 'Technology college in Pailin', 'Pailin', 'https://example.com/pct.png', 'www.pct.edu.kh'),
('Prey Veng University', 'Higher education in Prey Veng province', 'Prey Veng', 'https://example.com/pvu.png', 'www.pvu.edu.kh'),
('Takeo University', 'University in Takeo province', 'Doun Kaev', 'https://example.com/tu.png', 'www.tu.edu.kh');

-- MAJORS - CADT (ID: 1)
INSERT INTO university_major (university_id, name, degree_level, specialization) VALUES
(1, 'Computer Science', 'Bachelor', 'Software Engineering'),
(1, 'Computer Science', 'Bachelor', 'Data Science'),
(1, 'Telecommunication & Networking', 'Bachelor', 'Cybersecurity'),
(1, 'Digital Business', 'Bachelor', 'e-Commerce'),
(1, 'Digital Business', 'Bachelor', 'Digital Economy');

-- MAJORS - RUPP (ID: 2)
INSERT INTO university_major (university_id, name, degree_level, specialization) VALUES
(2, 'Engineering', 'Bachelor', 'Civil Engineering'),
(2, 'Engineering', 'Bachelor', 'Mechanical Engineering'),
(2, 'Business Administration', 'Bachelor', 'Management'),
(2, 'Law', 'Bachelor', 'Constitutional Law');

-- MAJORS - ITC (ID: 3)
INSERT INTO university_major (university_id, name, degree_level, specialization) VALUES
(3, 'Computer Science', 'Bachelor', 'Software Development'),
(3, 'Electrical Engineering', 'Bachelor', 'Power Systems'),
(3, 'Industrial Engineering', 'Bachelor', 'Operations Management');

-- APPLICATION GUIDE STEPS - CADT (ID: 1)
INSERT INTO university_application_guide_step (university_id, step_number, title, description) VALUES
(1, 1, 'Complete Application Form', 'Fill out the official online application form at www.cadt.edu.kh/scholarship'),
(1, 2, 'Submit Required Documents', 'Prepare and submit: National ID/Passport, High school diploma, Academic transcripts, 2 passport photos'),
(1, 3, 'Pass Entrance Examination', 'Take Mathematics, Science, and English exams'),
(1, 4, 'Interview', 'Participate in interview for scholarship applicants'),
(1, 5, 'Results Announcement', 'Check results on the website or contact admissions office');

-- TUITION FEES - CADT (ID: 1)
INSERT INTO university_tuition_fee (university_id, student_type, amount, note) VALUES
(1, 'Government Scholarship', 0, 'Full tuition covered for eligible students'),
(1, 'Self-funded Local', 1500, 'Per semester tuition in USD'),
(1, 'Self-funded International', 2500, 'Per semester tuition in USD');

-- CAMPUS - CADT (ID: 1)
INSERT INTO university_campus (university_id, name, description, image_url) VALUES
(1, 'Main Campus - Phnom Penh', 'Located on Russian Federation Boulevard (110), equipped with modern lecture halls, computer labs, research facilities, and library', 'https://example.com/cadt-campus1.png'),
(1, 'Campus - Digital Hub', 'Innovation center with incubation spaces for tech startups and entrepreneurship programs', 'https://example.com/cadt-campus2.png');

-- NEWS - CADT (ID: 1)
INSERT INTO university_news (university_id, title, content, image_url, published_at) VALUES
(1, 'New AI Lab Launched', 'CADT inaugurates state-of-the-art artificial intelligence research laboratory with industry partnerships', 'https://example.com/news1.png', '2026-01-15'),
(1, 'Internship Opportunities with Google', 'Google Summer of Code partnership opens opportunities for CADT students', 'https://example.com/news2.png', '2026-01-10'),
(1, 'Digital Transformation Scholarship 2026', 'Applications now open for 500 Techo Digital Talent Scholarships', 'https://example.com/news3.png', '2025-12-20');

-- CAMPUS - RUPP (ID: 2)
INSERT INTO university_campus (university_id, name, description, image_url) VALUES
(2, 'Main Campus', 'Central Phnom Penh location with multiple faculties and research centers', 'https://example.com/rupp-campus.png');

-- TUITION FEES - RUPP (ID: 2)
INSERT INTO university_tuition_fee (university_id, student_type, amount, note) VALUES
(2, 'Government Scholarship', 0, 'Limited scholarship positions'),
(2, 'Self-funded', 2000, 'Per year tuition');

-- CAMPUS - ITC (ID: 3)
INSERT INTO university_campus (university_id, name, description, image_url) VALUES
(3, 'Engineering Campus', 'State-of-the-art engineering and technology facilities', 'https://example.com/itc-campus.png');

-- TUITION FEES - ITC (ID: 3)
INSERT INTO university_tuition_fee (university_id, student_type, amount, note) VALUES
(3, 'Government Scholarship', 0, 'Competitive scholarship program'),
(3, 'Self-funded', 1800, 'Per year tuition');

-- STUDENT ACHIEVEMENTS - CADT (ID: 1)
INSERT INTO university_student_achievement (university_id, title, description, image_url, date) VALUES
(1, 'Global Innovation Challenge Winner', 'CADT student team won the Asia Pacific Tech Innovation Challenge 2025', 'https://example.com/achievement1.png', '2025-11-20'),
(1, 'Educational Excellence Award', 'Three CADT graduates received international scholarships for graduate studies', 'https://example.com/achievement2.png', '2025-10-15'),
(1, 'Research Publication', 'Faculty and students published 15 research papers in international journals', 'https://example.com/achievement3.png', '2025-09-10');

-- STUDENT ACHIEVEMENTS - RUPP (ID: 2)
INSERT INTO university_student_achievement (university_id, title, description, image_url, date) VALUES
(2, 'National Debate Champions', 'RUPP debate team won the national inter-university debate competition', 'https://example.com/achievement4.png', '2025-12-01'),
(2, 'Community Service Initiative', 'RUPP students launched rural development projects across Cambodia', 'https://example.com/achievement5.png', '2025-11-15');
