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
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPropertyTypeDetails } from 'store/propertyTypesSlice';
import Loader from 'components/Loader';
import 'assets/css/PropDetails.css';

function ShowDetailsModal({ typeSlug, isOpen, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const type = useSelector((state) => state.propertyTypes.propertyTypeDetails);
  const status = useSelector((state) => state.propertyTypes.status);

  const handleViewDetails = (slug) => {
    navigate(`/properties/${slug}`);
  };

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
        <Typography
          variant="body1"
          gutterBottom
          className="propertyName"
          sx={{ textAlign: 'center', fontSize: '18px' }}
        >
          <span
            style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}
          >
            Type:
          </span>{' '}
          {type.name}
        </Typography>
        {/* <Typography variant="h6" gutterBottom>
          Properties:
        </Typography> */}
        {type.properties && type.properties.length > 0 ? (
          type.properties.map((property) => (
            <Card
              key={property.slug}
              className="element"
              sx={{
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    Rooms:
                  </span>{' '}
                  <span className="descSpan">{property.description}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    Rooms:
                  </span>{' '}
                  <span className="descSpan"> {property.num_of_rooms}</span>|{' '}
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    {' '}
                    Bathrooms:
                  </span>{' '}
                  <span className="descSpan">
                    {property.num_of_bathrooms}
                  </span>{' '}
                  |
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    {' '}
                    Area:
                  </span>{' '}
                  <span className="descSpan">{property.area} m²</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    Price:
                  </span>{' '}
                  <span className="descSpan"> ${property.price}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    Availability:
                  </span>{' '}
                  <span className="descSpan">{property.availability}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span
                    style={{
                      color: '#0075ff',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '16px',
                    }}
                  >
                    Listing Type:
                  </span>{' '}
                  <span className="descSpan">{property.listing_type}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className="detailButton"
                  onClick={() => handleViewDetails(property.slug)}
                >
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
        <Typography variant="h6" gutterBottom className="propDetails">
          Properties
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
