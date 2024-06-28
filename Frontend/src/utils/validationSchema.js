// src/validationSchema.js

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(10, 'Title must be at least 10 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street is required'),
  area: yup
    .number()
    .required('Area is required')
    .positive('Area must be positive'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  property_type_id: yup.string().required('Type is required'),
  num_of_rooms: yup
    .number()
    .required('Number of rooms is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
  num_of_bathrooms: yup
    .number()
    .required('Number of bathrooms is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
  amenities: yup.array().of(yup.string()),
  listing_type: yup.string().required('Listing Type is required'),
  images: yup
    .mixed()
    .test(
      'required',
      'At least one image is required',
      (value) => value && value.length > 0
    ),
});

export default validationSchema;
