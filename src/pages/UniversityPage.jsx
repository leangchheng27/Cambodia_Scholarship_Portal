import Header from '../layouts/Header/header.jsx';
import p2 from '../assets/p2.jpg';
import CambodiaMap from '../features/university/components/CambodiaMap/Map.jsx';
import UniversityFilter from '../features/university/components/UniversityFilter/UniversityFilter.jsx';
import UniversityFilterMapLayout from '../features/university/Layout/UniversityFilterMapLayout.jsx';
import UniversityList from '../features/university/components/UniversityList/UniversityList.jsx';

export default function UniversityPage() {
    return (
      <>
        <Header/>
        <img src={p2} alt="Test" style={{ width: '100%', display: 'block', marginTop: '-100px', position: 'relative', zIndex: 1 }} />
        <UniversityFilterMapLayout>
            <UniversityFilter />
            <CambodiaMap />
        </UniversityFilterMapLayout>
        <UniversityList />
      </>
    );
}