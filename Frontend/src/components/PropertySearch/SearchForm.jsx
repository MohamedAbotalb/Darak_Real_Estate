import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';
import Loader from 'components/Loader';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  margin: '20px auto',
}));

const SearchFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '130px',
  marginRight: theme.spacing(1),
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
  },
}));

const SearchButton = styled(IconButton)({
  height: '56px',
  width: '56px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
});

function PropertySearch() {
  const dispatch = useDispatch();
  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const locations = useSelector((state) => state.locations.data || []);
  const locationsStatus = useSelector((state) => state.locations.status);
  const propertyTypesStatus = useSelector(
    (state) => state.propertyTypes.status
  );

  const [rentOrBuy, setRentOrBuy] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const isLoading =
    locationsStatus === 'loading' || propertyTypesStatus === 'loading';

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchProperties({
        propertyType,
        city,
        listingType: rentOrBuy,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice,
      })
    );
  };

  return (
    <SearchContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchFormControl variant="outlined">
            <Select
              value={rentOrBuy}
              onChange={(e) => setRentOrBuy(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Rent, Buy</em>
              </MenuItem>
              <MenuItem value="renting">Rent</MenuItem>
              <MenuItem value="selling">Buy</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl variant="outlined">
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Location</em>
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.city}>
                  {location.city}
                </MenuItem>
              ))}
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Property Type</em>
              </MenuItem>
              {propertyTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Bedrooms</em>
              </MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Bathrooms</em>
              </MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Min Price</em>
              </MenuItem>
              <MenuItem value="100000">100,000</MenuItem>
              <MenuItem value="200000">200,000</MenuItem>
              <MenuItem value="300000">300,000</MenuItem>
              <MenuItem value="400000">400,000</MenuItem>
              <MenuItem value="500000">500,000</MenuItem>
              <MenuItem value="1000000">1,000,000</MenuItem>
              <MenuItem value="2000000">2,000,000</MenuItem>
              <MenuItem value="5000000">5,000,000</MenuItem>
              <MenuItem value="10000000">10,000,000</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Max Price</em>
              </MenuItem>
              <MenuItem value="100000">100,000</MenuItem>
              <MenuItem value="200000">200,000</MenuItem>
              <MenuItem value="300000">300,000</MenuItem>
              <MenuItem value="400000">400,000</MenuItem>
              <MenuItem value="500000">500,000</MenuItem>
              <MenuItem value="1000000">1,000,000</MenuItem>
              <MenuItem value="2000000">2,000,000</MenuItem>
              <MenuItem value="5000000">5,000,000</MenuItem>
              <MenuItem value="10000000">10,000,000</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchButton
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            <SearchIcon />
          </SearchButton>
        </>
      )}
    </SearchContainer>
  );
}

export default PropertySearch;
