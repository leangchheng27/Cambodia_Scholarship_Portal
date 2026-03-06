import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import ScholarshipTabs from '../../../features/scholarship/Layout/ScholarshipTabs.jsx';
import DetailBanner from '../../../features/scholarship/components/DetailBanner/DetailBanner.jsx';
import ScholarshipDetailHeader from '../../../features/scholarship/components/ScholarshipDetailHeader/ScholarshipDetailHeader.jsx';
import EligibilityContent from '../../../features/scholarship/components/EligibilityContent/EligibilityContent.jsx';
import RelatedScholarships from '../../../features/scholarship/components/RelatedScholarships/RelatedScholarships.jsx';
import { cambodiaScholarships } from '../../../data/cambodiaScholarships.js';

export default function CambodiaEligibilityPage() {
  const { id } = useParams();

  const scholarshipData = cambodiaScholarships.find(s => s.id === parseInt(id));
  if (!scholarshipData) return <div>Scholarship not found</div>;
  
  const scholarship = scholarshipData.details;

  return (
    <>
      <Header />
      <DetailBanner image={scholarshipData.image} alt={scholarship.title} />
      <ScholarshipTabs id={id} basePath="/scholarships/cambodia" activePage="eligibility">
        <ScholarshipDetailHeader title={scholarship.title} subtitle={scholarship.subtitle} />
        <EligibilityContent eligibility={scholarship.eligibility} />
      </ScholarshipTabs>
      <RelatedScholarships items={cambodiaScholarships} basePath="/scholarships/cambodia" />
      <Footer />
    </>
  );
}
