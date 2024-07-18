import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Divider, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProfileDetails({ user, onEditClick, onDeleteClick }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleShowClick = () => {
    if (user.role === 'user') {
      navigate('/mytours');
    } else {
      navigate('/myproperties');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="div" sx={{ mb: 3 }}>
        {t('Profile')}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">{t('Name')}</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Name')}
          sx={{
            backgroundColor: '#2C3E50',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          {t('Edit')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          {user && user.role === 'user' ? t('My Tours') : t('My Properties')}
        </Typography>
        <Button
          variant="contained"
          onClick={handleShowClick}
          sx={{
            backgroundColor: '#2C3E50',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          {t('Show')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">{t('Phone')}</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Phone')}
          sx={{
            backgroundColor: '#2C3E50',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          {t('Edit')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">{t('Password')}</Typography>
        <Button
          variant="contained"
          onClick={() => onEditClick('Password')}
          sx={{
            backgroundColor: '#2C3E50',
            '&:hover': {
              backgroundColor: '#016a92',
            },
          }}
        >
          {t('Edit')}
        </Button>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 3 }}>
        {t('Manage Account')}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Button color="error" variant="contained" onClick={onDeleteClick}>
        {t('Delete Account')}
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
