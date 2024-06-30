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
  Paper,
} from '@mui/material';
import {
  CheckCircleOutline as ApproveIcon,
  HighlightOffOutlined as DeleteIcon,
  HighlightOff as DeclineIcon,
} from '@mui/icons-material';

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

function LandlordNotifications() {
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
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

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
            // Handle the error
          } else {
            // Optionally handle state update or UI interaction after declining
          }
          setSubmitting(false);
          setOpenDeclineConfirmation(false);
        })
        .catch((declineError) => {
          // Handle the error
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
            // Handle the error
          } else {
            setSelectedNotification((prev) => ({
              ...prev,
              tour: {
                ...prev.tour,
                dates: prev.tour.dates.map((date) =>
                  date.id === selectedDate.id ? { ...date, approved: 1 } : date
                ),
              },
            }));
            setSelectedDate(null);
          }
          setSubmitting(false);
          setOpenModal(false);
        })
        .catch((approveError) => {
          // Handle the error
          setSubmitting(false);
          setOpenModal(false);
        });
    }
  };

  const handleDelete = (notificationId) => {
    setSelectedNotification(notificationId);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedNotification) {
      dispatch(deleteNotificationAsync(selectedNotification)).catch(
        (deleteError) => {
          // Handle the error
        }
      );
      setOpenDeleteConfirmation(false);
    }
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
    return <div>Error: {error}</div>;
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
            <Paper
              key={notification.id}
              elevation={3}
              style={{ marginBottom: '16px' }}
            >
              <ListItem
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  maxWidth: '600px',
                  margin: '16px auto',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={() => handleDelete(notification.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: '#f44336',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Box
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
                {notification.tour &&
                  notification.tour.dates.map((date) => (
                    <ListItem
                      key={date.id}
                      style={{
                        color: date.approved === 1 ? 'green' : 'inherit',
                      }}
                    >
                      {date.date}
                    </ListItem>
                  ))}
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
            </Paper>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeclineConfirmation(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDecline} color="primary" disabled={submitting}>
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
