import React, { useState } from 'react';
import { useRef } from 'react';
// const images = [
//   'https://i.imgur.com/v8u1n1J.png', // Front
//   'https://i.imgur.com/R3822tA.png', // Slight right 1
//   'https://i.imgur.com/x4aAZnO.png', // Slight right 2
//   'https://i.imgur.com/m2gD1b3.png', // Side
//   'https://i.imgur.com/yO8za9T.png', // Back-side
//   'https://i.imgur.com/h5Jc4X8.png', // Back
//   'https://i.imgur.com/FGb0GBC.png', // Back-side (flipped)
//   'https://i.imgur.com/4qJgLgD.png', // Side (flipped)
//   'https://i.imgur.com/hVv3TjR.png', // Slight left 2
//   'https://i.imgur.com/mHzaJb1.png', // Slight left 1
// ];

const ProductImageViewer = ({ images }) => {
  //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = e => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const handleMouseEnter = () => setZoom(true);
  const handleMouseLeave = () => setZoom(false);

  return (
    <div className="product-image-viewer">
      <div className="rotator-wrapper">
        <div
          className="zoom-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images}
            alt="Zoomable"
            className="zoom-image"
            style={{
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transform: zoom ? 'scale(2)' : 'scale(1)',
              transition: zoom ? 'transform 0.1s' : 'transform 0.3s',
            }}
            draggable="false"
          />
          {/* <div className="rotator-instructions">
            Move your mouse left and right over the image
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductImageViewer;
