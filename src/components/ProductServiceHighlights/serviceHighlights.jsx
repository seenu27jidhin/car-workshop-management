import React from 'react';

const highlights = [
  { icon: '🚚', text: 'Free Shipping' },
  { icon: '⏱️', text: '7 Days Easy Return' },
  { icon: '💬', text: '24/7 Friendly Support' },
  { icon: '🔒', text: 'Payment Secure' },
];

const ServiceHighlights = () => (
  <div className="service-highlights">
    {highlights.map((h, i) => (
      <div className="highlight" key={i}>
        <span>{h.icon}</span>
        <p>{h.text}</p>
      </div>
    ))}
  </div>
);

export default ServiceHighlights;
