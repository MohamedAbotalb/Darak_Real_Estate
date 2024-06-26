import * as Yup from 'yup';

export default Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'First Name should be more than 2 characters')
    .matches(
      /^[A-Za-z]+$/,
      'First Name should contain only alphabetic characters'
    ),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(3, 'Last Name should be more than 2 characters')
    .matches(
      /^[A-Za-z]+$/,
      'Last Name should contain only alphabetic characters'
    ),
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(
      /^01[0125][0-9]{8}$/,
      'Phone Number must be a valid Egyptian phone number'
    ),
  role: Yup.string().required('Role is required').oneOf(['user', 'landlord']),
});
