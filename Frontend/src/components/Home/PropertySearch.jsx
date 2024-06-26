// src/components/Home/PropertySearch.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyTypes } from '../../store/propertyTypesSlice';
import { fetchLocations } from '../../store/locationsSlice';
import { fetchProperties } from '../../store/propertiesSlice';
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const SearchContainer = styled(Box)(({ theme }) => ({
  // background: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  maxWidth: '800px',
  margin: '0 auto',
}));

const SearchSelect = styled(FormControl)(({ theme }) => ({
  minWidth: '200px',
  marginBottom: theme.spacing(1),
}));

const SearchButton = styled(Button)(({ theme }) => ({
  minWidth: '200px',
  height: '56px',
}));

const PropertySearch = () => {
  const dispatch = useDispatch();
  const propertyTypes = useSelector((state) => state.propertyTypes.data || []);
  const locations = useSelector((state) => state.locations.data || []);
  const [rentOrSell, setRentOrSell] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchProperties({ propertyType, locationId, rentOrSell }));
  };

  return (
    <SearchContainer>
      <SearchSelect variant="outlined">
        <InputLabel>Rent, Sell</InputLabel>
        <Select
          value={rentOrSell}
          onChange={(e) => setRentOrSell(e.target.value)}
          label="Rent, Sell"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
        </Select>
      </SearchSelect>

      <SearchSelect variant="outlined">
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
      </SearchSelect>

      <SearchSelect variant="outlined">
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
      </SearchSelect>

      <SearchButton
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Search
      </SearchButton>
    </SearchContainer>
  );
};

export default PropertySearch;