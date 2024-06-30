import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Divider, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProfileDetails({ user, onEditClick, onDeleteClick }) {
  const navigate = useNavigate();

  const handleShowClick = () => {
    if (user.role === 'user') {
      navigate('/mytours');
    } else {
      navigate('/myproperties');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Name</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Name')}
          sx={{
            backgroundColor: '#0185B7',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          Edit
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>
          {user && user.role === 'user' ? 'Tours' : 'Properties'}
        </Typography>
        <Button
          variant="contained"
          onClick={handleShowClick}
          sx={{
            backgroundColor: '#0185B7',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          Show
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Phone</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Phone')}
          sx={{
            backgroundColor: '#0185B7',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          Edit
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Password</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Password')}
          sx={{
            backgroundColor: '#0185B7',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          Edit
        </Button>
      </Box>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Manage Account
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Button color="error" variant="contained" onClick={onDeleteClick}>
        Delete Account
      </Button>
    </Paper>
  );
}

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ProfileDetails;
