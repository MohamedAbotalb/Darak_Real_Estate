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
import { useTranslation } from 'react-i18next';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '.slider-container': {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    overflow: 'hidden',
  },
  '.slick-slide': {
    padding: '0 15px',
    boxSizing: 'border-box',
    height: 'auto',
  },
  '.slick-list': {
    margin: '0 -15px',
  },
  '.slick-prev, .slick-next': {
    zIndex: 1,
    width: '50px',
    height: '50px',
  },
  '.slick-prev:before, .slick-next:before': {
    fontSize: '30px',
    color: '#ed2128',
  },
  '.slick-prev': {
    left: '-60px',
  },
  '.slick-next': {
    right: '-60px',
  },
}));

function PropertyListings({ type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties[type] || []);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
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
        <Alert severity="error">{t('Error loading properties')}</Alert>
      </Grid>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    // <Container >
    <Box mx={{ xs: 2, sm: 4 }} px={{ xs: 2, sm: 4 }} pt={1.5} pb={4} mt={5}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#000', mb: '30px' }}
      >
        {t('Latest Properties For')}{' '}
        <Typography
          component="span"
          variant="inherit"
          sx={{ color: '#ed2128' }}
        >
          {formattedType}
        </Typography>
      </Typography>
      {propertiesStatus === 'failed' ? (
        <Typography variant="body1" align="center">
          {t('No properties found for the selected category.')}
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
    // </Container>
  );
}

PropertyListings.propTypes = {
  type: PropTypes.oneOf(['rent', 'sell']).isRequired,
};

export default PropertyListings;
