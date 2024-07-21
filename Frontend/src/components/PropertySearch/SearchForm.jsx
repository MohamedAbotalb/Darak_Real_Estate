import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { errorToast } from 'utils/toast';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/propertySearchSlice';
import Loader from 'components/Loader';

const SearchContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '80px auto',
}));

const SearchFormControl = styled(FormControl)(() => ({
  minWidth: '100px',
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
  backgroundColor: 'var(--primary-color)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'var(--primary-color)',
  },
});

function SearchForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { propertyTypes } = useSelector((state) => state.propertyTypes || []);
  const typesStatus = useSelector((state) => state.propertyTypes.status);

  const [listingType, setListingType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propLocation, setPropLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const isLoading = typesStatus === 'loading';

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());

    // Set the component state according to URL parameters
    const urlParams = new URLSearchParams(location.search);
    const lt = urlParams.get('lt') || '';
    const pt = urlParams.get('pt') || '';
    const pl = urlParams.get('pl') || '';
    const bdr = urlParams.get('bdr') || '';
    const btr = urlParams.get('btr') || '';
    const mnp = urlParams.get('mnp') || '';
    const mxp = urlParams.get('mxp') || '';

    setListingType(lt);
    setPropertyType(pt);
    setPropLocation(pl);
    setBedrooms(bdr);
    setBathrooms(btr);
    setMinPrice(mnp);
    setMaxPrice(mxp);

    // Fetch properties based on URL parameters
    dispatch(
      fetchProperties({
        propertyType: pt,
        propLocation: pl,
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
      errorToast(t('Min price should be less than or equal to max price'));
      return;
    }

    // Create query object with only the chosen filters
    const query = {};
    if (listingType) query.lt = listingType;
    if (propertyType) query.pt = propertyType;
    if (propLocation) query.pl = propLocation;
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
        propLocation,
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
            <TextField
              value={propLocation}
              onChange={(e) => setPropLocation(e.target.value)}
              placeholder={t('State, City or Street')}
              variant="outlined"
            />
          </SearchFormControl>

          <SearchFormControl variant="outlined">
            <Select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>{t('Rent, Buy')}</em>
              </MenuItem>
              <MenuItem value="rent">{t('Rent')}</MenuItem>
              <MenuItem value="buy">{t('Buy')}</MenuItem>
            </Select>
          </SearchFormControl>

          <SearchFormControl>
            <Select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>{t('Property Type')}</em>
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
                <em>{t('Bedrooms')}</em>
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
                <em>{t('Bathrooms')}</em>
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
                <em>{t('Min Price')}</em>
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
                <em>{t('Max Price')}</em>
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
