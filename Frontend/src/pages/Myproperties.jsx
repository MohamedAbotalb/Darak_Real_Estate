import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropertyCard from 'components/Home/PropertyCard';

function MyProperties() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, isLoading } = useSelector((state) => state.property);

  React.useEffect(() => {}, [dispatch]);

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const handleDeleteProperty = () => {};

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">My Properties</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProperty}
        >
          Add New Property
        </Button>
      </Box>
      <Grid container spacing={4}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <PropertyCard property={property} />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditProperty(property.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteProperty(property.id)}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default MyProperties;
