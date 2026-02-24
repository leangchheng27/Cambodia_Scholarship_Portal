import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import ScholarshipTabs from '../../../features/scholarship/Layout/ScholarshipTabs.jsx';
import DetailBanner from '../../../features/scholarship/components/DetailBanner/DetailBanner.jsx';
import ScholarshipDetailHeader from '../../../features/scholarship/components/ScholarshipDetailHeader/ScholarshipDetailHeader.jsx';
import BenefitsContent from '../../../features/scholarship/components/BenefitsContent/BenefitsContent.jsx';
import RelatedScholarships from '../../../features/scholarship/components/RelatedScholarships/RelatedScholarships.jsx';
import { abroadScholarships } from '../../../data/abroadScholarships.js';

export default function AbroadBenefitsPage() {
  const { id } = useParams();

  const scholarshipData = abroadScholarships.find(s => s.id === parseInt(id));
  if (!scholarshipData) return <div>Scholarship not found</div>;
  
  const scholarship = scholarshipData.details;

  return (
    <>
      <Header />
      <DetailBanner image={scholarshipData.image} alt={scholarship.title} />
      <ScholarshipTabs id={id} basePath="/scholarships/abroad" activePage="benefits">
        <ScholarshipDetailHeader title={scholarship.title} subtitle={scholarship.subtitle} />
        <BenefitsContent benefits={scholarship.benefits} />
      </ScholarshipTabs>
      <RelatedScholarships items={abroadScholarships} basePath="/scholarships/abroad" />
      <Footer />
    </>
  );
}
