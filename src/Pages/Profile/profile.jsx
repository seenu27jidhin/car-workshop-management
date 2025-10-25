import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import ProfileSidebar from '../../components/ProfileSidebar/profilesidebar';
import ProfileContent from '../../components/ProfileContent/profilecontent';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

export default function Profile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  // console.log(userId);
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

  //console.log(formData);
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;
  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileSidebar user={user} />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProfileContent user={user} />
        </Grid>
      </Grid>
    </Box>
  );
}
