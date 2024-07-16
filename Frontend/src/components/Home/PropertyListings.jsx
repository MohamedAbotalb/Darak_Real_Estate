import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Alert, Box, Container } from '@mui/material';
import Slider from 'react-slick';
import { fetchProperties } from 'store/home/propertiesSlice';
import { fetchWishlist } from 'store/home/wishlistSlice';
import PropertyCard from 'components/Home/PropertyCard';
import Loader from 'components/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/system';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '.slider-container': {
    width: '100%',
    maxWidth: '1200px', /* Adjust according to your design */
    margin: '0 auto',
    padding: '0 20px', /* Adjust padding to center slides */
    overflow: 'hidden'
  },
  '.slick-slide': {
    padding: '0 15px', // Adjust the padding to add space between the cards
    boxSizing: 'border-box',
    height: '500px'
  },
  '.slick-list': {
    margin: '0 -15px', // Adjust the margin to compensate for the padding
  },
  '.slick-prev, .slick-next': {
    zIndex: 1,
    width: '50px', // Increase width to give some space
    height: '50px', // Increase height to give some space
  },
  '.slick-prev:before, .slick-next:before': {
    fontSize: '30px', // Adjust the arrow size
    color: '#2b3d4f', // Adjust the arrow color
  },
  '.slick-prev': {
    left: '-60px', // Adjust position of the left arrow
  },
  '.slick-next': {
    right: '-60px', // Adjust position of the right arrow
  },
}));

function PropertyListings({ type }) {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties[type] || []);
  const propertiesStatus = useSelector((state) => state.properties.status);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProperties({ type }));
  }, [dispatch, type]);

  if (propertiesStatus === 'loading') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Loader />
      </Grid>
    );
  }

  if (propertiesStatus === 'failed') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Alert severity="error">Error loading properties</Alert>
      </Grid>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box mx={{ xs: 2, sm: 4 }} px={{ xs: 2, sm: 4 }} py={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#2b3d4f', mb: '0' }}
        >
          Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
        </Typography>
        {propertiesStatus === 'failed' ? (
          <Typography variant="body1" align="center">
            No properties found for the selected category.
          </Typography>
        ) : (
          <StyledSlider {...settings}>
            {properties.map((property) => (
              <Box key={property.id} px={1} py={1}>
                <PropertyCard property={property} />
              </Box>
            ))}
          </StyledSlider>
        )}
      </Box>
    </Container>
  );
}

PropertyListings.propTypes = {
  type: PropTypes.oneOf(['rent', 'sell']).isRequired,
};

export default PropertyListings;
