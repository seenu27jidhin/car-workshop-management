import axios from 'axios';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  //console.log(token);
  try {
    // console.log(token);
    const response = await axios.post(
      'http://localhost:3000/api/user/validatetoken',
      {
        token: token,
      }
    );

    // console.log(response.data.isValid);
    return response.data.isValid === true;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};
