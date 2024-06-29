import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { fetchProperties } from 'store/home/propertiesSlice';
import { fetchCategories } from 'store/home/categoriesSlice';
import { fetchWishlist } from 'store/home/wishlistSlice';
import PropertyCard from 'components/Home/PropertyCard';
import CategoryFilter from 'components/Home/CategoryFilter';

function PropertyListings({ type }) {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties[type] || []);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const categories = useSelector((state) => state.categories.list);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (category !== null) {
      dispatch(fetchProperties({ type, category }));
    } else {
      dispatch(fetchProperties({ type, category: 'all' }));
    }
  }, [dispatch, type, category]);

  if (propertiesStatus === 'loading' || categoriesStatus === 'loading') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (categoriesStatus === 'failed') {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Alert severity="error">Error loading categories</Alert>
      </Grid>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#2b3d4f' }}
      >
        Latest Properties For {type.charAt(0).toUpperCase() + type.slice(1)}
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <CategoryFilter
          categories={categories}
          setCategory={setCategory}
          initialCategory={category}
        />
      </Box>
      {propertiesStatus === 'failed' ? (
        <Typography variant="body1" align="center">
          No properties found for the selected category.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Box display="flex" justifyContent="center">
                <PropertyCard property={property} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

PropertyListings.propTypes = {
  type: PropTypes.oneOf(['rent', 'sell']).isRequired,
};

export default PropertyListings;
