import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AddToWishlistButton from 'components/Home/AddToWishlistButton';

const StyledCard = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
});

const SliderWrapper = styled(Box)({
  position: 'relative',
});

const StyledImage = styled('img')({
  height: 250,
  width: '100%',
  objectFit: 'cover',
});

const WishlistButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 2,
  backgroundColor: 'white',
  borderRadius: '50%',
});

const CardLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  flexGrow: 1,
});

function PropertyCard({ property }) {
  const images = property.images || [];
  const defaultImage = 'bedroom1.jpg';
  const getPriceDisplay = () => {
    const formattedPrice = property.price.toLocaleString();
    if (property.listing_type === 'rent') {
      return `${formattedPrice} EGP/month`;
    }
    return `${formattedPrice} EGP`;
  };
  const baseImgUrl = 'http://127.0.0.1:8000/';
  return (
    <StyledCard>
      <SliderWrapper>
        <Carousel showThumbs={false} showStatus={false}>
          {images.length > 0 ? (
            images.map((img) => (
              <StyledImage key={img.id} src={baseImgUrl+img.image} alt={property.title} />
            ))
          ) : (
            <StyledImage src={defaultImage} alt={property.title} />
          )}
        </Carousel>
        <WishlistButtonWrapper>
          <AddToWishlistButton property={property} />
        </WishlistButtonWrapper>
      </SliderWrapper>
      <CardContent style={{ height: '100%' }}>
        <CardLink to={`/properties/${property.slug}`}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary" mb={1}>
              {property.property_type.name}
            </Typography>
          </Box>
          <Typography gutterBottom variant="h5" component="div" mb={1}>
            {getPriceDisplay()}
          </Typography>
          {/* <Typography variant="body2">{property.title}</Typography> */}
          <Typography variant="body2" color="text.secondary" style={{ overflowWrap: 'break-word' }}>
            {property.title.split(' ').slice(0, 4).join(' ')}
            {property.title.split(' ').length > 4 ? '...' : ''}
          </Typography>

          <Box display="flex" alignItems="center" my={1}>
            <LocationOnIcon color="action" />
            <Typography variant="body2" color="text.secondary" ml={0.5}>
             {property.location.state},{' '}
              {property.location.city}
            </Typography>
          </Box>
          <Box display="flex">
            <Box display="flex" alignItems="center" mr={2}>
              <BedIcon color="action" />
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                {property.num_of_rooms}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mx={2}>
              <BathtubIcon color="action" />
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                {property.num_of_bathrooms}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={2}>
              <SquareFootIcon color="action" />
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                {Number.parseInt(property.area, 10)} sqm
              </Typography>
            </Box>
          </Box>
        </CardLink>
      </CardContent>
    </StyledCard>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    listing_type: PropTypes.string.isRequired,
    property_type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location_id: PropTypes.string.isRequired,
    num_of_rooms: PropTypes.number.isRequired,
    num_of_bathrooms: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default PropertyCard;
