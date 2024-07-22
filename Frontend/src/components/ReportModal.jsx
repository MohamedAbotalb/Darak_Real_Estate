import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from 'assets/images/report.svg';
import { useTranslation } from 'react-i18next';
import {
  submitPropertyReport,
  fetchPropertyReasons,
} from '../store/reportPropertiesSlice';
import {
  submitLandlordReport,
  fetchLandlordReasons,
} from '../store/reportUsersSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
};

const leftPanelStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '10px',
};

const rightPanelStyle = {
  flex: 1,
  padding: '20px',
};

const buttonStyle = {
  backgroundColor: '#ed4c6b',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  marginTop: '20px',
};

function ReportModal({ isOpen, onClose, propertyId, userData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { reasons: propertyReasons } = useSelector(
    (state) => state.reportProperties
  );
  const { reasons: landlordReasons } = useSelector(
    (state) => state.reportUsers
  );

  // Define the validation schema here
  const validationSchema = yup.object().shape({
    type: yup.string().required(t('Type is required')),
    reason: yup.string().required(t('Reason is required')),
    content: yup.string().required(t('Content is required')),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      type: '',
      reason: '',
      content: '',
    },
  });

  const selectedType = watch('type');
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedType === 'report-property') {
      dispatch(fetchPropertyReasons());
    } else if (selectedType === 'report-user') {
      dispatch(fetchLandlordReasons());
    }
  }, [dispatch, selectedType]);

  const onSubmit = async (data) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const reportData = {
      ...data,
      reason_id: data.reason,
    };
    console.log(reportData);

    try {
      if (data.type === 'report-property') {
        reportData.property_id = propertyId;
        await dispatch(submitPropertyReport(reportData));
      } else if (data.type === 'report-user') {
        reportData.landlord_id = userData.id;
        await dispatch(submitLandlordReport(reportData));
      }
      toast.success(t('Report submitted successfully'));
      reset();
      onClose();
    } catch (error) {
      toast.error(t('Failed to submit report'));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="report-modal-title"
        aria-describedby="report-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={leftPanelStyle}>
            <img src={img} alt="Report" width="60%" />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {t(
                'Sorry to hear there is a problem with this property. Please provide more details to solve this issue'
              )}
              .
            </Typography>
          </Box>
          <Box sx={rightPanelStyle}>
            <Typography
              id="report-modal-title"
              variant="h5"
              component="h2"
              sx={{ mb: 1, letterSpacing: '2px' }}
            >
              {t('SEND REPORT')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="user-type-label">
                  {t('Select report type')}
                </InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="user-type-label"
                      label={t('Select user type')}
                      {...field}
                      error={!!errors.type}
                    >
                      <MenuItem value="report-property">
                        {t('Report Property')}
                      </MenuItem>
                      <MenuItem value="report-user">
                        {t('Report Landlord')}
                      </MenuItem>
                    </Select>
                  )}
                />
                {errors.type && (
                  <Typography color="error">{errors.type.message}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="reason-label">{t('Select reason')}</InputLabel>
                <Controller
                  name="reason"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="reason-label"
                      label={t('Select reason')}
                      {...field}
                      disabled={!selectedType}
                      error={!!errors.reason}
                    >
                      {selectedType === 'report-property'
                        ? propertyReasons.map((reason) => (
                            <MenuItem key={reason.id} value={reason.id}>
                              {reason.reason}
                            </MenuItem>
                          ))
                        : landlordReasons.map((reason) => (
                            <MenuItem key={reason.id} value={reason.id}>
                              {reason.reason}
                            </MenuItem>
                          ))}
                    </Select>
                  )}
                />
                {errors.reason && (
                  <Typography color="error">{errors.reason.message}</Typography>
                )}
              </FormControl>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t('Type your message here...')}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.content}
                    helperText={errors.content ? errors.content.message : ''}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={buttonStyle}
                fullWidth
              >
                {t('Send Report')}
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

ReportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  propertyId: PropTypes.number,
  userData: PropTypes.shape({
    id: PropTypes.number,
  }),
};

ReportModal.defaultProps = {
  propertyId: null,
  userData: null,
};

export default ReportModal;
