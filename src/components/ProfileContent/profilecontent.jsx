import React, { useEffect, useState } from 'react';

import {
  Box,
  Paper,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { data } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../utils/axios';
export default function ProfileContent({ user }) {
  const [tab, setTab] = React.useState(0);
  // const [formData, setForm] = useState([]);
  const [formData, setForm] = useState([]);
  const [userData, setUserData] = useState([]);
  //console.log('ssff', formData);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    // console.log('ddww');
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`/userinfo/by-user/${userId}`);
        console.log(res);
        setForm(res.data);
      } catch (err) {
        toast.error('Failed to load Employee Information');
      }
    };
    const fetchUserPersonalInfo = async () => {
      try {
        const res = await axios.get(`/userpersonalinfo/by-user/${userId}`);
        console.log(res);
        setUserData(res.data);
      } catch (err) {
        toast.error('Failed to load Employee Information');
      }
    };
    fetchUserPersonalInfo();
    fetchUserInfo();
  }, [userId]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Account Settings
      </Typography>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="My Profile" />
          <Tab label="Security" />
          <Tab label="Teams" />
          <Tab label="Notifications" />
          <Tab label="Billing" />
          <Tab label="Data Export" />
        </Tabs>
        {/* My Profile */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            {user.image == '' ? (
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                sx={{ width: 64, height: 64 }}
              />
            ) : (
              <img
                src={user.image}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: 4 }}
              />
            )}
            <Box>
              <Typography fontWeight={600}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {formData.length == '0' ? 'No Location' : formData.location} */}
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 3 }} />
        {/* Personal Information */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600}>Personal Information</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              First Name
            </Typography>
            <Typography>{user.name}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              Email address
            </Typography>
            <Typography>{user.email}</Typography>
          </Grid>
        </Grid>
        {userData.map((personal, i) => (
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Gender
              </Typography>
              <Typography>{personal.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                DOB
              </Typography>
              <Typography>{personal.dob}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Phone
              </Typography>
              <Typography>{personal.phoneno}</Typography>
            </Grid>
          </Grid>
        ))}
        <Divider sx={{ my: 3 }} />
        {/* Address */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={600}>Address</Typography>
        </Box>
        {formData.map((userinfo, i) => (
          <Grid container spacing={2} mt={1} key={userinfo._id}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Address
              </Typography>
              <Typography>
                {userinfo.contactname}
                <br />
                {userinfo.address} <br />
                {userinfo.street}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Landmark
              </Typography>
              <Typography>{userinfo.landmark}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                City
              </Typography>
              <Typography>{userinfo.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Location
              </Typography>
              <Typography>{userinfo.location}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Postal Code
              </Typography>
              <Typography>{userinfo.pincode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">
                Contact No
              </Typography>
              <Typography>{userinfo.contactno}</Typography>
            </Grid>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Grid>
        ))}
      </Paper>
    </Box>
  );
}
