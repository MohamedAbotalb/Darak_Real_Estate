import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn, Bed, Bathtub, SquareFoot } from '@mui/icons-material';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import './PropertyCard.css'; // Additional custom styles if needed

function PropertyCard({ property }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const isWishlisted = wishlist.some((item) => item.id === property.id);

  const [expanded, setExpanded] = useState(false);

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

  // Determine if "Read More" link should be shown
  // const showReadMore = property.description.length > 10; // Adjust the length threshold as needed
  // Truncate description by words
  const words = property.description.trim().split(' ');
  const truncatedDescription = words.slice(0, 4).join(' ');
  const remainingDescription = words.slice(9).join(' ');
  
  return (
    <Card className="property-card" sx={{ maxWidth: 345, m: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={property.image}
        alt={property.title}
      />
      <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', pb: 2 }}>
        <div style={{ flex: '1 1 auto' }}>
          <Typography variant="body2" color="text.secondary">
            {property.title}
          </Typography>
          <Typography variant="h6" component="div">
            {property.price} EGP {property.rentOrSell === 'rent' ? '/ month' : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
          <LocationOn fontSize="small" /> {property.location_id}
          <hr></hr>
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
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
        <IconButton
          onClick={handleWishlistToggle}
          color="error"
          sx={{ alignSelf: 'flex-end', mt: 1 }}
        >
          {isWishlisted ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rentOrSell: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default PropertyCard;
