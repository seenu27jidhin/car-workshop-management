import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import ProfileSidebar from '../../components/ProfileSidebar/profilesidebar';
import ProfileContent from '../../components/ProfileContent/profilecontent';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';
import ProfileAddressAdd from '../../components/ProfileContent/profileaddressadd';

export default function AddAddress() {
  const [user, setUser] = useState(null);
  const [formData, setForm] = useState({
    gender: '',
    address: '',
    phoneno: '',
    dob: '',
    location: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  console.log(userId);
  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        setUser(null);
        setLoading(false);
      });
  }, [userId]);
  useEffect(() => {
    const fetchEmpInfo = async () => {
      try {
        const res = await axios.get(`/userinfo/by-user/${userId}`);
        // console.log('ssss', res);
        const { gender, address, phoneno, dob, location, pincode } = res.data;
        setForm({
          gender,
          address,
          phoneno,
          dob,
          location,
          pincode,
          user: userId,
        });
      } catch (err) {
        toast.error('Failed to load Employee Information');
      }
    };
    fetchEmpInfo();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;
  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileSidebar user={user} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProfileAddressAdd
            user={user}
            formData={formData}
            onSetForm={setForm}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
