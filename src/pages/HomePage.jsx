import { Link } from 'react-router-dom';
import Header from '../layouts/Header/header.jsx';
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import Slider from '../components/slider/components/slider/Slider.jsx';

export default function HomePage() {
    return (
      <>
        <Header/>
        <Slider />
      </>
    );
}
