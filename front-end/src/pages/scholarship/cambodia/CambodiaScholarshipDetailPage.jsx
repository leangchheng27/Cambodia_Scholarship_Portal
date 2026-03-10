import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/Header/header.jsx";
import Footer from "../../../layouts/Footer/footer.jsx";
import HeroBanner from "../../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../../components/ui/TabbedSection/TabbedSection.jsx";
import { cambodiaScholarships } from "../../../data/cambodiaScholarships.js";
import "./CambodiaScholarshipDetailPage.css";
import banner1 from "../../../assets/banner/p1.png";
import banner2 from "../../../assets/banner/p2.jpg";
import banner3 from "../../../assets/banner/p3.png";
import banner4 from "../../../assets/banner/p4.png";
import banner5 from "../../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

const tabs = ["Overview", "Eligibility", "Applicable Programs", "Benefits"];

const renderBenefits = (benefits) => {
  if (!benefits || benefits.length === 0) return <p>Information coming soon.</p>;
  return (
    <ul>
      {benefits.map((benefit, index) => {
        if (typeof benefit === 'string') {
          return <li key={index}>{benefit}</li>;
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
};

const renderOverview = (details) => {
  return (
    <div className="sdet-content">
      {details.fundedBy && (
        <>
          <h3>Funded By</h3>
          <p>{details.fundedBy}</p>
        </>
      )}
      {details.fieldsOfStudy && (
        <>
          <h3>Fields of Study</h3>
          <p>{details.fieldsOfStudy}</p>
        </>
      )}
      {details.courseDuration && (
        <>
          <h3>Course Duration</h3>
          <p>{details.courseDuration}</p>
        </>
      )}
      {details.deadlines && details.deadlines.length > 0 && (
        <>
          <h3>Application Deadlines</h3>
          <ul>
            {details.deadlines.map((dl, i) => (
              <li key={i}><strong>{dl.institute}:</strong> {dl.date}</li>
            ))}
          </ul>
        </>
      )}
      {details.registrationLinks && (
        <>
          <h3>Registration</h3>
          {details.registrationLinks.website && <p><strong>Website:</strong> {details.registrationLinks.website}</p>}
          {details.registrationLinks.telegram && <p><strong>Telegram:</strong> {details.registrationLinks.telegram}</p>}
        </>
      )}
      {details.overseasInfo && (
        <>
          <h3>Overseas Information</h3>
          {details.overseasInfo.telegram && <p><strong>Telegram:</strong> {details.overseasInfo.telegram}</p>}
          {details.overseasInfo.facebook && <p><strong>Facebook:</strong> {details.overseasInfo.facebook}</p>}
        </>
      )}
    </div>
  );
};

const renderEligibility = (eligibility) => {
  if (!eligibility || eligibility.length === 0) return <p>Information coming soon.</p>;
  return (
    <ul>
      {eligibility.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
};

const renderPrograms = (programs) => {
  if (!programs || programs.length === 0) return <p>Information coming soon.</p>;
  return (
    <ul>
      {programs.map((program, index) => <li key={index}>{program}</li>)}
    </ul>
  );
};

const CambodiaScholarshipDetailPage = () => {
  const { id } = useParams();
  const scholarshipData = cambodiaScholarships.find((s) => s.id === parseInt(id));
  
  if (!scholarshipData) return <div>Scholarship not found</div>;
  
  const details = scholarshipData.details || {};

  const content = {
    "Overview": <div className="sdet-content">{renderOverview(details)}</div>,
    "Eligibility": <div className="sdet-content">{renderEligibility(details.eligibility)}</div>,
    "Applicable Programs": <div className="sdet-content">{renderPrograms(details.programs)}</div>,
    "Benefits": <div className="sdet-content">{renderBenefits(details.benefits)}</div>,
  };

  return (
    <div>
      <Header />
      <div className="sdet-hero">
        <HeroBanner slides={bannerSlides} />
        <div className="sdet-hero-overlay">
          <p className="sdet-hero-title">{details.title}</p>
          {details.subtitle && <p className="sdet-hero-subtitle">{details.subtitle}</p>}
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default CambodiaScholarshipDetailPage;
