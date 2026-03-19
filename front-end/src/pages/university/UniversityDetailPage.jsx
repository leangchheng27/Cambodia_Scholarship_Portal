import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header/header.jsx";
import Footer from "../../layouts/Footer/footer.jsx";
import HeroBanner from "../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../components/ui/TabbedSection/TabbedSection.jsx";
import { getUniversityById } from "../../api/universityApi.js";
import LoadingText from "../../components/ui/LoadingText/LoadingText.jsx";
import "./UniversityDetailPage.css";
import banner1 from "../../assets/banner/p1.png";
import banner2 from "../../assets/banner/p2.jpg";
import banner3 from "../../assets/banner/p3.png";
import banner4 from "../../assets/banner/p4.png";
import banner5 from "../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

const buildBannerSlides = (item) => {
  if (!item) {
    return bannerSlides;
  }

  const slides = [item.poster_image_url, item.slider_image_url, item.image]
    .filter((value, index, array) => typeof value === 'string' && value.trim() && array.indexOf(value) === index);

  return slides.length > 0 ? slides : bannerSlides;
};

const tabs = ["General Information", "Majors", "Application Guide", "Tuition Fees", "Campus", "Others", "Original Link"];

const renderLines = (lines) => {
  if (!lines || lines.length === 0) return <p>Information coming soon.</p>;
  const result = [];
  let bulletGroup = [];
  lines.forEach((line, i) => {
    if (line.startsWith("• ")) {
      bulletGroup.push(line.slice(2));
    } else {
      if (bulletGroup.length > 0) {
        result.push(<ul key={`ul-${i}`}>{bulletGroup.map((b, j) => <li key={j}>{b}</li>)}</ul>);
        bulletGroup = [];
      }
      result.push(<p key={i}>{line}</p>);
    }
  });
  if (bulletGroup.length > 0) {
    result.push(<ul key="ul-end">{bulletGroup.map((b, j) => <li key={j}>{b}</li>)}</ul>);
  }
  return result;
};

const renderOriginalLink = (university) => {
  const originalLink = university.original_link || university.website;

  if (!originalLink) return <p>Information coming soon.</p>;

  return (
    <p>
      <a href={originalLink} target="_blank" rel="noopener noreferrer">{originalLink}</a>
    </p>
  );
};

const UniversityDetailPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderStatePage = (message, type = 'loading') => (
    <div className="university-detail-page">
      <Header />
      <div className="udet-hero">
        <HeroBanner slides={bannerSlides} />
        <div className="udet-hero-overlay">
          <p className="udet-hero-name-en">University Details</p>
        </div>
      </div>
      <div className="udet-state-container">
        <div className={`udet-state-message ${type}`}>{message}</div>
      </div>
      <Footer />
    </div>
  );

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const data = await getUniversityById(id);
        setUniversity(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching university:', err);
        setError('Failed to load university details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUniversity();
    }
  }, [id]);

  if (loading) return renderStatePage(<LoadingText text="Loading university details..." />, 'loading');
  if (error) return renderStatePage(error, 'error');
  if (!university) return renderStatePage('University not found', 'error');
  const detailBannerSlides = buildBannerSlides(university);

  // Format majors
  const majorsContent = university.UniversityMajors && university.UniversityMajors.length > 0
    ? university.UniversityMajors.map(major => `${major.name}${major.degree_level ? ` (${major.degree_level})` : major.specialization ? ` - ${major.specialization}` : ''}`)
    : ["Information coming soon."];

  // Format application guide
  const appGuideContent = university.UniversityApplicationGuideSteps && university.UniversityApplicationGuideSteps.length > 0
    ? university.UniversityApplicationGuideSteps
        .sort((a, b) => a.step_number - b.step_number)
        .map(step => `Step ${step.step_number}: ${step.title || ''}\n${step.description || ''}`)
    : ["Information coming soon."];

  // Format tuition fees
  const tuitionContent = university.UniversityTuitionFees && university.UniversityTuitionFees.length > 0
    ? university.UniversityTuitionFees.map(fee => `${fee.student_type || 'Tuition'}: ${fee.amount ? `$${fee.amount}` : 'N/A'}${fee.note ? ` - ${fee.note}` : ''}`)
    : ["Information coming soon."];

  // Format campus
  const campusContent = university.UniversityCampuses && university.UniversityCampuses.length > 0
    ? university.UniversityCampuses.map(campus => `${campus.name || 'Campus'}${campus.description ? ` - ${campus.description}` : ''}`)
    : ["Information coming soon."];

  // Format news/achievements for others section
  const othersContent = university.UniversityNews && university.UniversityNews.length > 0
    ? university.UniversityNews.map(news => news.title || "News")
    : ["Information coming soon."];

  const det = {
    generalInfo: [university.description || "Information coming soon."],
    majors: majorsContent,
    applicationGuide: appGuideContent,
    tuitionFees: tuitionContent,
    campus: campusContent,
    others: othersContent,
  };

  const content = {
    "General Information": <div className="udet-content">{renderLines(det.generalInfo)}</div>,
    "Majors": <div className="udet-content">{renderLines(det.majors)}</div>,
    "Application Guide": <div className="udet-content">{renderLines(det.applicationGuide)}</div>,
    "Tuition Fees": <div className="udet-content">{renderLines(det.tuitionFees)}</div>,
    "Campus": <div className="udet-content">{renderLines(det.campus)}</div>,
    "Others": <div className="udet-content">{renderLines(det.others)}</div>,
    "Original Link": <div className="udet-content">{renderOriginalLink(university)}</div>,
  };

  return (
    <div className="university-detail-page">
      <Header />
      <div className="udet-hero">
        <HeroBanner slides={detailBannerSlides} />
        <div className="udet-hero-overlay">
          <p className="udet-hero-name-en">{university.name}</p>
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default UniversityDetailPage;
