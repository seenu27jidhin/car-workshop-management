import React, { useState } from 'react';
import './productList.css';

const banners = [
  {
    title: 'ELECTRONICS',
    subtitle: 'MEGA SALE',
    price: '$450',
    button: 'Shop Now',
    bg: '#222',
    img: 'public/image13.avif',
  },
  {
    title: 'BODY PART',
    subtitle: 'FOR ANY VEHICLE',
    price: '$650',
    button: 'Shop Now',
    bg: '#111',
    img: 'public/product2.jpg',
  },
  {
    title: 'PERFORMANCE',
    subtitle: 'HIGH QUALITY',
    price: '$850',
    button: 'Shop Now',
    bg: '#333',
    img: 'public/image3.avif',
  },
];

const products = [
  {
    name: 'MEDIUM SMOOTH',
    price: '$24.00',
    oldPrice: '$36.00',
    img: 'public/product5.jpg',
  },
  {
    name: 'MAUBOT 2000',
    price: '$50.00',
    oldPrice: '$60.00',
    img: 'public/product3.jpg',
  },
  {
    name: 'SAINT LAUREN',
    price: '$28.55',
    img: 'public/product4.jpg',
  },
  {
    name: 'GIAMBATTISTA VALLI',
    price: '$52.00',
    img: 'public/product1.jpg',
  },
  {
    name: 'QUANVITO ROUGE',
    price: '$40.00',
    img: 'public/product7.jpg',
  },
];
function StarRating({ rating, onRate }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
function ProductList() {
  const [selectedBanner, setSelectedBanner] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratings, setRatings] = useState(Array(products.length).fill(0));

  const handleRate = (index, star) => {
    const newRatings = [...ratings];
    newRatings[index] = star;
    setRatings(newRatings);
  };

  return (
    <div className="container-product">
      {/* Banners */}
      <div className="banners">
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className={`banner ${selectedBanner === idx ? 'active' : ''}`}
            style={{ background: banner.bg }}
            onClick={() => setSelectedBanner(idx)}
          >
            <img src={banner.img} alt={`Logo ${idx}`} />
            <div className="banner-content">
              <div className="banner-subtitle">{banner.subtitle}</div>
              <div className="banner-title">{banner.title}</div>
              <div className="banner-price">
                from <span>{banner.price}</span>
              </div>

              <button className="banner-btn">{banner.button}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Products */}
      <div className="products-section">
        <h2>LATEST PRODUCTS</h2>
        <div className="products">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`product-card ${
                selectedProduct === idx ? 'selected' : ''
              }`}
              onClick={() => setSelectedProduct(idx)}
            >
              <img src={product.img} alt={product.name} />
              <div className="product-name">{product.name}</div>
              <StarRating
                rating={ratings[idx]}
                onRate={star => handleRate(idx, star)}
              />
              <div className="product-prices">
                <span className="product-price">{product.price}</span>
                {product.oldPrice && (
                  <span className="product-old-price">{product.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p>
          <a href="/products">View More Product</a>
        </p>
      </div>
    </div>
  );
}

export default ProductList;
