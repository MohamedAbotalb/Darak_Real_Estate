import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    title: yup
      .string()
      .required(t('Title is required'))
      .min(10, t('Title must be at least 10 characters')),
    description: yup
      .string()
      .required(t('Description is required'))
      .min(20, t('Description must be at least 20 characters')),
    state: yup
      .string()
      .typeError(t('State is required'))
      .required(t('State is required')),
    city: yup
      .string()
      .typeError(t('City is required'))
      .required(t('City is required')),
    street: yup.string().required(t('Street is required')),
    area: yup
      .number()
      .typeError(t('Area is required'))
      .required(t('Area is required'))
      .positive(t('Area must be positive')),
    price: yup
      .number()
      .typeError(t('Price is required'))
      .required(t('Price is required'))
      .positive(t('Price must be positive')),
    property_type_id: yup
      .string()
      .typeError(t('Type is required'))
      .required(t('Type is required')),
    num_of_rooms: yup
      .number()
      .typeError(t('Number of rooms is required'))
      .required(t('Number of rooms is required'))
      .positive(t('Must be positive'))
      .integer(t('Must be an integer')),
    num_of_bathrooms: yup
      .number()
      .typeError(t('Number of bathrooms is required'))
      .required(t('Number of bathrooms is required'))
      .positive(t('Must be positive'))
      .integer(t('Must be an integer')),
    amenities: yup
      .array()
      .of(yup.string())
      .typeError(t('Amenities are required'))
      .required(t('Amenities are required')),
    listing_type: yup.string().required(t('Listing Type is required')),
    images: yup
      .mixed()
      .test(
        'required',
        t('At least one image is required'),
        (value) => value && value.length > 0
      ),
  });
};

export default useValidationSchema;
