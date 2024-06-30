import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { fetchProperty } from 'store/propertySlice';
import { submitTourRequest } from 'store/tourRequestSlice';

function TourRequestForm({ isOpen, onClose, propertyId }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tourRequest);

  const schema = yup.object().shape({
    dates: yup.array().of(yup.string().required('Date is required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dates: ['2024-07-01T09:00', '2024-07-01T09:00'],
    },
    resolver: async (data) => {
      try {
        await schema.validate(data, { abortEarly: false });
        return {
          values: data,
          errors: {},
        };
      } catch (validationErrors) {
        return {
          values: {},
          errors: validationErrors.inner.reduce((allErrors, currentError) => {
            return {
              ...allErrors,
              [currentError.path]: currentError.message,
            };
          }, {}),
        };
      }
    },
  });

  const onSubmit = async (data) => {
    dispatch(submitTourRequest({ propertyId, dates: data.dates }))
      .then(() => {
        dispatch(fetchProperty(propertyId));
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Request a Tour</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {['date1', 'date2'].map((fieldName, index) => (
              <Grid item xs={12} key={fieldName}>
                <Controller
                  name={`dates[${index}]`}
                  control={control}
                  render={({ field: { onChange, onBlur, onFocus, value } }) => (
                    <TextField
                      name={fieldName}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      label={`Date ${index + 1}`}
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors?.dates?.[index]}
                      helperText={errors?.dates?.[index]?.message}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errors.dates && <span>{errors.dates.message}</span>}
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          disabled={loading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TourRequestForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
};

export default TourRequestForm;
