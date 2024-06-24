import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import AddPropertyTypeButton from '../components/PropertyTypeComponent/AddPropertyTypeButton';
import PropertyTypeTable from '../components/PropertyTypeComponent/PropertyTypeTable';

function PropertyType() {
  return (
    <Container
      sx={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          px: 2,
          py: 2,
          backgroundColor: '#E8DFDE',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnIcon sx={{ mr: 1, color: 'black' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            Property Types
          </Typography>
        </Box>
        <AddPropertyTypeButton />
      </Box>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          p: 2,
        }}
      >
        <PropertyTypeTable />
      </Box>
    </Container>
  );
}

export default PropertyType;
