import React, { useState } from 'react';
import Navbar from '../../layout/Header/Navbar';
import HeroBanner from '../../layout/Slide/HeroBanner';
import Footer from '../../layout/Footer/Footer';
import './universityList.css';
import cambodiaMap from '../../assets/map.png';
import { universities, getProvinces, getUniversitiesByProvince } from '../../data/universities';

const UniversityListPage = () => {
  const [selectedProvince, setSelectedProvince] = useState('Phnom Penh');

  // Get unique provinces from universities data
  const uniqueProvinces = getProvinces();

  // Define the order of provinces as shown in the design
  const provinceOrder = [
    'Phnom Penh',
    'Siem Reap',
    'Sihanoukville',
    'Battambang',
    'Kampot',
    'Kep',
    'Kandal',
    'Banteay Meanchey',
    'Kampong Cham',
    'Kampong Thom',
    'Kampong Chhnang',
    'Steung Treng',
    'Kompong Speu',
    'Pursat',
    'Oddar Meanchey',
    'Svay Rieng',
    'Koh Kong',
    'Tbong Khmum',
    'Preah Vihear',
    'Mondulkiri',
    'Ratanakiri',
    'Kratie',
    'Pailin',
    'Prey Veng',
    'Takeo'
  ];

  // Filter and sort provinces based on the defined order
  const orderedProvinces = provinceOrder.filter(province =>
    universities.some(uni => uni.province === province)
  );

  // Filter universities by selected province
  // Get filtered universities by selected province
  const filteredUniversities = getUniversitiesByProvince(selectedProvince);

  return (
    <div className="university-list-page">
      <Navbar />
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Universities Section */}
      <section className="universities-section">
        <div className="section-container">
          <h2 className="section-title">Universities in Cambodia</h2>
          
          <div className="universities-content">
            {/* Provinces and Map Row */}
            <div className="provinces-and-map-row">
              {/* Provinces Section */}
              <div className="provinces-section">
                <div className="provinces-header">Province</div>
                
                <div className="provinces-container">
                  <div className="provinces-grid">
                    {orderedProvinces.map((province, index) => (
                      <div
                        key={index}
                        className={`province-item ${selectedProvince === province ? 'active' : ''}`}
                        onClick={() => setSelectedProvince(province)}
                      >
                        <span className="province-name">{province}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="map-section">
                <div className="map-container">
                  <img src={cambodiaMap} alt="Cambodia Map" className="cambodia-map" />
                </div>
              </div>
            </div>

            {/* Schools Table Section */}
            <div className="schools-section">
              <table className="universities-table">
                <thead>
                  <tr>
                    <th>SCHOOL NAME</th>
                    <th>PROVINCE</th>
                    <th>CITY</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUniversities.map((university, index) => (
                    <tr key={index}>
                      <td>{university.schoolName}</td>
                      <td>{university.province}</td>
                      <td>{university.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UniversityListPage;
