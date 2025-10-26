import React from 'react';

const Banner = () => (
  <div className="banner">
    <div className="banner-main">
      <img src="../../public/image14.avif" />
      <h2>
        Exciting Bundle
        <br />
        Get 30% Off
      </h2>
      <button>Shop Now</button>
    </div>
    <div className="banner-side">
      <div className="banner-offer">Magic Sale 30% Off</div>
      <div className="banner-offer">Interior Auto Redesign</div>
      <div className="banner-offer">Ferrari Brand Auto Parts</div>
    </div>
    <div className="search-bar">
      <input placeholder="Select Category" />
      <input placeholder="Select Brand" />
      <input placeholder="Select Model" />
      <button>Search</button>
    </div>
  </div>
);

export default Banner;
