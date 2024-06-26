// src/components/PropertySearch.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyTypes } from '../store/propertyTypesSlice';
import { fetchLocations } from '../store/locationsSlice';
import { fetchProperties } from '../store/propertiesSlice';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PropertySearch = () => {
  const dispatch = useDispatch();
  const propertyTypes = useSelector((state) => state.propertyTypes.data || []);
  const locations = useSelector((state) => state.locations.data || []);
  const [propertyType, setPropertyType] = useState('');
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchProperties({ propertyType, locationId }));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} padding={2}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Property Type</InputLabel>
        <Select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          label="Property Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {propertyTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          label="Location"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
  );
};

export default PropertySearch;
