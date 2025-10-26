import React, { useEffect, useState } from 'react';
import './cart.css';
import '../../components/CartTabs/carttabs.jsx';
import { useNavigate } from 'react-router-dom';
import CartTabs from '../../components/CartTabs/carttabs.jsx';
import CartItems from '../../components/CartItemsList/cartitemlist.jsx';
import axios from '../../../utils/axios'; // or just axios
import { toast, ToastContainer } from 'react-toastify';
const CartSummary = ({ address, onChangeAddress, summary, onPlaceOrder }) => (
  <div className="cart-summary-section">
    <div className="cart-address">
      <div>Delivery Address</div>
      <div>
        <span className="cart-address-value">{address}</span>
        <button className="cart-change-btn" onClick={onChangeAddress}>
          Change
        </button>
      </div>
    </div>
    <div className="cart-payment-summary">
      <div>Payment Summary</div>
      <div className="cart-summary-row">
        <span>Total MRP</span>
        <span>₹{summary.total}</span>
      </div>
      <div className="cart-summary-row">
        <span>Discount on MRP</span>
        <span className="cart-discount">-₹{summary.discount}</span>
      </div>
      <div className="cart-summary-row">
        <span>Coupon savings</span>
        <span className="cart-discount">-₹{summary.coupon}</span>
      </div>
      <div className="cart-summary-row">
        <span>Applicable GST</span>
        <span>₹{summary.gst}</span>
      </div>
      <div className="cart-summary-row">
        <span>Delivery</span>
        <span className="cart-free">Free</span>
      </div>
      <div className="cart-summary-row cart-summary-total">
        <span>Total</span>
        <span>₹{summary.final}</span>
      </div>
      <button className="cart-place-order-btn" onClick={onPlaceOrder}>
        PLACE ORDER
      </button>
    </div>
  </div>
);
const PaymentSection = ({
  paymentMode,
  setPaymentMode,
  cardDetails,
  setCardDetails,
  onPay,
}) => (
  <div className="payment-section">
    <div className="cart-offers">
      <div>Available Offers</div>
    </div>
    <div className="payment-title">Select Payment Mode</div>
    <div className="payment-modes">
      <label>
        <input
          type="radio"
          name="payment"
          checked={paymentMode === 'saved'}
          onChange={() => setPaymentMode('saved')}
        />
        Saved Cards/UPI
      </label>
      <label>
        <input
          type="radio"
          name="payment"
          checked={paymentMode === 'cod'}
          onChange={() => setPaymentMode('cod')}
        />
        Cash on Delivery
      </label>
      <label className="credit-card-label">
        <input
          type="radio"
          name="payment"
          checked={paymentMode === 'credit'}
          onChange={() => setPaymentMode('credit')}
        />
        Credit Card
        {paymentMode === 'credit' && (
          <div className="credit-card-form">
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={e =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={e =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Card Expiry Date"
              value={cardDetails.expiry}
              onChange={e =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={e =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
              style={{ width: 80 }}
            />
            <div className="save-card">
              <input
                type="checkbox"
                checked={cardDetails.save}
                onChange={e =>
                  setCardDetails({ ...cardDetails, save: e.target.checked })
                }
              />
              <span>Save this card securely</span>
            </div>
            <button className="pay-btn" onClick={onPay}>
              PAY NOW ₹1558.00
            </button>
          </div>
        )}
      </label>
      <label>
        <input
          type="radio"
          name="payment"
          checked={paymentMode === 'debit'}
          onChange={() => setPaymentMode('debit')}
        />
        Debit Card
      </label>
    </div>
  </div>
);

const Cart = ({ setItemsCount }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); // if using react-router
  const [items, setItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [address] = useState('Bangalore 530096');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  // const estimateDelivery = [
  //   '24 - 25 Sep',
  //   '07 - 25 Sep',
  //   '15 - 25 Sep',
  //   '30 - 25 Sep',
  // ];
  const fetchCart = async () => {
    //console.log('dd');
    try {
      setLoading(true);
      const response = await axios.get('/cart/mycart');
      if (response.data.success) {
        //setItems(response.data.data || []);
        setItems(
          (response.data.data &&
            response.data.data.items.filter(
              item => item.category === 'CART'
            )) ||
            []
        );

        setWishlistItems(
          (response.data.data &&
            response.data.data.wishlistItems.filter(
              item => item.category === 'WISHLIST'
            )) ||
            []
        );
        // setItemsCount(response.data.data.items.length);
        //  setItems(res.data.data.items.filter(item => item.category === 'cart'));
        // console.log('cartsssss', items.items);
        // Calculate total amount (if not done on backend)

        console.log('Cart items:', response.data.data.items);
      }

      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    setLoading(false);
  }, []);

  const summary = {
    total: items.reduce((a, b) => a + b.product.price * b.quantity, 0),
    discount: 400,
    coupon: 100,
    gst: 18,
    final: 0,
  };
  summary.final =
    summary.total - summary.discount - summary.coupon + summary.gst;

  const handleQtyChange = (id, qty) => {
    console.log(qty);
    setItems(items =>
      items.map(item =>
        item._id === id ? { ...item, quantity: qty < 1 ? 1 : qty } : item
      )
    );
  };

  const handleAddToWishlist = async productId => {
    console.log(productId);
    console.log(userId);
    try {
      await axios.post(
        `/cart/wishlist/add/user/${userId}/product/${productId}`,
        {
          userId,
          productId: productId,
        }
      );
      // Remove from cart in local state (category === 'cart')
      setItems(prev =>
        prev.filter(
          item => !(item.product._id === productId && item.category === 'CART')
        )
      );
      toast.success('Moved to wishlist!');
      //  setItems();
    } catch (err) {
      alert('Failed to add to wishlist');
    }
  };

  const handleRemove = async productId => {
    try {
      await axios.delete('/cart/remove', {
        data: { userId, productId },
      });
      // Remove from local state
      setItems(prev => prev.filter(item => item.product._id !== productId));
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const handlePlaceOrder = () => {
    const token = localStorage.getItem('token'); // or userId
    if (token) {
      setActiveTab(1); // Go to Address tab
    } else {
      // Option 1: Redirect to login page
      navigate('/login');
      // Option 2: Show a login modal (implement as needed)
      // setShowLoginModal(true);
    }
    //alert('Order placed!');
  };
  const handlePayment = () => {
    const token = localStorage.getItem('token'); // or userId
    if (token) {
      setActiveTab(2); // Go to Address tab
    } else {
      // Option 1: Redirect to login page
      navigate('/login');
      // Option 2: Show a login modal (implement as needed)
      // setShowLoginModal(true);
    }
    //alert('Order placed!');
  };

  const [paymentMode, setPaymentMode] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    save: false,
  });
  const handlePay = () => {
    alert('Payment processed!');
  };
  const orderNumber = '11562023-333819-03036522';
  return (
    <div className="cart-page">
      <ToastContainer />
      <CartTabs activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="cart-main">
        {activeTab === 0 && (
          <>
            {/* Cart Items Content */}
            <CartItems
              items={items}
              wishlistItems={wishlistItems}
              onQtyChange={handleQtyChange}
              onhandleAddToWishlist={handleAddToWishlist}
              onRemove={handleRemove}
            />
            <CartSummary
              address={address}
              summary={summary}
              onPlaceOrder={handlePlaceOrder}
            />
            {/* <button onClick={handlePlaceOrder}>Place Order</button> */}
          </>
        )}
        {activeTab === 1 && (
          <div className="address-section">
            <div className="delivery-address">
              <div className="address-title">Delivery Address</div>
              <div className="address-card">
                <div>
                  <b>Sajith Kumar</b>{' '}
                  <span className="address-label">Home</span>
                </div>
                <div>
                  2nd Floor, Akbar Bldg, Mahatma Phule Society,
                  <br />
                  Shiv Shrusti, Kurla(E),
                  <br />
                  Mumbai, Maharashtra 400024
                </div>
                <div>
                  Mobile: <b>+91 1234567890</b>
                </div>
                <button className="change-address-btn">CHANGE ADDRESS</button>
                <div className="address-delivery-info">
                  <span className="dot"></span> Cash on delivery available
                  <span className="delivery-estimate">
                    Estimated delivery: 24 - 25 Sep
                  </span>
                </div>
              </div>
            </div>
            <div className="expected-delivery">
              <div className="expected-title">Expected Delivery</div>
              <div className="expected-list">
                {items.map((item, idx) => (
                  <div className="expected-item">
                    <img src={item.product.image} alt={item.product.title} />
                    {/* {estimateDelivery.map(item => ( */}
                    <div>
                      Estimated delivery by <b>17 Sep 2020</b>
                    </div>
                    {/* ))} */}
                  </div>
                ))}
                {/* <div className="expected-item">
                  <img src="https://via.placeholder.com/60" alt="Product" />
                  <div>
                    Estimated delivery by <b>17 Sep 2020</b>
                  </div>
                </div> */}
              </div>
              <button onClick={handlePayment}>Continue</button>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {' '}
            <PaymentSection
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              onPay={handlePay}
            />
          </div>
        )}
        {activeTab === 3 && (
          <div className="success-main">
            <div className="success-card">
              <div className="success-icon">
                <svg width="48" height="48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="#ffb300"
                    strokeWidth="4"
                    fill="#fff"
                  />
                  <path
                    d="M16 25l6 6 10-12"
                    stroke="#ffb300"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Congratulations</h2>
              <p>Lorem Ipsum is simply dummy text of the printing!</p>
              <div className="order-box">
                <div className="order-label">Order Number</div>
                <div className="order-number">{orderNumber}</div>
                <a href="#" className="view-order-link">
                  View Order
                </a>
              </div>
              <button className="continue-btn">CONTINUE SHOPPING</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
