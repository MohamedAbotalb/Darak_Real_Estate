import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLandlordNotificationsAsync,
  approveDateAsync,
  declineTourAsync,
  deleteNotificationAsync,
} from 'store/Notifications/notificationsSlice';
import {
  Box,
  List,
  ListItem,
  Avatar,
  Button,
  Typography,
  Divider,
  Radio,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  IconButton,
  Paper,
  TextField
} from '@mui/material';
import {
  CheckCircleOutline as ApproveIcon,
  HighlightOff as DeclineIcon,
} from '@mui/icons-material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import { red, grey } from '@mui/material/colors';
import moment from 'moment';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
// import defaultImage from 'logo.jpg';

const getNotificationCircleColor = (type) => {
  switch (type) {
    case 'declined':
      return '#FFCCCC';
    case 'approved':
      return '#CCFFCC';
    case 'pending':
      return '#f1b565';
    default:
      return '#FFFFFF';
  }
};

function LandlordNotifications() {
  const dispatch = useDispatch();
  const { notifications, status } = useSelector((state) => state.notifications);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeclineConfirmation, setOpenDeclineConfirmation] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [filter, setFilter] = useState('all');
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const defaultMessage = `${selectedNotification?.property_name || 'the property'} you requested is declined for this reason: `;
  const AdminImage='logo.jpg';
  const [declineMessage, setDeclineMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const notificationsPerPage = 5;

  const predefinedReasons = [
  "Scheduling conflict",
  "Property is no longer available",
  "Unsuitable for the requested tour",
  "Other"
];

   useEffect(() => {
    if (selectedNotification) {
      setSelectedReason('');
      setCustomReason('');
      setValidationError('');
    }
  }, [selectedNotification]);

  useEffect(() => {
    dispatch(fetchLandlordNotificationsAsync());
  }, [dispatch]);

  const handleApprove = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const handleDeclineConfirmation = (notification) => {
    setSelectedNotification(notification);
    setOpenDeclineConfirmation(true);
  };

  
  const validateMessage = (message) => {
    if (/^\d/.test(message)) {
      return "Message cannot start with a number.";
    }
    if (message.length < 10) {
      return "Message must be at least 10 characters long.";
    }
    return '';
  };


     const handleDecline = () => {
    const error = validateMessage(selectedReason === "Other" ? customReason : selectedReason);
    if (error) {
      setValidationError(error);
      return;
    }
    
    if (selectedNotification) {
      setSubmitting(true);
      const reason = selectedReason === "Other" ? customReason : selectedReason;
      const fullMessage = `${defaultMessage} ${reason}`;
      dispatch(declineTourAsync({ tourId: selectedNotification.tour_id, message: fullMessage }))
        .then((response) => {
          if (!response.error) {
            dispatch(fetchLandlordNotificationsAsync());
            toast.success('Declined tour', {
              position: 'top-right',
            });
          }
          setSubmitting(false);
          setOpenDeclineConfirmation(false);
          setSelectedReason('');
          setCustomReason('');
        })
        .catch(() => {
          setSubmitting(false);
          setOpenDeclineConfirmation(false);
          toast.error('Failed to decline tour', {
            position: 'top-right',
          });
        });
    }
  };

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
    if (e.target.value !== "Other") {
      setValidationError('');
    }
  };

  const handleCustomReasonChange = (e) => {
    const { value } = e.target;
    setCustomReason(value);
    if (value) {
      setValidationError(validateMessage(value));
    } else {
      setValidationError('');
    }
  };


  const handleMessageChange = (e) => {
    const { value } = e.target;
    setDeclineMessage(value);
    setValidationError(validateMessage(value));
  };


  const handleApproveDate = () => {
    if (selectedNotification && selectedDate) {
      setSubmitting(true);
      dispatch(
        approveDateAsync({ tourId: selectedNotification.tour_id, selectedDate })
      )
        .then((response) => {
          if (!response.error) {
            dispatch(fetchLandlordNotificationsAsync());
            toast.success('Approved tour', {
              position: 'top-right',
            });
          }
          setSubmitting(false);
          setOpenModal(false);
        })
        .catch(() => {
          setSubmitting(false);
          setOpenModal(false);
          toast.error('Failed to approve tour', {
            position: 'top-right',
          });
        });
    }
  };

  const handleDelete = (notificationId) => {
    setSelectedNotification(notificationId);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedNotification) {
      dispatch(deleteNotificationAsync(selectedNotification))
        .then((response) => {
          if (!response.error) {
            dispatch(fetchLandlordNotificationsAsync());
            toast.success('Notification removed successfully', {
              position: 'top-right',
            });
          }
          setOpenDeleteConfirmation(false);
        })
        .catch(() => {
          setOpenDeleteConfirmation(false);
          toast.error('Failed to remove notification', {
            position: 'top-right',
          });
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleMouseEnter = (e, color) => {
    e.currentTarget.style.color = color;
  };

  const handleMouseLeave = (e, color) => {
    e.currentTarget.style.color = color;
  };
  const getTimeDisplay = (createdAt) => {
    const now = moment();
    const notificationTime = moment(createdAt);
    const diffInHours = now.diff(notificationTime, 'hours');

    if (diffInHours < 3) {
      return notificationTime.fromNow();
    }
    return notificationTime.format('MMMM DD, YYYY hh:mm A');
  };
  const filteredNotifications = notifications
    ? notifications.filter(
        (notification) => filter === 'all' || notification.status === filter
      )
    : [];

  const sortedNotifications = filteredNotifications
    ? [...filteredNotifications].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    : [];

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = sortedNotifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );
  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Loader />
      </Box>
    );
  }
  if (status === 'failed') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        Not FOUND ANY NOTIFICATION
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 3,
        marginLeft: 3,
        // marginTop: '60px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Divider />
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="approved">Declined</MenuItem>
            <MenuItem value="declined">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {currentNotifications.length === 0 ? (
        <Typography variant="body1" align="center" height="80vh">
          No notifications found.
        </Typography>
      ) : (
        <List>
          {currentNotifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                marginBottom: 3,
                transition: 'transform 0.3s ease',
                transform:
                  hoveredNotification === notification.id
                    ? 'scale(1.03)'
                    : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredNotification(notification.id)}
              onMouseLeave={() => setHoveredNotification(null)}
            >
              <Paper
                key={notification.id}
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: 5,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                }}
              >
                 
                {/* Top row: Profile image, fromname, and notification time */}
                <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    position: 'relative',
  }}
