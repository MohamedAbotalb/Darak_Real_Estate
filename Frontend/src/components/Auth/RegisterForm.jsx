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
import { clearState } from 'store/Auth/authSlice';
import { register } from 'store/Auth/authActions';
import useToggle from 'hooks/useToggle';
import RegisterSchema from 'components/Auth/Validation/RegisterSchema';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function RegisterForm() {
  const { t } = useTranslation(); // Initialize useTranslation hook
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

  const { isLoading, error, user, successMessage } = useSelector(
    (state) => state.auth
  );
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
    if (error) toast.error(error, { position: 'top-right' });
    if (successMessage) {
      toast.success(successMessage, { position: 'top-right' });
      navigate('/login');
    }
    return () => {
      dispatch(clearState());
    };
  }, [error, successMessage, user, navigate, dispatch]);

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
        {t('Register New Account')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box my={2}>
          <TextField
            label={t('First Name')}
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
            label={t('Last Name')}
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
            label={t('Email')}
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
            label={t('Password')}
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
            label={t('Confirm Password')}
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
            label={t('Phone Number')}
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
            label={t('I am a Landlord')}
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
          {t('Register')}
        </Button>
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          {t('Already Have an Account')}{' '}
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            {t('Login here')}
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default RegisterForm;
