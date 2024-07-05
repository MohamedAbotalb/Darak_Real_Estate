import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPropertyTypeDetails } from 'store/propertyTypesSlice';
import Loader from 'components/Loader';

function ShowDetailsModal({ typeSlug, isOpen, handleClose }) {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.propertyTypes.propertyTypeDetails);
  const status = useSelector((state) => state.propertyTypes.status);

  useEffect(() => {
    if (isOpen && typeSlug) {
      dispatch(fetchPropertyTypeDetails(typeSlug));
    }
  }, [dispatch, isOpen, typeSlug]);

  const renderContent = () => {
    if (status === 'loading') {
      return <Loader />;
    }

    if (!type) {
      return <Typography variant="body2">No data available.</Typography>;
    }

    return (
      <>
        <Typography variant="body1" gutterBottom>
          Name: {type.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Properties:
        </Typography>
        {type.properties && type.properties.length > 0 ? (
          type.properties.map((property) => (
            <Card key={property.slug} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rooms: {property.num_of_rooms} | Bathrooms:{' '}
                  {property.num_of_bathrooms} | Area: {property.area} m²
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${property.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability: {property.availability}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Listing Type: {property.listing_type}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2">No properties available.</Typography>
        )}
      </>
    );
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          width: '50%',
          p: 4,
          margin: 'auto',
          mt: '5%',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Property Type Details
        </Typography>
        {renderContent()}
      </Box>
    </Modal>
  );
}

ShowDetailsModal.propTypes = {
  typeSlug: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ShowDetailsModal;
