import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../layouts/Header/header.jsx';
import Footer from '../../../layouts/Footer/footer.jsx';
import ScholarshipTabs from '../../../features/scholarship/Layout/ScholarshipTabs.jsx';
import DetailBanner from '../../../features/scholarship/components/DetailBanner/DetailBanner.jsx';
import ScholarshipDetailHeader from '../../../features/scholarship/components/ScholarshipDetailHeader/ScholarshipDetailHeader.jsx';
import OverviewContent from '../../../features/scholarship/components/OverviewContent/OverviewContent.jsx';
import RelatedScholarships from '../../../features/scholarship/components/RelatedScholarships/RelatedScholarships.jsx';
import { internshipScholarships } from '../../../data/internshipScholarships.js';

export default function InternshipOverviewPage() {
  const { id } = useParams();

  // Get scholarship from data
  const scholarshipData = internshipScholarships.find(s => s.id === parseInt(id));
  if (!scholarshipData) return <div>Internship not found</div>;
  
  const scholarship = scholarshipData.details;

  return (
    <>
      <Header />
      <DetailBanner image={scholarshipData.image} alt={scholarship.title} />
      <ScholarshipTabs id={id} basePath="/scholarships/internship" activePage="overview">
        <ScholarshipDetailHeader title={scholarship.title} subtitle={scholarship.subtitle} />
        <OverviewContent scholarship={scholarship} />
      </ScholarshipTabs>
      <RelatedScholarships items={internshipScholarships} basePath="/scholarships/internship" title="Internship You might like" />
      <Footer />
    </>
  );
}
