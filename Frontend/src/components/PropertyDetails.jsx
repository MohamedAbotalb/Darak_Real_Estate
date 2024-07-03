import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SpaIcon from '@mui/icons-material/Spa';
import { fetchProperty } from 'store/propertyDetailsSlice';
import AddToWishlistButton from 'components/Home/AddToWishlistButton';
import TourRequestForm from 'components/TourRequestForm';
import ReportModal from './ReportModal';
import amenityIcons from '../utils/amenityIcons';

function PropertyDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.property);
  const status = useSelector((state) => state.property.status);
  const error = useSelector((state) => state.property.error);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProperty(slug));
    }
  }, [dispatch, slug]);

  const handleRequestTourClick = () => {
    setIsTourFormOpen(true);
  };

  const handleTourFormClose = () => {
    setIsTourFormOpen(false);
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false);
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed')
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!property) return null;

  return (
    <Container sx={{ mt: 4, backgroundColor: '#f5f5f0', padding: '24px' }}>
      <Card
        sx={{
          width: '100%',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: '#2C3E50' }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Property Details
            </Typography>
            <AddToWishlistButton propertyId={property.id} />
          </Toolbar>
        </AppBar>

        <Box mt={2}>
          <div className="property-image" style={{ marginTop: '16px' }}>
            {property.images && (
              <Carousel
                navButtonsAlwaysVisible
                indicators={false}
                animation="slide"
              >
                {property.images.map((image) => (
                  <img
                    key={image.id}
                    src={`${image.image}`}
                    alt={image.image}
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </Carousel>
            )}
          </div>

          <CardContent>
            {/* Details Section */}
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Grid item display="flex" alignItems="center">
                <PriceCheckIcon color="primary" />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {property.price
                    ? property.price.toLocaleString()
                    : 'Price not available'}{' '}
                  {property.listing_type === 'buy' ? 'EGP' : 'EGP / Month'}
                </Typography>
              </Grid>
              <Grid item display="flex" alignItems="center">
                <BedIcon color="primary" />
                <Typography variant="body1" sx={{ ml: 2, mr: 3 }}>
                  {property.num_of_rooms} Bedrooms
                </Typography>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  |
                </Typography>
                <BathtubIcon color="primary" />
                <Typography variant="body1" sx={{ ml: 2, mr: 3 }}>
                  {property.num_of_bathrooms} Bathrooms
                </Typography>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  |
                </Typography>
                <AspectRatioIcon color="primary" />
                <Typography variant="body1" sx={{ ml: 2, mr: 3 }}>
                  {property.area} sqft
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 1, width: '65%', mb: 5 }} />

            {/* Property title */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'lighter' }}
            >
              {property.title}
            </Typography>

            {/* Property type */}
            {property.property_type && (
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                sx={{ fontWeight: 'lighter' }}
              >
                <HomeWorkIcon color="primary" sx={{ mr: 1 }} />
                Property Type: {property.property_type.name}
              </Typography>
            )}

            <Divider sx={{ my: 1, width: '65%', mb: 5 }} />

            {/* Location details */}
            {property.location && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'lighter' }}
                >
                  Location:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'lighter' }}>
                  <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                  {property.location.street}, {property.location.city},{' '}
                  {property.location.state}
                </Typography>
                <Divider sx={{ my: 1, width: '65%', mb: 5 }} />
              </>
            )}

            {/* Agent details */}
            {property.user && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'lighter' }}
                >
                  Agent
                </Typography>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <Avatar src={property.user.avatar} />
                  <Box ml={2}>
                    <Typography variant="body1" sx={{ fontWeight: 'lighter' }}>
                      {property.user.first_name} {property.user.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: 'lighter' }}
                    >
                      Phone: {property.user.phone_number}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: 'lighter' }}
                    >
                      Email: {property.user.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, width: '65%', mb: 5 }} />
              </>
            )}

            {/* Description */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'lighter' }}
            >
              Description:
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontWeight: 'lighter', width: '60%' }}
            >
              {property.description}
            </Typography>

            <Divider sx={{ my: 1, width: '65%', mb: 5 }} />

            {/* Amenities */}
            {property.amenities && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'lighter' }}
                >
                  Amenities:
                </Typography>
                <Grid container spacing={2}>
                  {property.amenities.map((amenity) => {
                    const AmenityIcon = amenityIcons[amenity.slug] || SpaIcon;
                    return (
                      <Grid item xs={5} key={amenity.id}>
                        <Box display="flex" alignItems="center">
                          <AmenityIcon
                            sx={{
                              mr: 1,
                              color: '#4d79ff',
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'lighter' }}
                          >
                            {amenity.name}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}

            {/* Button Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                bottom: 0,
                right: '20px',
                padding: '16px 0',
                zIndex: 1,
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRequestTourClick}
                  >
                    Request a Tour
                  </Button>
                </Paper>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Tour Request Form */}
      {property.id && (
        <TourRequestForm
          isOpen={isTourFormOpen}
          onClose={handleTourFormClose}
          propertyId={property.id}
          slug={property.slug}
        />
      )}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={handleReportModalClose}
        propertyId={property.id}
        userData={property.user}
      />
    </Container>
  );
}

PropertyDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PropertyDetails;
