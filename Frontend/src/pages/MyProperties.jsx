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
import Header from 'components/Home/Header';
import PropertyCard from 'components/UserProfile/LandlordProperties/PropertyCard';
import { fetchUserProperties, deleteProperty } from 'store/userPropertiesSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';

function MyProperties() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector(
    (state) => state.userProperties.userProperties
  );
  const isLoading = useSelector((state) => state.userProperties.isLoading);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProperties())
      .unwrap()
      .then(() => {})
      .catch(() => {});
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
        toast.success('Property deleted successfully');
        handleCloseDialog();
      })
      .catch(() => {
        toast.error('Failed to delete property');
        handleCloseDialog();
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h4">My Properties</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProperty}
          >
            + Add New Property
          </Button>
        </Box>
        <Grid container spacing={3}>
          {properties && properties.length > 0 ? (
            properties.map((property) => (
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
                You have no properties listed yet.
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
        <DialogTitle id="alert-dialog-title">Delete Property</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProperty} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyProperties;
