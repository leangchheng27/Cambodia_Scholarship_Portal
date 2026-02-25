import { Link } from 'react-router-dom';
import Header from '../layouts/Header/header.jsx';
import p1 from "../assets/banner/p1.png";
import p2 from "../assets/banner/p2.jpg";
import p3 from "../assets/banner/p3.png";
import p4 from "../assets/banner/p4.png";
import p5 from "../assets/banner/p5.png";
import Slider from '../components/slider/components/slider/Slider.jsx';

export default function HomePage() {
    return (
      <>
        <Header/>
        <Slider />
      </>
    );
}
