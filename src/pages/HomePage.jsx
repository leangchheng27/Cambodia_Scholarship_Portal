import { Link } from 'react-router-dom';
import Header from '../layouts/Header/header.jsx';
import p1 from '../assets/p1.jpg';

export default function HomePage() {
    return (
      <>
        <Header/>
        <img src={p1} alt="Test" style={{ width: '100%', display: 'block', marginTop: '-100px', position: 'relative', zIndex: 1 }} />
      </>
    );
}
