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
  Fab,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaIcon from '@mui/icons-material/Spa';
import MenuIcon from '@mui/icons-material/Menu';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { fetchProperty } from '../store/propertyDetailsSlice';
import TourRequestForm from './TourRequestForm';

function PropertyDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.property);
  const status = useSelector((state) => state.property.status);
  const error = useSelector((state) => state.property.error);
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProperty(slug));
    }
  }, [dispatch, slug]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!property) {
    return null;
  }

  const handleRequestTourClick = () => {
    setIsTourFormOpen(true);
  };

  const handleTourFormClose = () => {
    setIsTourFormOpen(false);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
        backgroundColor: '#f5f5f0',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '900px',
          mt: 4,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          borderRadius: '16px',
          position: 'relative',
        }}
      >
        <AppBar
          position="relative"
          sx={{
            backgroundColor: '#2b3d4f',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Property Details
            </Typography>
          </Toolbar>
        </AppBar>

        <Fab
          aria-label="like"
          sx={{
            position: 'absolute',
            top: '60px',
            right: '10px',
            zIndex: 1000,
          }}
          onClick={handleLikeClick}
        >
          <FavoriteIcon sx={{ color: isLiked ? 'red' : 'gray' }} />
        </Fab>

        <CardContent>
          <div className="property-image">
            {property.images && (
              <Carousel
                navButtonsAlwaysVisible
                indicators={false}
                animation="slide"
              >
                {property.images.map((image) => (
                  <img
                    key={image.id}
                    src={`http://127.0.0.1:8000/${image.image}`}
                    alt={image.image}
                    style={{
                      width: '100%',
                      height: '600px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </Carousel>
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '8px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {property.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '10px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {property.description}
              </Typography>

              {/* Display Location Information */}
              {property.location && (
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <LocationOnIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Location: {property.location.street},{' '}
                        {property.location.city}, {property.location.state}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}

              <Grid container spacing={2}>
                {property.num_of_rooms && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <BedIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Rooms: {property.num_of_rooms}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.num_of_bathrooms && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <BathtubIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Bathrooms: {property.num_of_bathrooms}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.area && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <AspectRatioIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Area: {property.area} sq.ft
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.price && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <PriceCheckIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Price: {property.price} EGP / month
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.availability && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <EventAvailableIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Availability: {property.availability}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.listing_type && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <HomeWorkIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Listing: {property.listing_type}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {property.amenities && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        backgroundColor: '#f0f5f5',
                        borderRadius: '8px',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        display="flex"
                        alignItems="center"
                        gutterBottom
                        sx={{
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        <SpaIcon sx={{ mr: 1, color: '#4d79ff' }} />
                        Amenities:
                      </Typography>
                      <Box sx={{ paddingLeft: '42px' }}>
                        {property.amenities.map((amenity) => (
                          <Typography
                            key={amenity.id}
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <SpaIcon
                              sx={{
                                mr: 1,
                                fontSize: 'small',
                                color: '#4d79ff',
                              }}
                            />
                            {amenity.name}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestTourClick}
          >
            Request a Tour
          </Button>
        </Box>
      </Card>
      {property.id && (
        <TourRequestForm
          isOpen={isTourFormOpen}
          onClose={handleTourFormClose}
          propertyId={property.id}
        />
      )}
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
