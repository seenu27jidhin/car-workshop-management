import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Paper,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
const locations = [
  'Atlanta, USA',
  'New York, USA',
  'London, UK',
  'India',
  'Saudi Arabia',
];
const department = ['AC', 'Mecanical', 'HR', 'Account'];
export default function ProfileAddressAdd() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [personalData, setPersonalData] = useState({
    gender: 'male',
    phoneno: '',
    dob: '',
    user: localStorage.getItem('userId'),
  });
  const [empData, setEmpData] = useState({
    contactname: '',
    address: '',
    street: '',
    landmark: '',
    city: '',
    location: '',
    pincode: '',
    contactno: '',
    user: localStorage.getItem('userId'),
  });
  const handleInfoChange = e => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };
  const handleChange = e => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };
  const handleUserInfoSubmit = async e => {
    e.preventDefault();
    console.log('emp');
    const form1 = new FormData();
    Object.entries(personalData).forEach(([key, value]) => {
      if (value) form1.append(key, value);
    });

    try {
      await axios.post(`/userpersonalinfo`, form1);
      toast.success('✅ User Info updated');
      setPersonalData({
        gender: 'male',
        phoneno: '',
        dob: '',
      });
    } catch (err) {
      toast.error('❌ Update failed');
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('emp');
    const form = new FormData();
    Object.entries(empData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      await axios.post(`/userinfo`, form);
      toast.success('✅ User Info updated');
      setEmpData({
        contactname: '',
        address: '',
        street: '',
        landmark: '',
        city: '',
        location: '',
        pincode: '',
        contactno: '',
      });
    } catch (err) {
      toast.error('❌ Update failed');
    }
  };
  return (
    <div className="profile-container" style={{ maxWidth: '1200px' }}>
      <ToastContainer />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f7f7fa', p: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
            <form onSubmit={handleUserInfoSubmit}>
              <Typography variant="h6" mb={2}>
                User Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}></Grid>
                <RadioGroup
                  row
                  name="gender"
                  value={personalData.gender}
                  onChange={handleInfoChange}
                  sx={{ mb: 2 }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneno"
                    value={personalData.phoneno}
                    onChange={handleInfoChange}
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="date"
                    label="Dob"
                    name="dob"
                    value={personalData.dob}
                    onChange={handleInfoChange}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleUserInfoSubmit}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Typography variant="h6" mb={2}>
              Address Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <main className="profile-main">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Contact Name"
                      name="contactname"
                      value={empData.contactname}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      name="address"
                      value={empData.address}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Street/Area/Village"
                      name="street"
                      value={empData.street}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="LandMark"
                      name="landmark"
                      value={empData.landmark}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Town/City"
                      name="city"
                      value={empData.city}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label="Location"
                      name="location"
                      value={empData.location}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                      sx={{ width: '40ch' }}
                    >
                      {locations.map(loc => (
                        <MenuItem key={loc} value={loc}>
                          {loc}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="PinCode"
                      name="pincode"
                      value={empData.pincode}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Contact Number"
                      name="contactno"
                      value={empData.contactno}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </main>
            </form>
          </Paper>
        </Grid>
      </Box>
    </div>
  );
}
