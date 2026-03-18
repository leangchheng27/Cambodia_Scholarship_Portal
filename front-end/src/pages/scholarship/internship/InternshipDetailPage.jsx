import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/Header/header.jsx";
import Footer from "../../../layouts/Footer/footer.jsx";
import HeroBanner from "../../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../../components/ui/TabbedSection/TabbedSection.jsx";
import LoadingText from "../../../components/ui/LoadingText/LoadingText.jsx";
import API from "../../../services/api.js";
import "./InternshipDetailPage.css";
import banner1 from "../../../assets/banner/p1.png";
import banner2 from "../../../assets/banner/p2.jpg";
import banner3 from "../../../assets/banner/p3.png";
import banner4 from "../../../assets/banner/p4.png";
import banner5 from "../../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

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

const renderOverview = (internship) => {
  return (
    <div className="sdet-content">
      {internship.description && (
        <>
          <h3>Description</h3>
          <p>{internship.description}</p>
        </>
      )}
      {internship.company && (
        <>
          <h3>Company</h3>
          <p>{internship.company}</p>
        </>
      )}
      {internship.duration && (
        <>
          <h3>Duration</h3>
          <p>{internship.duration}</p>
        </>
      )}
    </div>
  );
};

const renderOriginalLink = (internship) => {
  const originalLink = internship.original_link || internship.registration_link;

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

const InternshipDetailPage = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/internships/${id}`);
        setInternship(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching internship:', err);
        setError('Failed to load internship details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternship();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="internship-detail-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content"><LoadingText text="Loading internship details..." /></div>
        <Footer />
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="internship-detail-page">
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content"><p>{error || 'Internship not found'}</p></div>
        <Footer />
      </div>
    );
  }

  const content = {
    "Overview": <div className="sdet-content">{renderOverview(internship)}</div>,
    "Eligibility": <div className="sdet-content">{renderEligibility(internship.InternshipEligibilities || [])}</div>,
    "Applicable Programs": <div className="sdet-content">{renderPrograms(internship.InternshipFieldOfStudies || [])}</div>,
    "Benefits": <div className="sdet-content">{renderBenefits(internship.InternshipBenefits || [])}</div>,
    "Original Link": <div className="sdet-content">{renderOriginalLink(internship)}</div>,
  };

  return (
    <div className="internship-detail-page">
      <Header />
      <div className="sdet-hero">
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-hero-overlay">
          <p className="sdet-hero-title">{internship.name}</p>
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default InternshipDetailPage;
