import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropertyCard from 'components/Home/PropertyCard';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Pagination,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function PropertyList() {
  const { t } = useTranslation();
  const { properties, status } = useSelector((state) => state.propertySearch);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // Pagination state
  const [page, setPage] = useState(1);
  let propertiesPerPage;

  if (isLargeScreen) {
    propertiesPerPage = 9;
  } else if (isMediumScreen) {
    propertiesPerPage = 6;
  } else {
    propertiesPerPage = 3;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calculate the paginated properties
  const startIndex = (page - 1) * propertiesPerPage;
  const paginatedProperties = properties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  if (status === 'loading') {
    return (
      <Box display="flex" height="100vh" justifyContent="center">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (status === 'failed' || properties.length === 0) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={4}
      >
        <Typography variant="h5" textAlign="center">
          {t('No properties found for these filters')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} px={8} justifyContent="center">
        {paginatedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Box display="flex" justifyContent="center">
              <PropertyCard property={property} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box my={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(properties.length / propertiesPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default PropertyList;
