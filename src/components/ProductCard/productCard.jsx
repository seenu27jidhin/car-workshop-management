import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty > 1 ? qty - 1 : 1);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <div className="product-info">
        <h5>{product.title}</h5>
        <p>Price:{product.price}</p>
        <p style={{ color: 'black' }}>Model:{product.model}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={decrement}
            style={{ width: 30, backgroundColor: 'black' }}
          >
            -
          </button>
          <span>{qty}</span>
          <button
            onClick={increment}
            style={{ width: 30, backgroundColor: 'black' }}
          >
            +
          </button>
        </div>
        <button onClick={() => onAddToCart(product._id, qty)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
