import './App.css';
import Footer from './components/FotterBar/footer';
import Home from './Pages/Home/home';
import Topbar from './components/TopBar/topbar';
import About from './Pages/About/about';
import { Route, Router, Routes } from 'react-router-dom';
import ServiceDetails from './Pages/Service/service';
import ProductPage from './Pages/Product/productPage';
import Contact from './Pages/Contact/contact';
import Login from './Pages/Login/login';
import Cart from './Pages/Cart/cart';
import axios from '../utils/axios'; // or just axios
import { useEffect, useState } from 'react';
import SingleProduct from './Pages/SingleProductPage/singleproduct';
import PrivateRoute from './components/PrivateRoute';
import ProfileCard from './Pages/Profile/profile';
import Profile from './Pages/Profile/profile';
import AddAddress from './Pages/AddAddress/addaddress';

function App() {
  const [itemsCount, setItemsCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    //console.log('dd');
    try {
      setLoading(true);
      const response = await axios.get('/cart/mycart');
      if (response.data.success) {
        //setItems(response.data.data || []);
        setItemsCount((response.data.data && response.data.data.items) || []);
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
  return (
    <div className="container">
      <Topbar items={itemsCount} setItems={setItemsCount} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<ServiceDetails />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/contacts" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/cart"
            setItemsCount={setItemsCount}
            element={<Cart />}
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            // setItemsCount={setItemsCount}
            element={<Profile />}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/addaddress"
            // setItemsCount={setItemsCount}
            element={<AddAddress />}
          />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
