import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropertyCard from 'components/UserProfile/LandlordProperties/PropertyCard';
import { fetchUserProperties, deleteProperty } from 'store/userPropertiesSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import { useTranslation } from 'react-i18next';

function MyProperties() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProperties, isLoading } = useSelector(
    (state) => state.userProperties
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProperties()).unwrap();
  }, [dispatch]);

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleEditProperty = (slug) => {
    navigate(`/edit-property/${slug}`);
  };

  const handleOpenDialog = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPropertyId(null);
  };

  const handleDeleteProperty = () => {
    dispatch(deleteProperty(selectedPropertyId))
      .unwrap()
      .then(() => {
        toast.success(t('Property deleted successfully'));
        handleCloseDialog();
      })
      .catch(() => {
        toast.error(t('Failed to delete property'));
        handleCloseDialog();
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h4">{t('My Properties')}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProperty}
          >
            + {t('Add New Property')}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {userProperties && userProperties.length > 0 ? (
            userProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <PropertyCard
                  property={property}
                  onEdit={() => handleEditProperty(property.slug)}
                  onDelete={() => handleOpenDialog(property.id)}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6">
                {t('You have no properties listed yet.')}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('Delete Property')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('Are you sure you want to delete this property?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleDeleteProperty} color="error" autoFocus>
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyProperties;
