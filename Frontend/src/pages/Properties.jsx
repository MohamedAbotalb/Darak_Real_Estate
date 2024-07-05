import React from 'react';
import { Box } from '@mui/material';
import SearchForm from 'components/PropertySearch/SearchForm';
import PropertyList from 'components/PropertySearch/PropertyList';

function PropertiesPage() {
  return (
    <Box>
      <SearchForm />
      <PropertyList />
    </Box>
  );
}

export default PropertiesPage;
