import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPropertyUpdates,
  fetchOldProperty,
} from 'store/propertyupdateSlice';
import Loader from 'components/Loader';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Modal,
  IconButton,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CloseIcon from '@mui/icons-material/Close';
import ImageSliderModal from 'components/PropertyDetails/ImageSliderModal'; // Import ImageSliderModal

function PropertyUpdateDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [propertyId, setPropertyId] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const updates = useSelector((state) => state.propertyUpdates.updates);
  const oldProperty = useSelector(
    (state) =>
      state.propertyUpdates.updates.find((update) => update.id === Number(id))
        ?.oldProperty
  );

  useEffect(() => {
    const fetchUpdates = async () => {
      await dispatch(fetchPropertyUpdates());
      setLoading(false);
    };
    fetchUpdates();
  }, [dispatch]);

  useEffect(() => {
    if (updates.length > 0 && propertyId === null) {
      const foundUpdate = updates.find((update) => update.id === Number(id));
      if (foundUpdate) {
        setPropertyId(foundUpdate.id);
      }
    }
  }, [updates, id, propertyId]);
  useEffect(() => {
    if (propertyId !== null) {
      const fetchDetails = async () => {
        setLoading(true);
        await dispatch(fetchOldProperty(propertyId));
        setLoading(false);
      };
      fetchDetails();
    }
  }, [dispatch, propertyId]);

  if (loading) {
    return <Loader />;
  }

  const handleOpenModal = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <Box sx={{ mt: 10 }}>
      {/* Image Slider Modal */}
      <ImageSliderModal
        images={oldProperty?.images || []}
        open={modalImage !== null}
        onClose={handleCloseModal}
        initialImage={modalImage}
      />

      <Card>
        <CardContent>
          {/* Images Section */}
          {oldProperty && oldProperty.images.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Old Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {oldProperty.images.map((image) => (
                  <Box
                    key={image.id}
                    sx={{
                      width: { xs: '100%', sm: '48%', md: '30%' },
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleOpenModal(image.image)}
                  >
                    <img
                      src={image.image}
                      alt={`Property ${image.id}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {oldProperty ? (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {oldProperty.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {oldProperty.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <PriceCheckIcon sx={{ mr: 1 }} />
                    {oldProperty.price.toLocaleString()}{' '}
                    {oldProperty.listing_type === 'buy' ? 'EGP' : 'EGP/month'}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <BedIcon sx={{ mr: 1 }} />
                        {oldProperty.num_of_rooms} Bedrooms
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <BathtubIcon sx={{ mr: 1 }} />
                        {oldProperty.num_of_bathrooms} Bathrooms
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <SquareFootIcon sx={{ mr: 1 }} />
                        {oldProperty.area} sqft
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    {oldProperty.listing_type}
                  </Typography>
                </Box>
              ) : (
                <Typography>No data available</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} />
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PropertyUpdateDetails;
