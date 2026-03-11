-- ========================================
-- CLEANUP: Delete all data from tables
-- ========================================
-- This script clears all scholarship, internship, and university data
-- Run this BEFORE seeding new data

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS=0;

-- Clear Scholarship related tables
TRUNCATE TABLE scholarship_field_of_study;
TRUNCATE TABLE scholarship_deadline;
TRUNCATE TABLE scholarship_benefit;
TRUNCATE TABLE scholarship_eligibility;
TRUNCATE TABLE scholarship;

-- Clear Internship related tables
TRUNCATE TABLE internship_field_of_study;
TRUNCATE TABLE internship_deadline;
TRUNCATE TABLE internship_benefit;
TRUNCATE TABLE internship_eligibility;
TRUNCATE TABLE internship;

-- Clear University related tables
TRUNCATE TABLE university_student_achievement;
TRUNCATE TABLE university_news;
TRUNCATE TABLE university_campus;
TRUNCATE TABLE university_application_guide_step;
TRUNCATE TABLE university_major;
TRUNCATE TABLE university_tuition_fee;
TRUNCATE TABLE university;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;

SELECT 'Cleanup completed - All data deleted!' AS status;
