import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { fetchOldProperty } from 'store/propertyupdateSlice';
import Loader from 'components/Loader';

function PropertyUpdateDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const oldProperty = useSelector(
    (state) =>
      state.propertyUpdates.updates.find((update) => update.id === Number(id))
        ?.oldProperty
  );

  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(fetchOldProperty(id));
      setLoading(false);
    };

    fetchDetails();
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 8, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Property Update Details
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Old Data</Typography>
        <Divider sx={{ mb: 2 }} />
        {oldProperty ? (
          <Box>
            <Typography>
              <strong>Title:</strong> {oldProperty.title}
            </Typography>
            <Typography>
              <strong>Description:</strong> {oldProperty.description}
            </Typography>
            <Typography>
              <strong>Rooms:</strong> {oldProperty.num_of_rooms}
            </Typography>
            <Typography>
              <strong>Bathrooms:</strong> {oldProperty.num_of_bathrooms}
            </Typography>
            <Typography>
              <strong>Area:</strong> {oldProperty.area} sqft
            </Typography>
            <Typography>
              <strong>Price:</strong> ${oldProperty.price}
            </Typography>
            <Typography>
              <strong>Availability:</strong> {oldProperty.availability}
            </Typography>
            <Typography>
              <strong>Listing Type:</strong> {oldProperty.listing_type}
            </Typography>
            <Typography>
              <strong>Images:</strong>
            </Typography>
            <Box>
              {oldProperty.images.map((image) => (
                <img
                  key={image.id}
                  src={image.image}
                  alt={`Property ${image.id}`}
                  style={{ maxWidth: '100%', marginBottom: '10px' }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Typography>No old data available</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default PropertyUpdateDetails;
