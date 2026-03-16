import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const services = [
  {
    id: 'consultation',
    title: 'Application Strategy Consultation',
    price: '$19 / session',
    description:
      'A focused 1-on-1 consult to map your profile, target scholarships, and build a practical action timeline.',
    includes: ['45-minute mentor session', 'Personalized application roadmap', 'Priority checklist for next 14 days'],
  },
  {
    id: 'bootcamp',
    title: 'Scholarship Success Sessions',
    price: '$49 / package',
    featured: true,
    description:
      'Small group sessions designed to improve essays, interview confidence, and application quality for competitive programs.',
    includes: ['3 live sessions with mentor', 'Essay feedback + revision notes', 'Interview question practice'],
  },
  {
    id: 'cv-check',
    title: 'Internship CV Review',
    price: '$5 / review',
    description:
      'Get a detailed CV check tailored for internship applications, with practical edits recruiters care about.',
    includes: ['Line-by-line CV comments', 'Format + language polishing', 'Final score with improvement tips'],
  },
];

const processSteps = [
  {
    title: 'Choose A Service',
    text: 'Select the support package that matches your scholarship or internship goal.',
  },
  {
    title: 'Book Your Slot',
    text: 'Share your preferred date and current profile so we can prepare before the session.',
  },
  {
    title: 'Receive Action Plan',
    text: 'You get clear next steps, feedback notes, and practical advice you can apply immediately.',
  },
];

export default function ServicePage() {
  return (
    <div className="service-page">
      <Header />

      <section className="service-hero">
        <div className="service-hero-inner">
          <p className="service-eyebrow">CSP Premium Support</p>
          <h1>Services That Help You Win Scholarships</h1>
          <p>
            Turn scholarship information into real outcomes with guided consultation, practical sessions,
            and internship CV coaching.
          </p>
          <div className="service-hero-actions">
            <a href="#service-list" className="service-btn service-btn-primary">
              Explore Services
            </a>
            <Link to="/contact" className="service-btn service-btn-ghost">
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <main className="service-main">
        <section id="service-list" className="service-section">
          <div className="section-head">
            <h2>Our Paid Services</h2>
            <p>Designed for students who want structure, feedback, and a stronger application strategy.</p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article
                key={service.id}
                className={`service-card ${service.featured ? 'service-card-featured' : ''}`}
              >
                {service.featured && <span className="service-badge">Most Popular</span>}
                <h3>{service.title}</h3>
                <p className="service-price">{service.price}</p>
                <p className="service-description">{service.description}</p>

                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link to="/contact" className="service-btn service-btn-primary service-card-btn">
                  Book This Service
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="service-section service-process">
          <div className="section-head">
            <h2>How It Works</h2>
            <p>Simple process, clear outcomes, and guidance you can implement right away.</p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="process-card">
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
