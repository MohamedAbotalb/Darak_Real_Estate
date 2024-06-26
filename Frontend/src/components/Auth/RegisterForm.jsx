import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { register, clearState } from 'store/authSlice';
import useToggle from 'hooks/useToggle';
import RegisterSchema from 'components/Auth/Validation/RegisterSchema';
import SocialButtons from 'components/Auth/SocialButtons';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const { isLoading, error, token, successMessage } = useSelector(
    (state) => state.auth
  );
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

  useEffect(() => {
    if (token) navigate('/');
    if (error) toast.error(error, { position: 'top-right' });
    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      navigate('/login');
    }
    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, token, navigate, dispatch]);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      first_name: data.firstName,
      last_name: data.lastName,
      password_confirmation: data.passwordConfirmation,
      phone_number: data.phoneNumber,
    };
    dispatch(register(formData));
  };

  const handleRoleChange = (event) => {
    setValue('role', event.target.checked ? 'landlord' : 'user');
  };

  return (
    <Container sx={{ my: 10 }}>
      <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
        Register New Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box my={2}>
          <TextField
            label="First Name"
            {...registerForm('firstName')}
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Last Name"
            {...registerForm('lastName')}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            {...registerForm('email')}
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            {...registerForm('password')}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            {...registerForm('passwordConfirmation')}
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Phone Number"
            {...registerForm('phoneNumber')}
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleRoleChange}
                {...registerForm('role')}
                value="landlord"
              />
            }
            label="I am a Landlord"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: 40 }}
          disabled={isLoading}
        >
          Register
        </Button>
        <Typography sx={{ my: 3, textAlign: 'center', color: 'gray' }}>
          OR
        </Typography>
        <SocialButtons />
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Login here
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default RegisterForm;
