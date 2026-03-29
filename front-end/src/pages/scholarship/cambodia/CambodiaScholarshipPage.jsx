import React, { useState, useEffect } from 'react';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import PosterCard from '../../../components/PosterCard/PosterCard.jsx';
import { getScholarships } from '../../../api/scholarshipApi.js';
import { getCustomModelRecommendations, getScholarshipsByMajorFields } from '../../../api/recommendationApi.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import LoadingText from '../../../components/ui/LoadingText/LoadingText.jsx';
import './CambodiaScholarshipPage.css';
import SearchInput from '../../../components/SearchInput/SearchInput.jsx';


import banner1 from '../../../assets/banner/p1.png';
import banner2 from '../../../assets/banner/p2.jpg';
import banner3 from '../../../assets/banner/p3.png';
import banner4 from '../../../assets/banner/p4.png';
import banner5 from '../../../assets/banner/p5.png';

const calculateGPA = (grades) => {
  if (!grades || Object.keys(grades).length === 0) return 0;
  const gradePoints = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
  const values = Object.values(grades);
  const total = values.reduce((sum, grade) => {
    const point = typeof grade === 'string' ? (gradePoints[grade.toUpperCase()] || 0) : parseFloat(grade) || 0;
    return sum + point;
  }, 0);
  return (total / values.length).toFixed(2);
};

const MAJORS = [
  { id: 1, title: 'IT & Computer Science', description: 'Master software, AI, and digital systems' },
  { id: 2, title: 'Engineering', description: 'Build infrastructure and technical systems' },
  { id: 3, title: 'Health & Medical Sciences', description: 'Healthcare, medicine, and life sciences' },
  { id: 4, title: 'Agriculture & Environmental', description: 'Farming, ecology, and environmental protection' },
  { id: 5, title: 'Architecture & Urban Planning', description: 'Design buildings and cities' },
  { id: 6, title: 'Business & Economics', description: 'Lead in business, finance, and economics' },
  { id: 7, title: 'Education', description: 'Shape the next generation of learners' },
  { id: 8, title: 'Arts & Media', description: 'Creative arts, design, and media production' },
  { id: 9, title: 'Law & Legal Studies', description: 'Study law, justice, and governance' },
  { id: 10, title: 'Social Sciences', description: 'Understand society, politics, and human behavior' },
  { id: 11, title: 'Tourism & Hospitality', description: 'Travel, tourism, and hospitality management' },
  { id: 12, title: 'Languages & Literature', description: 'Master languages, linguistics, and literature' },
];

