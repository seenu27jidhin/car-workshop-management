import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function ProfileSidebar({ user }) {
  //const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const handleAddress = () => {
    //console.log('dd', productId);
    navigate(`/addaddress`);
  };
  const handleHome = () => {
    //console.log('dd', productId);
    navigate(`/profile`);
  };

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: '#fff',
        borderRadius: 3,
        p: 2,
        minHeight: '80vh',
      }}
    >
      <Box mb={2}>
        <strong>{user.name}</strong>
        <div style={{ fontSize: 12, color: '#888' }}>{user.email}</div>
      </Box>
      <List>
        <ListItem button onClick={handleHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleAddress}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Add Address" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payment" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Team Settings" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete Account" sx={{ color: 'red' }} />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddress}
        fullWidth
        sx={{ mt: 2 }}
      >
        Create Address +
      </Button>
    </Box>
  );
}