>
  {notification.type === 'status_change' ? (
    <Box display="flex" alignItems="center" marginTop={3}>
      <Avatar
        alt={'admin'}
        src={AdminImage}
        sx={{ marginLeft: '28px', marginRight: '12px' }}
      />
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ marginRight: 'auto' }}
      >
        {`Darak Team`}
      </Typography>
      <Typography
        variant="body"
        color="textSecondary"
        sx={{ marginLeft: { xs: '10px' } }}
      >
        {getTimeDisplay(notification.created_at)}
      </Typography>
    </Box>
  ) : (
    <>
      {/* Colorful circle */}
      <Box
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: getNotificationCircleColor(notification.status),
          position: 'absolute',
          top: '5px',
          left: '8px',
        }}
      />
      <Box display="flex" alignItems="center" marginTop={3}>
        <Avatar
          alt={notification.from.first_name}
          src={notification.from.avatar}
          sx={{ marginLeft: '28px', marginRight: '12px' }}
        />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ marginRight: 'auto' }}
        >
          {`${notification.from.first_name} ${notification.from.last_name}`}
        </Typography>
        <Typography
          variant="body"
          color="textSecondary"
          sx={{ marginLeft: { xs: '10px' } }}
        >
          {getTimeDisplay(notification.created_at)}
        </Typography>
      </Box>
    </>
  )}
  <Box
    sx={{
      position: 'absolute',
      top: '5px',
      right: '5px',
    }}
  >
    <IconButton
      size="small"
      aria-label="delete notification"
      onClick={() => handleDelete(notification.id)}
      onMouseEnter={(e) => handleMouseEnter(e, red[500])}
      onMouseLeave={(e) => handleMouseLeave(e, grey[500])}
    >
      <CloseIcon />
    </IconButton>
  </Box>
