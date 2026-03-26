import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/Header/header.jsx";
import Footer from "../../../layouts/Footer/footer.jsx";
import HeroBanner from "../../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../../components/ui/TabbedSection/TabbedSection.jsx";
import { getScholarshipById } from "../../../api/scholarshipApi.js";
import { recordFeedback } from "../../../api/feedbackApi.js";
import LoadingText from "../../../components/ui/LoadingText/LoadingText.jsx";
import "./AbroadScholarshipDetailPage.css";
import banner1 from "../../../assets/banner/p1.png";
import banner2 from "../../../assets/banner/p2.jpg";
import banner3 from "../../../assets/banner/p3.png";
import banner4 from "../../../assets/banner/p4.png";
import banner5 from "../../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];
const buildBannerSlides = (item) => {
  if (!item) {
    return bannerSlides;
  }

  const slides = [item.poster_image_url, item.slider_image_url, item.image]
    .filter((value, index, array) => typeof value === 'string' && value.trim() && array.indexOf(value) === index);

  return slides.length > 0 ? slides : bannerSlides;
};
const SCHOLARSHIP_CACHE_TTL_MS = 30 * 1000;
const scholarshipCache = new Map();

const tabs = ["Overview", "Eligibility", "Applicable Programs", "Benefits", "Original Link"];

const renderBenefits = (benefits) => {
  if (!benefits || (Array.isArray(benefits) && benefits.length === 0)) return <p>Information coming soon.</p>;
  
  if (Array.isArray(benefits)) {
    return (
      <ul>
        {benefits.map((benefit, index) => {
          if (typeof benefit === 'string') {
            return <li key={index}>{benefit}</li>;
          } else if (benefit.benefit) {
            return <li key={index}>{benefit.benefit}</li>;
          } else if (benefit.title && benefit.items) {
            return (
              <li key={index}>
                {benefit.title}
                <ul>
                  {benefit.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  }
  return <p>Information coming soon.</p>;
};

const normalizeToList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,|;|\u2022/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
};

const renderOverview = (scholarship) => {
  return (
    <div className="sdet-content">
      {scholarship.description && (
        <>
          <h3>Description</h3>
          <p>{scholarship.description}</p>
        </>
      )}
      {scholarship.funded_by && (
        <>
          <h3>Funded By</h3>
          <p>{scholarship.funded_by}</p>
        </>
      )}
      {scholarship.course_duration && (
        <>
          <h3>Course Duration</h3>
          <p>{scholarship.course_duration}</p>
        </>
      )}
    </div>
  );
};

const renderOriginalLink = (scholarship) => {
  const originalLink = scholarship.original_link || scholarship.registration_link;

  if (!originalLink) return <p>Information coming soon.</p>;

  return (
    <p>
      <a href={originalLink} target="_blank" rel="noopener noreferrer">{originalLink}</a>
    </p>
  );
};

const renderEligibility = (eligibilities) => {
  if (!eligibilities || eligibilities.length === 0) return <p>Information coming soon.</p>;
  return (
    <ul>
      {eligibilities.map((item, index) => {
        const text = item.eligibility || item;
        return <li key={index}>{text}</li>;
      })}
    </ul>
  );
};

const renderPrograms = (fieldOfStudies) => {
  if (!fieldOfStudies || fieldOfStudies.length === 0) return <p>Information coming soon.</p>;
  return (
    <ul>
      {fieldOfStudies.map((field, index) => {
        const text = field.field_name || field;
        return <li key={index}>{text}</li>;
      })}
    </ul>
  );
};

const getEligibilityData = (scholarship) => {
  if (Array.isArray(scholarship.ScholarshipEligibilities) && scholarship.ScholarshipEligibilities.length > 0) {
    return scholarship.ScholarshipEligibilities;
  }

  const fallback = [
    ...(normalizeToList(scholarship.details?.eligibility)),
    ...(normalizeToList(scholarship.details?.eligibilities)),
    ...(normalizeToList(scholarship.ai_metadata?.requiredSubjects)),
  ];

  return fallback;
};

const getProgramsData = (scholarship) => {
  if (Array.isArray(scholarship.ScholarshipFieldOfStudies) && scholarship.ScholarshipFieldOfStudies.length > 0) {
    return scholarship.ScholarshipFieldOfStudies;
  }

  const fallback = [
    ...(normalizeToList(scholarship.details?.programs)),
    ...(normalizeToList(scholarship.details?.fieldsOfStudy)),
    ...(normalizeToList(scholarship.ai_metadata?.fieldCategories)),
  ];

  return fallback;
};

const getBenefitsData = (scholarship) => {
  if (Array.isArray(scholarship.ScholarshipBenefits) && scholarship.ScholarshipBenefits.length > 0) {
    return scholarship.ScholarshipBenefits;
  }

  return normalizeToList(scholarship.details?.benefits);
};

const AbroadScholarshipDetailPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const cached = scholarshipCache.get(id);
        const now = Date.now();

        if (cached && now - cached.timestamp < SCHOLARSHIP_CACHE_TTL_MS) {
          setScholarship(cached.data);
          setError(null);
          return;
        }

        const data = await getScholarshipById(id);
        scholarshipCache.set(id, { data, timestamp: now });
        setScholarship(data);
        setError(null);
        recordFeedback({
          scholarshipId: id,
          scholarshipType: 'scholarship-abroad',
          action: 'view',
          scholarshipSnapshot: { title: data.name, description: data.description },
        });
      } catch (err) {
        console.error('Error fetching scholarship:', err);
        setError('Failed to load scholarship details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchScholarship();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="abroad-scholarship-detail-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content sdet-loading"><LoadingText text="Loading scholarship details..." /></div>
        <Footer />
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="abroad-scholarship-detail-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content sdet-loading"><p>{error || 'Scholarship not found'}</p></div>
        <Footer />
      </div>
    );
  }

  const content = {
    "Overview": <div className="sdet-content">{renderOverview(scholarship)}</div>,
    "Eligibility": <div className="sdet-content">{renderEligibility(getEligibilityData(scholarship))}</div>,
    "Applicable Programs": <div className="sdet-content">{renderPrograms(getProgramsData(scholarship))}</div>,
    "Benefits": <div className="sdet-content">{renderBenefits(getBenefitsData(scholarship))}</div>,
    "Original Link": <div className="sdet-content">{renderOriginalLink(scholarship)}</div>,
  };
  const detailBannerSlides = buildBannerSlides(scholarship);

  return (
    <div className="abroad-scholarship-detail-page">
      <Header />
      <div className="sdet-hero">
        <HeroBanner slides={detailBannerSlides} />
        <div className="sdet-hero-overlay">
          <p className="sdet-hero-title">{scholarship.name}</p>
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default AbroadScholarshipDetailPage;
