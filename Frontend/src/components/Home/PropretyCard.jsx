import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Divider,
  Box,
  Button,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function PropertyCard({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const isWishlisted = wishlist.some((item) => item.id === property.id);

  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(property.id));
    } else {
      dispatch(addToWishlist(property));
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const words = property.description.trim().split(' ');
  const truncatedDescription = words.slice(0, 4).join(' ');
  const remainingDescription = words.slice(4).join(' ');

  const images = property.images.map((image) => ({
    id: image.id,
    label: property.title,
    imgPath: image.image,
  }));

  const maxSteps = images.length;

  return (
    <Card
      className="property-card"
      sx={{
        maxWidth: 345,
        mb: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ecf0f1',
      }}
    >
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {images.length > 0 ? (
          <>
            <AutoPlaySwipeableViews
              axis="x"
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.id}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 255,
                        display: 'block',
                        maxWidth: 400,
                        overflow: 'hidden',
                        width: '100%',
                      }}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No images available
          </Typography>
        )}
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: 2,
        }}
      >
        <div style={{ flex: '1 1 auto' }}>
          <Typography variant="body2" color="text.secondary">
            {property.title}
          </Typography>
          <Typography variant="h6" component="div">
            {property.price} EGP/ month
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {expanded ? property.description : truncatedDescription}
            {!expanded && words.length > 4 && (
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', ml: 1 }}
                onClick={toggleExpanded}
              >
                Read More
              </Typography>
            )}
          </Typography>
          {expanded && words.length > 4 && (
            <Typography variant="body2" color="text.secondary">
              {remainingDescription}
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', ml: 1 }}
                onClick={toggleExpanded}
              >
                Read Less
              </Typography>
            </Typography>
          )}
        </div>
        <Divider sx={{ mb: 1, mt: 1 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 'auto' }}
          >
            <LocationOn fontSize="small" /> {property.location.city}
          </Typography>
          <IconButton
            onClick={handleWishlistToggle}
            color="error"
            sx={{ mt: 'auto' }}
          >
            {isWishlisted ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <Grid container spacing={5} sx={{ mt: -3 }}>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <Bed fontSize="small" /> {property.num_of_rooms}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <Bathtub fontSize="small" /> {property.num_of_bathrooms}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <SquareFoot fontSize="small" /> {property.area} sqm
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rentOrSell: PropTypes.string.isRequired,
    location_id: PropTypes.string.isRequired,
    num_of_rooms: PropTypes.number.isRequired,
    num_of_bathrooms: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PropertyCard;
