import React from "react";
import Header from "../../layouts/Header/header.jsx";
import TabbedSection from "../../components/ui/TabbedSection/TabbedSection.jsx";
import p2 from "../../assets/banner/p2.jpg";

const tabs = [
  "General Information",
  "Majors",
  "Application Guide",
  "Tuition Fees",
  "Campus",
  "Others",
];

const content = {
  "General Information":
    "The Cambodia Academy of Digital Technology (CADT) is a national public research and education institution in Cambodia, dedicated to advancing digital technologies, innovation, and building a digital society.",
  Majors: "List of majors offered at CADT.",
  "Application Guide": "How to apply to CADT.",
  "Tuition Fees": "Information about tuition fees.",
  Campus: "Details about the CADT campus.",
  Others: "Other relevant information.",
};

const UniversityDetailPage = () => (
  <div>
    <Header />
    <img
      src={p2}
      alt="University Building"
      style={{
        width: "100%",
        display: "block",
        marginTop: "-100px", // Pulls the image up under the header
        position: "relative",
        zIndex: 1,
      }}
    />
    <TabbedSection tabs={tabs} content={content} />
  </div>
);

export default UniversityDetailPage;
