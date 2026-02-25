import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);

  return (
    <div className="hero-slider">
      <div
        className="hero-slide-bg"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      >
        <div className="hero-slide-overlay" />
        <div className="hero-slide-content">
          <h1 className="hero-title">{slides[current].title}</h1>
          <div className="hero-tags">
            {slides[current].tags.map(tag => (
              <span className="hero-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <p className="hero-desc">{slides[current].desc}</p>
        </div>
        <button className="hero-arrow left" onClick={prevSlide}>&lt;</button>
        <button className="hero-arrow right" onClick={nextSlide}>&gt;</button>
        <div className="hero-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`hero-dot${idx === current ? " active" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;