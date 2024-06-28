/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  RadioGroup,
  Radio,
  CardMedia,
  IconButton,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import governorates from 'assets/governorates.json';
import cities from 'assets/cities.json';
import { addProperty, clearState } from 'store/propertySlice';
import { fetchAmenities } from '../store/amenitiesSlice';
import { fetchPropertyTypes } from '../store/propertyTypesSlice';
import validationSchema from '../utils/validationSchema';

const FormWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f2f5',
  padding: '50px 0',
});

function AddProperty() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { amenities, status, error } = useSelector((state) => state.amenities);
  const { propertyTypes, status: propertyTypesStatus } = useSelector(
    (state) => state.propertyTypes
  );

  const [cityOptions, setCityOptions] = useState([]);
  const selectedState = watch('state');
  const selectedListingType = watch('listing_type');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const filteredCities = cities.filter(
        (city) => city.governorate_id === selectedState
      );
      setCityOptions(filteredCities);
      setValue('city', '');
    } else {
      setCityOptions([]);
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    dispatch(fetchAmenities());
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append other fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'amenities') {
        formData.append(key, value);
      }
    });

    // Append images
    if (data.images) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Append amenities as an array
    if (Array.isArray(data.amenities)) {
      data.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });
    }

    setIsSubmitting(true);
    dispatch(addProperty(formData));
  };

  useEffect(() => {
    if (isSubmitting) {
      if (status === 'succeeded') {
        toast.success('Property added successfully!');
        reset();
        setSelectedImages([]);
        dispatch(clearState());
        setIsSubmitting(false);
      }
      if (status === 'failed') {
        toast.error(error || 'Failed to add property!');
        dispatch(clearState());
        setIsSubmitting(false);
      }
    }
  }, [status, error, dispatch, reset, isSubmitting]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    setValue('images', [...selectedImages, ...files]);
  };

  return (
    <FormWrapper>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 5 }}>
        <Typography variant="h4" gutterBottom align="center" padding={3}>
          Add Property
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel id="state-label" htmlFor="state">
                    State
                  </InputLabel>
                  <Select
                    labelId="state-label"
                    id="state"
                    {...register('state')}
                    label="State"
                    defaultValue=""
                  >
                    {governorates.map((gov) => (
                      <MenuItem key={gov.id} value={gov.id}>
                        {gov.governorate_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <Typography color="error">
                      {errors.state.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.city}>
                  <InputLabel id="city-label" htmlFor="city">
                    City
                  </InputLabel>
                  <Select
                    labelId="city-label"
                    id="city"
                    {...register('city')}
                    label="City"
                    defaultValue=""
                    disabled={!selectedState}
                  >
                    {cityOptions.map((city) => (
                      <MenuItem key={city.id} value={city.city_name_en}>
                        {city.city_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && (
                    <Typography color="error">{errors.city.message}</Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Street"
                  id="street"
                  fullWidth
                  {...register('street')}
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Area"
                  type="number"
                  id="area"
                  fullWidth
                  {...register('area')}
                  error={!!errors.area}
                  helperText={errors.area?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.property_type_id}>
                  <InputLabel id="type-label" htmlFor="property_type_id">
                    Type
                  </InputLabel>
                  <Select
                    labelId="type-label"
                    id="property_type_id"
                    {...register('property_type_id')}
                    label="Type"
                    defaultValue=""
                  >
                    {propertyTypesStatus === 'loading' && (
                      <MenuItem value="" disabled>
                        Loading types...
                      </MenuItem>
                    )}
                    {propertyTypesStatus === 'failed' && (
                      <MenuItem value="" disabled>
                        Error loading types
                      </MenuItem>
                    )}
                    {propertyTypesStatus === 'succeeded' &&
                      propertyTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.type && (
                    <Typography color="error">{errors.type.message}</Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Rooms"
                  type="number"
                  id="num_of_rooms"
                  fullWidth
                  {...register('num_of_rooms')}
                  error={!!errors.num_of_rooms}
                  helperText={errors.num_of_rooms?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Bathrooms"
                  type="number"
                  id="num_of_bathrooms"
                  fullWidth
                  {...register('num_of_bathrooms')}
                  error={!!errors.num_of_bathrooms}
                  helperText={errors.num_of_bathrooms?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.amenities}>
                  <FormLabel component="legend">Amenities</FormLabel>
                  <FormGroup row>
                    {status === 'loading' && (
                      <Typography>Loading amenities...</Typography>
                    )}
                    {status === 'failed' && (
                      <Typography color="error">{error}</Typography>
                    )}
                    {status === 'succeeded' &&
                      amenities.map((amenity) => (
                        <FormControlLabel
                          key={amenity.id}
                          control={
                            <Checkbox
                              {...register('amenities')}
                              value={amenity.id}
                            />
                          }
                          label={amenity.name}
                          style={{ marginRight: 8 }}
                        />
                      ))}
                  </FormGroup>
                  {errors.amenities && (
                    <Typography color="error">
                      {errors.amenities.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.listing_type}>
                  <FormLabel component="legend">Listing Type</FormLabel>
                  <RadioGroup row defaultValue="Rent">
                    <FormControlLabel
                      value="renting"
                      {...register('listing_type')}
                      control={<Radio />}
                      label="Rent"
                    />
                    <FormControlLabel
                      value="selling"
                      {...register('listing_type')}
                      control={<Radio />}
                      label="Sell"
                    />
                  </RadioGroup>
                  {errors.listing_type && (
                    <Typography color="error">
                      {errors.listing_type.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={
                    selectedListingType === 'renting'
                      ? 'Price / month'
                      : 'Price'
                  }
                  type="number"
                  id="price"
                  fullWidth
                  {...register('price')}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Upload Images
                  </Button>
                </label>
                {selectedImages.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Selected Images:
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedImages.map((image) => (
                        <Grid item key={image.name} xs={4}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="100"
                              image={URL.createObjectURL(image)}
                              alt={image.name}
                            />
                          </Card>
                        </Grid>
                      ))}
                      <Grid item xs={4}>
                        <label htmlFor="image-upload">
                          <Card
                            sx={{
                              height: '100px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px dashed gray',
                            }}
                          >
                            <IconButton
                              color="primary"
                              aria-label="add more images"
                              component="span"
                            >
                              <AddIcon />
                            </IconButton>
                          </Card>
                        </label>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Add
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  onClick={() => setSelectedImages([])}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </FormWrapper>
  );
}

export default AddProperty;
