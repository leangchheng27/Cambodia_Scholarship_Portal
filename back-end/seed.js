import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function seed() {
  const connection = await mysql.createConnection(dbConfig);

  // Universities
  for (let i = 0; i < 3; i++) {
    const [uniResult] = await connection.execute(
      'INSERT INTO university (name, description, location, image_url, website) VALUES (?, ?, ?, ?, ?)',
      [
        faker.company.name(),
        faker.lorem.paragraph(),
        faker.location.city(),
        faker.image.url(),
        faker.internet.url()
      ]
    );
    const universityId = uniResult.insertId;

    // Majors
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO university_major (university_id, name, degree_level, specialization) VALUES (?, ?, ?, ?)',
        [
          universityId,
          faker.person.jobTitle(),
          faker.helpers.arrayElement(['Bachelor', 'Master']),
          faker.person.jobArea()
        ]
      );
    }

    // Campuses
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO university_campus (university_id, name, description, image_url) VALUES (?, ?, ?, ?)',
        [
          universityId,
          faker.company.name() + ' Campus',
          faker.lorem.paragraph(),
          faker.image.url()
        ]
      );
    }

    // Application Guide Steps
    for (let j = 1; j <= 3; j++) {
      await connection.execute(
        'INSERT INTO university_application_guide_step (university_id, step_number, title, description) VALUES (?, ?, ?, ?)',
        [
          universityId,
          j,
          'Step ' + j,
          faker.lorem.sentence()
        ]
      );
    }

    // News
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO university_news (university_id, title, content, image_url, published_at) VALUES (?, ?, ?, ?, ?)',
        [
          universityId,
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          faker.image.url(),
          faker.date.past()
        ]
      );
    }

    // Student Achievements
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO university_student_achievement (university_id, title, description, image_url, date) VALUES (?, ?, ?, ?, ?)',
        [
          universityId,
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          faker.image.url(),
          faker.date.past()
        ]
      );
    }
  }

  // Scholarships
  for (let i = 0; i < 3; i++) {
    const [schResult] = await connection.execute(
      'INSERT INTO scholarship (name, description, funded_by, course_duration, registration_link, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [
        faker.company.name() + ' Scholarship',
        faker.lorem.paragraph(),
        faker.company.name(),
        faker.helpers.arrayElement(['1 Year', '2 Years', '4 Years']),
        faker.internet.url(),
        faker.image.url()
      ]
    );
    const scholarshipId = schResult.insertId;

    // Fields of Study
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO scholarship_field_of_study (scholarship_id, field_name) VALUES (?, ?)',
        [
          scholarshipId,
          faker.person.jobTitle()
        ]
      );
    }

    // Benefits
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO scholarship_benefit (scholarship_id, benefit) VALUES (?, ?)',
        [
          scholarshipId,
          faker.lorem.sentence()
        ]
      );
    }

    // Eligibility
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO scholarship_eligibility (scholarship_id, eligibility) VALUES (?, ?)',
        [
          scholarshipId,
          faker.lorem.sentence()
        ]
      );
    }

    // Deadlines
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO scholarship_deadline (scholarship_id, institute, deadline) VALUES (?, ?, ?)',
        [
          scholarshipId,
          faker.company.name(),
          faker.date.future()
        ]
      );
    }
  }

  // Internships
  for (let i = 0; i < 3; i++) {
    const [intResult] = await connection.execute(
      'INSERT INTO internship (name, description, company, duration, registration_link, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [
        faker.company.name() + ' Internship',
        faker.lorem.paragraph(),
        faker.company.name(),
        faker.helpers.arrayElement(['3 Months', '6 Months', '1 Year']),
        faker.internet.url(),
        faker.image.url()
      ]
    );
    const internshipId = intResult.insertId;

    // Fields of Study
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO internship_field_of_study (internship_id, field_name) VALUES (?, ?)',
        [
          internshipId,
          faker.person.jobTitle()
        ]
      );
    }

    // Benefits
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO internship_benefit (internship_id, benefit) VALUES (?, ?)',
        [
          internshipId,
          faker.lorem.sentence()
        ]
      );
    }

    // Eligibility
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO internship_eligibility (internship_id, eligibility) VALUES (?, ?)',
        [
          internshipId,
          faker.lorem.sentence()
        ]
      );
    }

    // Deadlines
    for (let j = 0; j < 2; j++) {
      await connection.execute(
        'INSERT INTO internship_deadline (internship_id, institute, deadline) VALUES (?, ?, ?)',
        [
          internshipId,
          faker.company.name(),
          faker.date.future()
        ]
      );
    }
  }

  await connection.end();
  console.log('Mock data inserted for all tables!');
}

seed();