export default function CambodiaScholarshipPage() {
  const { user, profile } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [allScholarships, setAllScholarships] = useState([]);
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [viewMode, setViewMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationsAvailable, setRecommendationsAvailable] = useState(false);
  const [search, setSearch] = useState('');
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const all = await getScholarships(search, 'cambodia');
        const cambodiaScholarships = all.filter(s => s.type === 'cambodia' || !s.type);
        setAllScholarships(cambodiaScholarships);

        // Check if user has grades for recommendations
        const effectiveProfile = { ...(user || {}), ...(profile || {}) };
        const hasGrades = effectiveProfile.grades && Object.keys(effectiveProfile.grades).length > 0;
        const stream = effectiveProfile.academicType || effectiveProfile.stream || 'science';

        if (hasGrades) {
          console.log('📋 Getting AI-recommended scholarships for Cambodia...');
          // Get top 5 majors from model
          const result = await getCustomModelRecommendations(
            {
              stream,
              grades: effectiveProfile.grades,
              gpa: effectiveProfile.gpa || calculateGPA(effectiveProfile.grades),
              strongSubjects: Object.keys(effectiveProfile.grades).filter(
                subject => effectiveProfile.grades[subject] === 'A' || effectiveProfile.grades[subject] === 'B'
              )
            },
            MAJORS,
            5
          );

          // Get top 5 majors
          const top5 = (result.recommendations || [])
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);

          // Get scholarships for these majors
          if (top5.length > 0) {
            const majorTitles = top5.map(major => major.title);
            const scholarshipsResult = await getScholarshipsByMajorFields(majorTitles);
            
            if (scholarshipsResult.success && scholarshipsResult.scholarships) {
              // Filter by Cambodia type only
              const cambodiaOnly = scholarshipsResult.scholarships.filter(
                s => s.type === 'cambodia'
              );
              setRecommendedScholarships(cambodiaOnly);
              setRecommendationsAvailable(cambodiaOnly.length > 0);
              if (cambodiaOnly.length > 0) {
                setViewMode('recommended');
              }
              console.log(`✅ Found ${cambodiaOnly.length} recommended Cambodia scholarships`);
            } else {
              setRecommendedScholarships([]);
              setRecommendationsAvailable(false);
              setViewMode('all');
            }
          }
        } else {
          setRecommendedScholarships([]);
          setRecommendationsAvailable(false);
          setViewMode('all');
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
        setError('Failed to load scholarships');
        setRecommendedScholarships([]);
        setRecommendationsAvailable(false);
        setViewMode('all');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchScholarships();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [user, profile, search]);

  const displayedScholarships = viewMode === 'recommended' && recommendationsAvailable
    ? recommendedScholarships
    : allScholarships;
  const hasRecommendationScores = viewMode === 'recommended' && recommendationsAvailable;

  const itemsPerPage = 12;
  const totalPages = Math.ceil(displayedScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = displayedScholarships.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewModeChange = (mode) => {
    if (mode === 'recommended' && !recommendationsAvailable) return;
    setViewMode(mode);
    setCurrentPage(1);
  };

  return (
    <div className="cambodia-list-page">
      <Header />
      <div className="resource-hero-banner-wrap">
        <HeroBanner slides={bannerSlides} />
        <div className="resource-hero-banner-overlay">
          <div className="resource-shell">
            <section className="resource-hero resource-hero-on-banner">
              <h1 className="resource-hero-title">Cambodia scholarship opportunities in a premium SaaS experience.</h1>
              <p className="resource-hero-description">
                Discover local scholarships through a polished poster-first workflow and dive into complete requirements in one click.
              </p>
              <div className="resource-hero-actions">
                <a className="resource-cta resource-cta-primary" href="#resource-posters">Browse Posters</a>
                <a className="resource-cta resource-cta-secondary" href="#resource-features">View Highlights</a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="resource-shell">
        <section id="resource-features" className="resource-section">
          <h2 className="resource-section-title">Purpose-built for scholarship decisions</h2>
          <p className="resource-section-description">Your existing poster to details flow is now wrapped in a stronger premium SaaS presentation.</p>
          <div className="resource-feature-grid">
            <article className="resource-feature-card">
              <h3>Poster-first browsing</h3>
              <p>Review opportunities visually before investing time in full scholarship requirements.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Structured detail tabs</h3>
              <p>Overview, eligibility, programs, benefits, and source links stay clear and scannable.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Priority-ready workflow</h3>
              <p>Shortlist faster with cleaner presentation and stronger content hierarchy.</p>
            </article>
          </div>
        </section>

        <div id="resource-posters" className="scholarship-list-container resource-posters">
          <SearchInput
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search internships by name..."
          />

          <div className="list-mode-toggle" role="group" aria-label="Scholarship list mode">
            <button type="button" className={`list-mode-btn ${viewMode === 'all' ? 'active' : ''}`} onClick={() => handleViewModeChange('all')}>
              All Data ({allScholarships.length})
            </button>
            <button type="button" className={`list-mode-btn ${viewMode === 'recommended' ? 'active' : ''}`} onClick={() => handleViewModeChange('recommended')} disabled={!recommendationsAvailable}>
              Recommended ({recommendedScholarships.length})
            </button>
          </div>

          {!recommendationsAvailable && (
            <p className="list-mode-hint">Recommendation mode unlocks when student profile and grades are available.</p>
          )}

          <div className="scholarship-grid">
            {loading ? (
              <LoadingText text="Loading scholarships..." /> // ✅ only grid loads
            ) : error ? (
              <p className="error">{error}</p>
            ) : currentScholarships.length === 0 ? (
              <p className="list-empty-message">No scholarships found.</p>
            ) : (
              currentScholarships.map((scholarship) => (
                <PosterCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  basePath="/scholarships/cambodia"
                  showMatchScore={hasRecommendationScores}
                />
              ))
            )}
          </div>

          {!loading && totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)}>←</button>}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                  return <button key={pageNumber} className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>;
                } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return <span key={pageNumber} className="page-dots">...</span>;
                }
                return null;
              })}
              {currentPage < totalPages && <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)}>→</button>}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}