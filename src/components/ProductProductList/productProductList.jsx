import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../ProductCard/productCard';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
// const products = [
//   { name: 'Tire Set', price: '$199', img: '../../public/product7.jpg' },
//   { name: 'Headlight', price: '$49', img: '../../public/product2.jpg' },
//   { name: 'Alloy Wheel', price: '$299', img: '../../public/product3.jpg' },
//   { name: 'Engine', price: '$999', img: '../../public/product6.jpg' },
// ];
const PAGE_SIZE = 5; // Number of products to load per batch
const ProductListPage = ({ title }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const logId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  //const scrollRef = useRef(null);
  const [qty, setQty] = useState(1);

  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty > 1 ? qty - 1 : 1);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `/product/ProductList?page=${page}&limit=${PAGE_SIZE}`
        );
        if (isMounted) {
          //setProducts(res.data);
          setProducts(prev => [...prev, ...res.data.product]);
          setHasMore(res.data.product.length === PAGE_SIZE);
        }
        //console.log(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleAddToCart = async (productId, qty) => {
    //console.log(productId);
    //console.log(qty);
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
  // Intersection Observer to trigger loading more
  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loader.current]);

  // const scroll = direction => {
  //   const { current } = scrollRef;
  //   if (current) {
  //     const scrollAmount = 320; // Adjust based on card width
  //     current.scrollBy({
  //       left: direction === 'left' ? -scrollAmount : scrollAmount,
  //       behavior: 'smooth',
  //     });
  //   }
  // };
  return (
    <div className="product-list">
      <ToastContainer />
      <h4>{title}</h4>

      <div className="product-cards">
        {products.length > 0 ? (
          products.map((p, i) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <div className="product-card">
            <img
              src="public/product1.jpg"
              alt="public/product1.jpg"
              // onClick={() => navigate(`/products/${product._id}`)}
            />
            <div className="product-info">
              <h5>Sample Title</h5>
              <p>Price:40Rs</p>
              <p style={{ color: 'black' }}>Model:Sample Model</p>
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
              <button>Add to Cart</button>
            </div>
          </div>
        )}
        {hasMore && (
          <div ref={loader} style={{ height: 40, textAlign: 'center' }}>
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
