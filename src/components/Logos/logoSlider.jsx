import React, { useRef, useState } from 'react';
import './logoSlider.css';
const logos = [
  'public/logo1.avif',
  'public/logo2.avif',
  'public/logo4.avif',
  'public/logo3.avif',
  'public/logo5.avif',
  'public/logo6.avif',
  'public/logo2.avif',
  'public/logo1.avif',
];
const VISIBLE_COUNT = 4;
const LogoSlider = () => {
  const [selected, setSelected] = useState(null);

  const [start, setStart] = useState(0);

  const prevSlide = () => {
    setStart(prev => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setStart(prev => Math.min(prev + 1, logos.length - VISIBLE_COUNT));
  };

  return (
    <div className="multi-slider-container">
      <button
        className="arrow left-arrow"
        onClick={prevSlide}
        disabled={start === 0}
      >
        &#8592;
      </button>
      <div className="slider-images">
        {logos.slice(start, start + VISIBLE_COUNT).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${start + idx}`}
            className="slider-image"
          />
        ))}
      </div>
      <button
        className="arrow right-arrow"
        onClick={nextSlide}
        disabled={start >= logos.length - VISIBLE_COUNT}
      >
        &#8594;
      </button>
    </div>
  );
};

export default LogoSlider;
