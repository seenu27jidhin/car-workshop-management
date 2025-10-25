import React, { useEffect, useState } from 'react';
import ProductImageViewer from './ProductImageViewer';
import './singleproduct.css';
import axios from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
// Mock data for the product

const productData = {
  rating: 4.5,
  reviews: 15,

  dimensions: { height: 52, width: 43 },

  colors: ['#E0DED7', '#464646'],
};

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = localStorage.getItem('userId');
  //const userId = storedUser?._id || storedUser?.id;
  console.log(storedUser);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch product and reviews in parallel
        const [productRes, cartRes] = await Promise.all([
          axios.get(`/product/${id}`),
          axios.get(`/cart/user/${storedUser}/product/${id}`),
        ]);
        setProducts(productRes.data);
        setCartProducts(cartRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storedUser, id]);
  //   fetch(`http://localhost:3000/api/product/${id}`)
  //       .then(res => res.json())
  //       .then(data => setProducts(data))
  //       .catch(err => console.error(err));
  //   }, [id]

  const [quantity, setQuantity] = useState(1);

  //   const handleAddToCart = () => {
  //     alert(`Added ${quantity} of ${products.title} to cart.`);
  //   };
  const handleAddToCart = async (e, productId, qty) => {
    console.log(productId);
    console.log(qty);
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // ensure this is stored at login

    try {
      const res = await axios.post('/cart/add', {
        user: userId,
        productid: [
          {
            product: productId,
            quantity: qty,
          },
        ],
      });
      toast.success('🛒 Added to cart');
    } catch (err) {
      toast.error('❌ Failed to add to cart');
      console.error(err);
    }
  };
  const handleBuyNow = () => {
    alert(`Buying ${quantity} of ${products.title} now.`);
  };
  if (!products) return <p>Loading...</p>;
  return (
    <div className="product-page-wrapper">
      <ToastContainer />
      {/* <nav className="navbar">
        <div className="logo">WUDO</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Furniture</a>
          <a href="#">Product</a>
          <a href="#">Store</a>
        </div>
        <div className="nav-icons">
          <span>🔍</span>
          <span>
            🛒<sup className="cart-count">3</sup>
          </span>
        </div>
      </nav> */}

      <main className="product-container">
        <ProductImageViewer images={products.image} />

        <div className="product-details">
          <span className="category">{products.category}</span>
          <h1>{products.title}</h1>
          <div className="reviews">
            ⭐ {productData.rating}/10 · {productData.reviews} Reviews
          </div>

          <div className="color-selector">
            {productData.colors.map(color => (
              <span
                key={color}
                className="color-dot"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>

          <p className="description">{products.description}</p>

          <div className="dimensions">
            <div className="dim-box">
              <span>Height</span>
              <b>
                {productData.dimensions.height}
                <sub>cm</sub>
              </b>
            </div>
            <div className="dim-box">
              <span>Width</span>
              <b>
                {productData.dimensions.width}
                <sub>cm</sub>
              </b>
            </div>
            <a href="#" className="dim-link">
              view in inches
            </a>
          </div>

          <div className="price">${products.price}</div>

          <div className="actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={e => handleAddToCart(e, products._id, quantity)}
            >
              ADD TO CART
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              BUY NOW
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProduct;
