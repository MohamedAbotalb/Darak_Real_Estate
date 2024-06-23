import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Fab,
  Divider,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

import { fetchProperty } from '../store/propertySlice';

function PropertyDetails({ match }) {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.property);
  const status = useSelector((state) => state.property.status);
  const error = useSelector((state) => state.property.error);

  useEffect(() => {
    const { slug } = match.params;
    dispatch(fetchProperty(slug));
  }, [dispatch, match.params]);

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

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
        position: 'relative',
      }}
    >
      <Card
        sx={{ width: '100%', maxWidth: '800px', mt: 4, position: 'relative' }}
      >
        <Fab
          disabled
          aria-label="like"
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
          }}
        >
          <FavoriteIcon />
        </Fab>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="property-image">
                {property.images && (
                  <Carousel
                    navButtonsAlwaysVisible
                    indicators={false}
                    animation="slide"
                  >
                    {property.images.map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={`Property ${property.title}`}
                        style={{ width: '100%', marginBottom: '10px' }}
                      />
                    ))}
                  </Carousel>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">{property.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {property.description}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <BedIcon sx={{ mr: 1 }} />
                Rooms: {property.num_of_rooms}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <BathtubIcon sx={{ mr: 1 }} />
                Bathrooms: {property.num_of_bathrooms}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <AspectRatioIcon sx={{ mr: 1 }} />
                Area: {property.area} sq.ft
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <PriceCheckIcon sx={{ mr: 1 }} />
                Price: {property.price} EGP / month
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <EventAvailableIcon sx={{ mr: 1 }} />
                Availability: {property.availability}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" display="flex" alignItems="center">
                <HomeWorkIcon sx={{ mr: 1 }} />
                Listing: {property.listing_type}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Request a Tour
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
