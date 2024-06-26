import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchPropertyTypes } from '../../store/propertyTypesSlice';
import { fetchLocations } from '../../store/locationsSlice';
import { fetchProperties } from '../../store/propertiesSlice';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2), // Adjust the gap between items if needed
  flexWrap: 'wrap',
  maxWidth: '800px',
  margin: '0 auto',
}));

const SearchFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '200px',
  marginBottom: theme.spacing(1), // Adjust margin bottom as needed
  marginRight: theme.spacing(1), // Adjust margin right as needed
}));

const SearchButton = styled(Button)(({ theme }) => ({
  minWidth: '200px',
  height: '56px',
  flex: '0 0 auto', // Ensure button doesn't grow
}));

function PropertySearch() {
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
    console.log('Before dispatching fetchProperties:');
    console.log('rentOrSell:', rentOrSell);
    console.log('propertyType:', propertyType);
    console.log('locationId:', locationId);
    dispatch(fetchProperties({ propertyType, locationId, rentOrSell }));
  };

  return (
    <SearchContainer>
      <SearchFormControl variant="outlined">
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
      </SearchFormControl>

      <SearchFormControl variant="outlined">
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
      </SearchFormControl>

      <SearchFormControl variant="outlined">
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
      </SearchFormControl>

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
}

export default PropertySearch;
