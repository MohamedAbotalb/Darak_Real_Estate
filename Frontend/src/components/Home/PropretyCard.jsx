import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from 'store/home/wishlistSlice';
import { Link as RouterLink } from 'react-router-dom';
import defaultImage from 'assets/images/image1.jpg';

function PropertyCard({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const isWishlisted = wishlist.some((item) => item.id === property.id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(property.id));
    } else {
      dispatch(addToWishlist(property));
    }
  };

  const words = property.description.trim().split(' ');
  const truncatedDescription = words.slice(0, 4).join(' ');

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
        <img
          style={{
            height: 255,
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
            width: '100%',
          }}
          src={
            property.images.length > 0 ? property.images[0].image : defaultImage
          }
          alt={property.title}
        />
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
            {truncatedDescription}{' '}
            {words.length > 4 && (
              <RouterLink
                to={`/properties/${property.title}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                >
                  Read More
                </Typography>
              </RouterLink>
            )}
          </Typography>
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
