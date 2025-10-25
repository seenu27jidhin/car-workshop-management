import React, { useState } from 'react';
import './service.css';

const services = [
  'Quality of an existing',
  'Agency best services',
  'Dedicate product best',
  'Team can help achieve',
  'Your business goals',
];

const highlights = [
  'General service for the car repair',
  'How long do repairs take on a car',
  'Engine cooling this maintenance',
];

const stats = [
  { icon: '🛠️', label: 'Of Experience', value: '25+' },
  { icon: '🚗', label: 'Service Car', value: '256k' },
  { icon: '🔧', label: 'Vehicles repairs', value: '385k' },
  { icon: '👨‍🔧', label: 'Team Support', value: '258k' },
  { icon: '🏆', label: 'Winning Awards', value: '258k' },
];
const ServiceDetails = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="service-details-bg">
      <div className="service-details-header">
        <div className="service-header">
          <h1>Service Details</h1>
          <div className="breadcrumb">
            Home / <span>Service Details Page</span>
          </div>
        </div>
        {/* <div className="header-imgs"> */}
        <img src="public/image15.avif" alt="mechanic2" />
        {/* </div> */}
      </div>
      <div className="service-details-main">
        <div className="service-details-content">
          <img className="main-img" src="public/image10.avif" alt="main" />
          <div className="service-details-text">
            <h3>Service Details:</h3>
            <p>
              Begin give handcrafted options as you know what it is the
              communicate with your family service a safety award, double you
              must use hand motion to enter your methods stories written in
              element? So that sell shatter expectations? Moving to the other
              side of silence. The other side to their side of kindness. It is a
              little paragraph, a destination, a different perspective. It is a
              little paragraph, a destination, a different perspective. It is a
              little paragraph, a destination, a different perspective.
            </p>
            <ul className="highlights-list">
              {highlights.map((h, i) => (
                <li key={i}>
                  <span className="dot"></span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="service-details-row">
              <div>
                <b>General service for the car repair</b>
                <p>General service for the car repair</p>
              </div>
              <div>
                <b>General service for the car repair</b>
                <img
                  src="https://img.freepik.com/free-photo/auto-mechanic-checking-car-engine-oil_1303-17515.jpg?w=100"
                  alt="side"
                />
              </div>
              <div>
                <b>Engine cooling this maintenance</b>
                <p>Engine cooling this maintenance</p>
              </div>
            </div>
            <p>
              We give you handcrafted options as you know what it is the
              communicate with your family service a safety award, double you
              must use hand motion to enter your methods stories written in
              element? So that sell shatter expectations? Moving to the other
              side of everything. It’s the other side of silence. The other side
              to their side of kindness. It is a little paragraph, a
              destination, a different perspective. It is a little paragraph, a
              destination, a different perspective. It is a little paragraph, a
              destination, a different perspective.
            </p>
          </div>
        </div>
        <div className="service-details-sidebar">
          <h4>All Services:</h4>
          <ul>
            {services.map((s, i) => (
              <li
                key={i}
                className={selected === i ? 'active' : ''}
                onClick={() => setSelected(i)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="service-details-stats">
        {stats.map((stat, i) => (
          <div className="stat" key={i}>
            <div className="stat-icon">{stat.icon}</div>

            <div className="stat-div">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceDetails;
