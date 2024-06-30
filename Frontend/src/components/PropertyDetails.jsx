import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams hook
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Fab,
  Divider,
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
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SpaIcon from '@mui/icons-material/Spa';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchProperty } from '../store/propertyDetailsSlice';
import TourRequestForm from './TourRequestForm';

function PropertyDetails() {
  const { slug } = useParams(); // Use useParams to get the slug
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.property);
  const status = useSelector((state) => state.property.status);
  const error = useSelector((state) => state.property.error);
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);

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

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
        position: 'relative',
        height: 840,
        backgroundColor: '#f5f5f0',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '900px',
          mt: 4,
          position: 'relative',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '30px',
          height: 820,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
          },
          overflow: 'hidden', // Ensure card content doesn't overflow
        }}
      >
        <AppBar
          position="absolute"
          sx={{ top: 0, left: 0, right: 0, zIndex: 1 }}
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
          disabled
          aria-label="like"
          sx={{
            position: 'absolute',
            top: '60px',
            right: '10px',
            zIndex: 1000,
          }}
        >
          <FavoriteIcon sx={{ color: 'blue' }} />
        </Fab>

        <CardContent sx={{ paddingTop: '80px', overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="property-image" style={{ height: '100%' }}>
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
                        alt={`${image.image}`}
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
            </Grid>
            <Grid item xs={12} md={6}>
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
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <BedIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Rooms: {property.num_of_rooms}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <BathtubIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Bathrooms: {property.num_of_bathrooms}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <AspectRatioIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Area: {property.area} sq.ft
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <PriceCheckIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Price: {property.price} EGP / month
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <EventAvailableIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Availability: {property.availability}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <HomeWorkIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Listing: {property.listing_type}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{
                  transition: 'color 0.3s ease',
                  padding: '6px',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <SpaIcon sx={{ mr: 1, color: '#4d79ff' }} />
                Amenities:
              </Typography>
              <Box sx={{ paddingLeft: '42px' }}>
                {property.amenities &&
                  property.amenities.map((amenity) => (
                    <Typography
                      key={amenity.id}
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <SpaIcon
                        sx={{ mr: 1, fontSize: 'small', color: '#4d79ff' }}
                      />
                      {amenity.name}
                    </Typography>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestTourClick}
            sx={{ mb: 4 }}
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
