import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/Header/header.jsx";
import Footer from "../../../layouts/Footer/footer.jsx";
import HeroBanner from "../../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../../components/ui/TabbedSection/TabbedSection.jsx";
import API from "../../../services/api.js";
import "./CambodiaScholarshipDetailPage.css";
import banner1 from "../../../assets/banner/p1.png";
import banner2 from "../../../assets/banner/p2.jpg";
import banner3 from "../../../assets/banner/p3.png";
import banner4 from "../../../assets/banner/p4.png";
import banner5 from "../../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

const tabs = ["Overview", "Eligibility", "Applicable Programs", "Benefits"];

const renderBenefits = (benefits) => {
  if (!benefits || (Array.isArray(benefits) && benefits.length === 0)) return <p>Information coming soon.</p>;
  
  if (Array.isArray(benefits)) {
    // Handle array of objects with title and items
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
      {scholarship.registration_link && (
        <>
          <h3>Registration</h3>
          <p><a href={scholarship.registration_link} target="_blank" rel="noopener noreferrer">{scholarship.registration_link}</a></p>
        </>
      )}
    </div>
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

const CambodiaScholarshipDetailPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/scholarships/${id}`);
        setScholarship(response.data);
        setError(null);
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
      <div>
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content"><p>Loading scholarship details...</p></div>
        <Footer />
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div>
        <Header />
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-content"><p>{error || 'Scholarship not found'}</p></div>
        <Footer />
      </div>
    );
  }

  const content = {
    "Overview": <div className="sdet-content">{renderOverview(scholarship)}</div>,
    "Eligibility": <div className="sdet-content">{renderEligibility(scholarship.ScholarshipEligibilities || [])}</div>,
    "Applicable Programs": <div className="sdet-content">{renderPrograms(scholarship.ScholarshipFieldOfStudies || [])}</div>,
    "Benefits": <div className="sdet-content">{renderBenefits(scholarship.ScholarshipBenefits || [])}</div>,
  };

  return (
    <div>
      <Header />
      <div className="sdet-hero">
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-hero-overlay">
          <p className="sdet-hero-title">{scholarship.name}</p>
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default CambodiaScholarshipDetailPage;
