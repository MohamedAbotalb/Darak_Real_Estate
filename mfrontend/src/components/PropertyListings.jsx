import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchProperties } from '../store/propertiesSlice';
import { fetchCategories } from '../store/categoriesSlice';
import PropertyCard from './PropretyCard';
import CategoryFilter from './CategoryFilter';

function PropertyListings({ type }) {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties[type] || []);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const categories = useSelector((state) => state.categories.list);
  const categoriesStatus = useSelector((state) => state.categories.status);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category !== null) {
      dispatch(fetchProperties({ type, category }));
    } else {
      dispatch(fetchProperties({ type, category: 'all' }));
    }
  }, [dispatch, type, category]);

  if (propertiesStatus === 'loading' || categoriesStatus === 'loading') {
    return <CircularProgress />;
  }

  if (propertiesStatus === 'failed' || categoriesStatus === 'failed') {
    return <Alert severity="error">Error loading data</Alert>;
  }

  // Check if properties is not an array
  if (!Array.isArray(properties)) {
    return <Alert severity="error">Error: Properties data is not an array.</Alert>;
  }

  return (
    <div className="property-listings">
      <Typography variant="h4" gutterBottom>
        Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
      </Typography>
      <CategoryFilter categories={categories} setCategory={setCategory} />
      <Grid container spacing={2} justifyContent="center">
        {properties.slice(0, 3).map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

PropertyListings.propTypes = {
  type: PropTypes.oneOf(['rent', 'sell']).isRequired,
};

export default PropertyListings;
