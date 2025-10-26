import React from 'react';

const categories = [
  { name: 'Body Parts', img: '../../public/product1.jpg' },
  { name: 'Transmission', img: '../../public/product2.jpg' },
  { name: 'Lighting', img: '../../public/product3.jpg' },
  { name: 'Performance', img: '../../public/product4.jpg' },
  { name: 'Brake Parts', img: '../../public/product5.jpg' },
  { name: 'Suspensions', img: '../../public/product6.jpg' },
];

const CategoryGrid = () => (
  <div className="category-grid">
    <h3>Popular Categories</h3>
    <div className="grid">
      {categories.map((cat, i) => (
        <div className="category-card" key={i}>
          <img src={cat.img} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryGrid;