</Box>


                {/* Second row: Notification message and dates */}
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: '8px',
                    marginLeft: { xs: '0', md: '85px' },
                    textAlign: { xs: 'center', md: 'left', lg: 'left' },
                  }}
                >
                  {notification.message}
                </Typography>
                  {notification.type !== 'status_change' &&(
                    <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                    textAlign: { xs: 'center', sm: 'center', md: 'left' },
                    marginBottom: '8px',
                    marginLeft: { xs: '0', md: '75px' },
                    alignItems: 'center',
                  }}
                >
                  <DateRangeIcon
                    sx={{
                      marginRight: '5px',

                      color: getNotificationCircleColor(notification.status),
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      {notification.tour &&
                        notification.tour.dates.map((date, index) => (
                          <React.Fragment key={date.id}>
                            <Typography
                              variant="body2"
                              style={{
                                color:
                                  date.approved === 1 ? 'green' : 'inherit',
                                marginLeft: index > 0 ? '10px' : '0px',
                              }}
                            >
                              {moment(date.date).format(
                                'MMMM DD, YYYY hh:mm A'
                              )}
                            </Typography>
                          </React.Fragment>
                        ))}
                    </Typography>
                  </Box>
                </Box>
                {/* Third row: Action buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: {
                      xs: 'center',
                      sm: 'center',
                      md: 'center',
                    },
                    alignItems: 'center',
                    gap: '18px',
                    marginTop: '5px',
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDeclineConfirmation(notification)}
                    disabled={notification.status !== 'pending'}
                    sx={{
                      backgroundColor: '#B32231',
                      '&:hover': {
                        backgroundColor: '#be2736',
                      },
                    }}
                    startIcon={<DeclineIcon />}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleApprove(notification)}
                    disabled={notification.status !== 'pending'}
                    sx={{
                      backgroundColor: '#187429',
                      '&:hover': {
                        backgroundColor: '#1c832f',
                      },
                    }}
                    startIcon={<ApproveIcon />}
                  >
                    Approve
                  </Button>
                </Box>
                </>)}
              </Paper>
            </Box>
          ))}
        </List>
      )}
      <Box display="flex" justifyContent="center" marginTop="16px">
        <Pagination
          count={Math.ceil(
            (notifications ? notifications.length : 0) / notificationsPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Select a Date</DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <List>
              {selectedNotification.tour &&
                selectedNotification.tour.dates.map((date) => (
                  <ListItem key={date.id}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedDate?.id === date.id}
                          onChange={() => setSelectedDate(date)}
                          value={date.id}
                        />
                      }
                      label={date.date}
                    />
                  </ListItem>
                ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleApproveDate}
            color="primary"
            disabled={!selectedDate || submitting}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

<Dialog
        open={openDeclineConfirmation}
        onClose={() => setOpenDeclineConfirmation(false)}
      >
        <DialogTitle>Decline Tour</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to decline this tour request?
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="reason-select-label">Reason</InputLabel>
            <Select
              labelId="reason-select-label"
              value={selectedReason}
              onChange={handleReasonChange}
              label="Reason"
            >
              {predefinedReasons.map((reason, index) => (
                <MenuItem key={index} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </Select>
            {selectedReason === "Other" && (
              <TextField
                autoFocus
                margin="dense"
                label="Other Reason"
                fullWidth
                variant="outlined"
                value={customReason}
                onChange={handleCustomReasonChange}
                error={!!validationError}
                helperText={validationError}
              />
            )}
            {validationError && <FormHelperText error>{validationError}</FormHelperText>}
          </FormControl>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
            {defaultMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeclineConfirmation(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDecline} color="error" disabled={submitting || !!validationError}>
            Decline
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
      >
        <DialogTitle>Delete Notification</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this notification?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteConfirmation(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LandlordNotifications;
