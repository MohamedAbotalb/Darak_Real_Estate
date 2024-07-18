import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultImage from 'assets/images/image1.jpg';
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '16px auto',
  borderRadius: '16px',
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
  height: 300,
  width: '100%',
  objectFit: 'cover',
});

const ActionButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 1,
  backgroundColor: 'white',
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const CardLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  flexGrow: 1,
});

function PropertyCard({ property, onEdit, onDelete }) {
  const { t } = useTranslation();
  const images = property.images || [];

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getPriceDisplay = () => {
    if (property.listing_type === 'renting') {
      return `${formatPrice(property.price)} ${t('EGP/month')}`;
    }
    return `${formatPrice(property.price)} ${t('EGP')}`;
  };

  return (
    <StyledCard>
      <SliderWrapper>
        <ActionButtonWrapper>
          <IconButton size="small" onClick={onEdit}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </ActionButtonWrapper>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          infiniteLoop
          autoPlay
          interval={2000}
        >
          {images.length > 0 ? (
            images.map((img) => (
              <StyledImage
                key={img.id}
                src={`http://127.0.0.1:8000/${img.image}`}
                alt={property.title}
              />
            ))
          ) : (
            <StyledImage src={defaultImage} alt={property.title} />
          )}
        </Carousel>
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
          <Typography gutterBottom variant="h5" component="div" mb={2}>
            {getPriceDisplay()}
          </Typography>
          <Typography variant="body2">{property.title}</Typography>
          <Box display="flex" alignItems="center" my={4}>
            <LocationOnIcon color="action" />
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              {property.location.street}, {property.location.state},{' '}
              {property.location.city}
            </Typography>
          </Box>
          <Box display="flex" mt={2}>
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
                {Number.parseInt(property.area, 10)} {t('sqm')}
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PropertyCard;
