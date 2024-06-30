import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLandlordNotificationsAsync,
  approveDateAsync,
  declineTourAsync,
  deleteNotificationAsync
} from 'store/Notifications/notificationsSlice';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
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
} from '@mui/material';
import {
  CheckCircleOutline as ApproveIcon,
  HighlightOff as DeclineIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const LandlordNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, status, error } = useSelector(
    (state) => state.notifications
  );

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeclineConfirmation, setOpenDeclineConfirmation] = useState(false);

  const notificationsPerPage = 5;

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

  const handleDecline = () => {
    if (selectedNotification) {
      setSubmitting(true);
      dispatch(declineTourAsync(selectedNotification.tour_id))
        .then((response) => {
          if (response.error) {
            console.error('Decline Tour Error:', response.error.message); // Log and handle the error
          } else {
            // Optionally handle state update or UI interaction after declining
          }
          setSubmitting(false);
          setOpenDeclineConfirmation(false);
        })
        .catch((error) => {
          console.error('Decline Tour Error:', error.message); // Log and handle the error
          setSubmitting(false);
          setOpenDeclineConfirmation(false);
        });
    }
  };

  const handleApproveDate = () => {
    if (selectedNotification && selectedDate) {
      setSubmitting(true);
      dispatch(
        approveDateAsync({ tourId: selectedNotification.tour_id, selectedDate })
      )
        .then((response) => {
          if (response.error) {
            console.error('Approve Date Error:', response.error.message); // Log and handle the error
          } else {
            setSelectedNotification((prev) => ({
              ...prev,
              tour: {
                ...prev.tour,
                dates: prev.tour.dates.map((date) =>
                  date.id === selectedDate.id
                    ? { ...date, approved: 1 }
                    : date
                ),
              },
            }));
            setSelectedDate(null);
          }
          setSubmitting(false);
          setOpenModal(false);
        })
        .catch((error) => {
          console.error('Approve Date Error:', error.message); // Log and handle the error
          setSubmitting(false);
          setOpenModal(false);
        });
    }
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotificationAsync(notificationId))
      .catch((error) => {
        console.error('Delete Notification Error:', error.message); // Log and handle the error
      });
  };

  const handleDateChange = (dateObj) => {
    setSelectedDate(dateObj);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = notifications
    ? notifications.slice(startIndex, startIndex + notificationsPerPage)
    : [];

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // Display the specific error received from the backend
  }

  return (
    <Box textAlign="center" padding="16px">
      <Typography variant="h2" gutterBottom>
        Landlord Notifications
      </Typography>
      <Divider />
      {currentNotifications.length > 0 ? (
        <List>
          {currentNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              style={{
                marginBottom: '16px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'left',
                maxWidth: '600px',
                margin: '16px auto',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch', // Stretch items vertically
              }}
            >
              <IconButton
                onClick={() => handleDelete(notification.id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                }}
              >
                <DeleteIcon />
              </IconButton>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: getNotificationCircleColor(
                    notification.type
                  ),
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  bottom: '8px',
                }}
              />
              <Box
                display="flex"
                alignItems="center"
                marginTop="16px"
                marginLeft="20px"
                marginBottom="8px"
              >
                <ListItemAvatar>
                  <Avatar alt="User Profile" src={notification.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${notification.user.first_name} ${notification.user.last_name}`}
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {notification.message}
                    </Typography>
                  }
                />
              </Box>
              {notification.tour && (
                notification.tour.dates.map((date) => (
                  <ListItem
                    key={date.id}
                    style={{
                      color: date.approved === 1 ? 'green' : 'inherit',
                    }}
                  >
                    {date.date}
                  </ListItem>
                ))
              )}
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                marginTop="16px"
              >
                <Button
                  variant="contained"
                  onClick={() => handleDeclineConfirmation(notification)}
                  disabled={notification.type === 'cancellation'}
                  color="error"
                  startIcon={<DeclineIcon />}
                  style={{ marginRight: '16px' }}
                >
                  Decline
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleApprove(notification)}
                  disabled={notification.type === 'confirmation'}
                  color="success"
                  startIcon={<ApproveIcon />}
                >
                  Approve
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No notifications available.</Typography>
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
            disabled={submitting || !selectedDate}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeclineConfirmation}
        onClose={() => setOpenDeclineConfirmation(false)}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>Confirm Decline</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to decline this tour?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeclineConfirmation(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDecline}
            color="secondary"
            variant="contained"
            disabled={submitting || !selectedNotification}
          >
            Confirm Decline
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const getNotificationCircleColor = (type) => {
  switch (type) {
    case 'cancellation':
      return '#FFCCCC'; // Light red for cancellation
    case 'confirmation':
      return '#CCFFCC'; // Light green for confirmation
    case 'request':
      return '#FFFFCC'; // Light yellow for request
    default:
      return '#FFFFFF'; // Default white circle
  }
};

export default LandlordNotifications;