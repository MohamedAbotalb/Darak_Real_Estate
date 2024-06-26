import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import axios from '../../axiosConfig';

function ShowDetailsModal({ typeSlug, isOpen, handleClose }) {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (isOpen && typeSlug) {
      const fetchTypeDetails = async () => {
        try {
          const response = await axios.get(`/property-types/${typeSlug}`);
          setType(response.data);
        } catch (error) {
          toast.error('Failed to fetch property type details:');
        }
      };

      fetchTypeDetails();
    }
  }, [isOpen, typeSlug]);

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
        {type ? (
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
        ) : (
          <Typography variant="body2">Loading...</Typography>
        )}
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
