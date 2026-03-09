import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header/header.jsx";
import Footer from "../../layouts/Footer/footer.jsx";
import HeroBanner from "../../features/home/components/HeroBanner/HeroBanner.jsx";
import TabbedSection from "../../components/ui/TabbedSection/TabbedSection.jsx";
import { universities } from "../../data/universities";
import "./UniversityDetailPage.css";
import banner1 from "../../assets/banner/p1.png";
import banner2 from "../../assets/banner/p2.jpg";
import banner3 from "../../assets/banner/p3.png";
import banner4 from "../../assets/banner/p4.png";
import banner5 from "../../assets/banner/p5.png";

const bannerSlides = [banner1, banner2, banner3, banner4, banner5];

const tabs = ["General Information", "Majors", "Application Guide", "Tuition Fees", "Campus", "Others"];

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

const UniversityDetailPage = () => {
  const { id } = useParams();
  const university = universities.find((u) => u.id === parseInt(id)) || universities[0];
  const det = university.details || {};

  const content = {
    "General Information": <div className="udet-content">{renderLines(det.generalInfo)}</div>,
    "Majors": <div className="udet-content">{renderLines(det.majors)}</div>,
    "Application Guide": <div className="udet-content">{renderLines(det.applicationGuide)}</div>,
    "Tuition Fees": <div className="udet-content">{renderLines(det.tuitionFees)}</div>,
    "Campus": <div className="udet-content">{renderLines(det.campus)}</div>,
    "Others": <div className="udet-content">{renderLines(det.others)}</div>,
  };

  return (
    <div>
      <Header />
      <div className="udet-hero">
        <HeroBanner slides={bannerSlides} />
        <div className="udet-hero-overlay">
          {university.nameKh && <p className="udet-hero-name-kh">{university.nameKh}</p>}
          <p className="udet-hero-name-en">{university.name}</p>
        </div>
      </div>
      <TabbedSection tabs={tabs} content={content} showSectionHeader />
      <Footer />
    </div>
  );
};

export default UniversityDetailPage;
