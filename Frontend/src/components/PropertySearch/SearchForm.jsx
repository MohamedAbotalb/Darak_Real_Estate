import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';
import Loader from 'components/Loader';

const SearchContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '20px auto',
}));

const SearchFormControl = styled(FormControl)(() => ({
  minWidth: '120px',
  marginRight: '10px',
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
  },
}));

const SearchButton = styled(IconButton)({
  height: '56px',
  width: '56px',
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

function SearchForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const locations = useSelector((state) => state.locations.data || []);
  const locationsStatus = useSelector((state) => state.locations.status);
  const typesStatus = useSelector((state) => state.propertyTypes.status);

  const [listingType, setListingType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const isLoading = locationsStatus === 'loading' || typesStatus === 'loading';

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());

    // Set the component state according to URL parameters
    const urlParams = new URLSearchParams(location.search);
    const lt = urlParams.get('lt') || '';
    const pt = urlParams.get('pt') || '';
    const c = urlParams.get('c') || '';
    const bdr = urlParams.get('bdr') || '';
    const btr = urlParams.get('btr') || '';
    const mnp = urlParams.get('mnp') || '';
    const mxp = urlParams.get('mxp') || '';

    setListingType(lt);
    setPropertyType(pt);
    setCity(c);
    setBedrooms(bdr);
    setBathrooms(btr);
    setMinPrice(mnp);
    setMaxPrice(mxp);

    // Fetch properties based on URL parameters
    dispatch(
      fetchProperties({
        propertyType: pt,
        city: c,
        listingType: lt,
        bedrooms: bdr,
        bathrooms: btr,
        minPrice: mnp,
        maxPrice: mxp,
      })
    );
  }, [dispatch, location.search]);

  const handleSearch = () => {
    if (parseInt(minPrice, 10) > parseInt(maxPrice, 10)) {
      toast.error('Min price should be less than or equal to max price');
      return;
    }

    // Create query object with only the chosen filters
    const query = {};
    if (listingType) query.lt = listingType;
    if (propertyType) query.pt = propertyType;
    if (city) query.c = city;
    if (bedrooms) query.bdr = bedrooms;
    if (bathrooms) query.btr = bathrooms;
    if (minPrice) query.mnp = minPrice;
    if (maxPrice) query.mxp = maxPrice;

    // Convert query object to URL parameters
    const searchParams = new URLSearchParams(query).toString();

    // Update URL with search parameters
    navigate({
      pathname: '/properties',
      search: searchParams,
    });

    // Fetch properties based on filters
    dispatch(
      fetchProperties({
        propertyType,
        city,
        listingType,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice,
      })
    );
  };

  // Price options based on listingType selection
  const rentPriceOptions = [
    5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 70000, 80000,
    90000, 100000,
  ];

  const buyPriceOptions = [
    100000, 200000, 300000, 400000, 500000, 1000000, 2000000, 5000000, 10000000,
    30000000,
  ];

  const priceOptions =
    listingType === 'rent' ? rentPriceOptions : buyPriceOptions;

  // Filtered price options based on minPrice and maxPrice
  const filteredMinPriceOptions = priceOptions.filter(
    (price) => !maxPrice || price <= parseInt(maxPrice, 10)
  );

  const filteredMaxPriceOptions = priceOptions.filter(
    (price) => !minPrice || price >= parseInt(minPrice, 10)
  );

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
  };

  return (
    <SearchContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchFormControl variant="outlined">
            <Select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Rent, Buy</em>
              </MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="buy">Buy</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl variant="outlined">
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
            >
              <MenuItem value="">
                <em>Location</em>
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.city}>
                  {loc.city}
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
              <MenuItem value="">
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
              MenuProps={menuProps}
            >
              <MenuItem value="">
                <em>Bedrooms</em>
              </MenuItem>
              {[1, 2, 3, 4, 5, 6, 7].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
              <MenuItem value="+7">7+</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
            >
              <MenuItem value="">
                <em>Bathrooms</em>
              </MenuItem>
              {[1, 2, 3, 4, 5, 6, 7].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
              <MenuItem value="+7">7+</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
            >
              <MenuItem value="">
                <em>Min Price</em>
              </MenuItem>
              {filteredMinPriceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  {price.toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
            >
              <MenuItem value="">
                <em>Max Price</em>
              </MenuItem>
              {filteredMaxPriceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  {price.toLocaleString()}
                </MenuItem>
              ))}
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

export default SearchForm;
