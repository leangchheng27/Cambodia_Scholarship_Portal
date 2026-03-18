import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import './HomePage.css';

const hubCards = [
  {
    title: 'Cambodia Scholarships',
    description: 'Discover verified local scholarships, compare requirements, and move straight into the programs that fit your goals.',
    href: '/scholarships/cambodia',
    label: 'Browse local scholarships',
    accent: 'cambodia',
  },
  {
    title: 'International Scholarships',
    description: 'Explore global scholarship opportunities with a cleaner entry point for study-abroad planning and deadline tracking.',
    href: '/scholarships/abroad',
    label: 'Explore abroad scholarships',
    accent: 'abroad',
  },
  {
    title: 'Internship Opportunities',
    description: 'Browse internship listings built for action, from quick discovery to detailed decision pages when users are ready.',
    href: '/scholarships/internship',
    label: 'Browse internships',
    accent: 'internship',
  },
  {
    title: 'University Portal',
    description: 'Compare universities, majors, campuses, and tuition inside a more structured decision surface.',
    href: '/university',
    label: 'View universities',
    accent: 'university',
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const primaryHref = user ? '/profile' : '/signup';
  const primaryLabel = user ? 'Open my profile' : 'Create account';
  const aiRecommendationHref = user ? '/profile' : '/signup?redirect=%2Fprofile';
  const quickActions = [
    { to: '/scholarships/cambodia', label: 'Find local scholarships' },
    { to: '/scholarships/abroad', label: 'Explore international scholarships' },
    { to: '/scholarships/internship', label: 'Browse internships' },
    { to: '/university', label: 'Compare universities' },
    { to: aiRecommendationHref, label: 'Get AI recommendations' },
    ...(user ? [{ to: '/profile', label: 'Manage my profile' }] : []),
    ...(user?.role === 'admin' ? [{ to: '/admin/dashboard', label: 'Open admin dashboard' }] : []),
  ];
  const portalCardRefs = useRef([]);
  const [visiblePortalCards, setVisiblePortalCards] = useState(() => hubCards.map(() => false));

  useEffect(() => {
    const cards = portalCardRefs.current.filter(Boolean);

    if (cards.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const cardIndex = Number(entry.target.dataset.cardIndex);
          if (Number.isNaN(cardIndex)) {
            return;
          }

          setVisiblePortalCards((prev) => {
            if (prev[cardIndex]) {
              return prev;
            }

            const next = [...prev];
            next[cardIndex] = true;
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-page premium-home-page">
      <div className="home-page-background" aria-hidden="true">
        <div className="home-page-orb home-page-orb-one" />
        <div className="home-page-orb home-page-orb-two" />
        <div className="home-page-grid" />
      </div>

      <Header />

      <main className="home-page-main">
        <section className="home-hub-shell">
          <div className="home-hub-frame">
            <div className="home-hub-copy">
              <h1 className="home-hero-title">One place to discover every scholarship and opportunity that fits your future.</h1>
              <p className="home-hero-description">
                Start here, choose your direction, and move into scholarships, internships, or universities without the homepage feeling like a long content feed.
              </p>

              <div className="home-hub-actions">
                <Link to={primaryHref} className="home-primary-cta">
                  {primaryLabel}
                </Link>
                {!user && (
                  <Link to="/login" className="home-secondary-cta">
                    Sign in
                  </Link>
                )}
              </div>

            </div>

            <div className="home-command-panel" aria-hidden="true">
              <div className="home-command-card home-command-card-main">
                <strong>Jump straight to what you need</strong>
                <p>Start from common tasks instead of browsing everything.</p>
                <div className="home-quick-actions">
                  {quickActions.map((action) => (
                    <Link key={action.to + action.label} to={action.to} className="home-quick-link">
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="home-command-card home-command-card-small">
                <strong>Recommendations from your real data</strong>
                <p>Add your student profile and grades, then let the AI matcher prioritize opportunities based on fit score.</p>
                <div className="home-recommendation-points">
                  <span>Profile-based matching</span>
                  <span>Grade-aware suggestions</span>
                  <span>Faster decision support</span>
                </div>
                <Link to={aiRecommendationHref} className="home-portal-link home-rec-cta">
                  {user ? 'Open my profile' : 'Get started'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home-portal-grid-shell">
          <div className="home-portal-grid">
            {hubCards.map((card, index) => (
              <article
                key={card.title}
                ref={(element) => {
                  portalCardRefs.current[index] = element;
                }}
                data-card-index={index}
                style={{ '--portal-delay': `${index * 90}ms` }}
                className={`home-portal-card home-portal-card-${card.accent} reveal-on-scroll${visiblePortalCards[index] ? ' is-visible' : ''}`}
              >
                <div className="home-portal-top">
                  <h2>{card.title}</h2>
                </div>
                <p>{card.description}</p>
                <Link to={card.href} className="home-portal-link">
                  {card.label}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
