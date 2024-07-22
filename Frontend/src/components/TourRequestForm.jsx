import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';
import formatDate from 'utils/formatDate';
import { fetchProperty } from 'store/propertySlice';
import { submitTourRequest } from 'store/tourRequestSlice';
import { format, addDays } from 'date-fns';

function TourRequestForm({ isOpen, onClose, propertyId, slug }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tourRequest);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [dateInputs, setDateInputs] = useState([
    { id: Date.now(), value: format(new Date(), "yyyy-MM-dd'T'HH:mm") },
  ]);

  const schema = yup.object().shape({
    dates: yup
      .array()
      .of(yup.string().required(t('Date is required')))
      .test('unique', t('Dates must be unique'), (dates) => {
        const uniqueDates = new Set(dates);
        return uniqueDates.size === dates.length;
      }),
  });

  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const twoWeeksFromNow = format(addDays(new Date(), 14), "yyyy-MM-dd'T'HH:mm");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dates: [today],
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
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            };
          }, {}),
        };
      }
    },
  });

  const addDateInput = () => {
    if (dateInputs.length < 3) {
      setDateInputs([...dateInputs, { id: Date.now(), value: today }]);
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const formattedDates = data.dates.map(formatDate);
    try {
      await dispatch(
        submitTourRequest({ propertyId, dates: formattedDates })
      ).unwrap();
      dispatch(fetchProperty(slug));
      onClose();
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t('Request a Tour')}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {dateInputs.map((input, index) => (
              <Grid item xs={12} key={input.id}>
                <Controller
                  name={`dates[${index}]`}
                  control={control}
                  defaultValue={input.value}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      name={`dates[${index}]`}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      label={`${t('Date')} ${index + 1}`}
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: today,
                        max: twoWeeksFromNow,
                      }}
                      error={!!errors.dates?.[index]}
                      helperText={errors.dates?.[index]?.message}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>

          {dateInputs.length < 3 && (
            <Button
              onClick={addDateInput}
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {t('Add another date')}
            </Button>
          )}
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errors.dates && <span>{errors.dates.message}</span>}
          </Typography>
          {submitError && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {submitError}
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          {t('Cancel')}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          disabled={loading}
        >
          {t('Submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TourRequestForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TourRequestForm;
