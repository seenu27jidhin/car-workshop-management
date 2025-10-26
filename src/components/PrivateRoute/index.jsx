import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/index';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const checkLoggedIn = async () => {
    const valid = await isAuthenticated();
    setIsLoggedIn(valid);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  if (isLoggedIn == null) return <p>Loading...</p>;
  else return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
