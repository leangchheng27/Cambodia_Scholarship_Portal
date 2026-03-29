import React, { useState, useEffect } from 'react';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import HeroBanner from '../../../features/home/components/HeroBanner/HeroBanner.jsx';
import PosterCard from '../../../components/PosterCard/PosterCard.jsx';
import { getInternships } from '../../../api/internshipApi.js';
import { getCustomModelRecommendations, getScholarshipsByMajorFields } from '../../../api/recommendationApi.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import LoadingText from '../../../components/ui/LoadingText/LoadingText.jsx';
import './InternshipPage.css';
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

export default function InternshipPage() {
  const { user, profile } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [allInternships, setAllInternships] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [viewMode, setViewMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationsAvailable, setRecommendationsAvailable] = useState(false);
  const [search, setSearch] = useState('');
  const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const data = await getInternships(search);
        setAllInternships(data);
        setError(null);

        // Check if user has profile
        const effectiveProfile = { ...(user || {}), ...(profile || {}) };
        const studentType = effectiveProfile.studentType || effectiveProfile.academicType;

        // Case 1: University students with field of study
        if (studentType === 'college' && effectiveProfile.universityField) {
          console.log(`🎓 University student with field: ${effectiveProfile.universityField}`);
          
          // Match internships by field of study - use InternshipFieldOfStudy plural
          const fieldMatches = data.filter(internship => {
            const fields = internship.InternshipFieldOfStudies || internship.InternshipFieldOfStudy || [];
            return fields.some(f => f.field_name === effectiveProfile.universityField);
          });
          
          setRecommendedInternships(fieldMatches);
          setRecommendationsAvailable(fieldMatches.length > 0);
          if (fieldMatches.length > 0) {
            setViewMode('recommended');
          }
          console.log(`✅ Found ${fieldMatches.length} internships matching ${effectiveProfile.universityField}`);
        }
        // Case 2: High school students with grades
        else if ((studentType === 'science' || studentType === 'society') && effectiveProfile.grades) {
          console.log(`📚 High school student (${studentType}), getting AI recommendations...`);
          
          const gpa = calculateGPA(effectiveProfile.grades);
          if (gpa > 0) {
            const recommendationResult = await getCustomModelRecommendations({
              stream: studentType,
              grades: effectiveProfile.grades,
              gpa: gpa,
              strongSubjects: Object.keys(effectiveProfile.grades).filter(
                subject => effectiveProfile.grades[subject] === 'A' || effectiveProfile.grades[subject] === 'B'
              )
            });

            if (recommendationResult.success && recommendationResult.data) {
              const recommendations = recommendationResult.data;
              const top5 = recommendations
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);

              if (top5.length > 0) {
                const majorTitles = top5.map(major => major.title);
                const internshipsResult = await getScholarshipsByMajorFields(majorTitles);
                
                if (internshipsResult.success && internshipsResult.scholarships) {
                  setRecommendedInternships(internshipsResult.scholarships);
                  setRecommendationsAvailable(internshipsResult.scholarships.length > 0);
                  if (internshipsResult.scholarships.length > 0) {
                    setViewMode('recommended');
                  }
                  console.log(`✅ Found ${internshipsResult.scholarships.length} recommended internships`);
                }
              }
            }
          }
        }
        // No profile or incomplete profile
        else {
          setRecommendedInternships([]);
          setRecommendationsAvailable(false);
        }
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Failed to load internships');
        setRecommendedInternships([]);
        setRecommendationsAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => fetchInternships(), 300);
    return () => clearTimeout(debounceTimer);
  }, [user, profile, search]);

  const displayedInternships = viewMode === 'recommended' && recommendationsAvailable
    ? recommendedInternships : allInternships;
  const hasRecommendationScores = viewMode === 'recommended' && recommendationsAvailable;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(displayedInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInternships = displayedInternships.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="internship-list-page">
      <Header />
      <div className="resource-hero-banner-wrap">
        <HeroBanner slides={bannerSlides} />
        <div className="resource-hero-banner-overlay">
          <div className="resource-shell">
            <section className="resource-hero resource-hero-on-banner">
              <h1 className="resource-hero-title">Internship opportunities presented like a premium SaaS catalog.</h1>
              <p className="resource-hero-description">
                Move from poster browsing to deep opportunity details with a faster, cleaner decision flow built for students and career starters.
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
          <h2 className="resource-section-title">Built around your real internship flow</h2>
          <p className="resource-section-description">This page stays aligned with your current app behavior: browse posters, open details, and review key information quickly.</p>
          <div className="resource-feature-grid">
            <article className="resource-feature-card">
              <h3>Poster-first browsing</h3>
              <p>Scan internship posters in a clean grid, then open the full detail page for the opportunity you want.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Structured detail tabs</h3>
              <p>Review Overview, Eligibility, Applicable Programs, Benefits, and Original Link in one organized detail layout.</p>
            </article>
            <article className="resource-feature-card">
              <h3>Simple page navigation</h3>
              <p>Use pagination to move through internships and keep the browsing experience fast when listings grow.</p>
            </article>
          </div>
        </section>

        <div id="resource-posters" className="scholarship-list-container resource-posters">
          <SearchInput
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search internships by name..."
          />

          <div className="list-mode-toggle" role="group" aria-label="Internship list mode">
            <button type="button" className={`list-mode-btn ${viewMode === 'all' ? 'active' : ''}`} onClick={() => handleViewModeChange('all')}>
              All Data ({allInternships.length})
            </button>
            <button type="button" className={`list-mode-btn ${viewMode === 'recommended' ? 'active' : ''}`} onClick={() => handleViewModeChange('recommended')} disabled={!recommendationsAvailable}>
              Recommended ({recommendedInternships.length})
            </button>
          </div>

          {!recommendationsAvailable && (
            <p className="list-mode-hint">Complete your profile to see internship recommendations matched to your interests and field of study.</p>
          )}

          <div className="scholarship-grid">
            {loading ? (
              <LoadingText text="Loading internships..." />
            ) : error ? (
              <p className="error">{error}</p>
            ) : currentInternships.length === 0 ? (
              <p className="list-empty-message">No internships found.</p>
            ) : (
              currentInternships.map((internship) => (
                <PosterCard
                  key={internship.id}
                  scholarship={internship}
                  basePath="/scholarships/internship"
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