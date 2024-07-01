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
          if (!response.error) {
            // Re-fetch the notifications after successful decline
            dispatch(fetchLandlordNotificationsAsync());
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
          if (!response.error) {
            // Re-fetch the notifications after successful approve
            dispatch(fetchLandlordNotificationsAsync());
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
      dispatch(deleteNotificationAsync(selectedNotification))
        .then((response) => {
          if (!response.error) {
            // Re-fetch the notifications after successful delete
            dispatch(fetchLandlordNotificationsAsync());
          }
          setOpenDeleteConfirmation(false);
        })
        .catch((deleteError) => {
          // Handle the error
          setOpenDeleteConfirmation(false);
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
        <CircularProgress />
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
                marginBottom: 2,
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
                  borderRadius: 4,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                }}
              >
                {/* Top row: Profile image, username, and notification time */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                    position: 'relative',
                  }}
                >
                  {/* Colorful circle */}
                  <Box
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: getNotificationCircleColor(
                        notification.status
                      ),
                      position: 'absolute',
                      top: '5px',
                      left: '8px',
                    }}
                  />
                  <Box display="flex" alignItems="center" marginTop={3}>
                    <Avatar
                      alt={notification.landlord.first_name}
                      src={notification.landlord.avatar}
                      sx={{ marginLeft: '28px', marginRight: '12px' }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ marginRight: '12px' }}
                    >
                      {`${notification.landlord.first_name} ${notification.landlord.last_name}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {getTimeDisplay(notification.created_at)}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="delete notification"
                    onClick={() => handleDelete(notification.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, red[500])}
                    onMouseLeave={(e) => handleMouseLeave(e, grey[500])}
                    sx={{ position: 'absolute', top: 5, right: 5 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Second row: Notification message and dates */}
                <Box marginLeft="70px" marginTop="8px">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontSize: '14px',
                      marginLeft: '20px',
                      textAlign: 'left',
                    }}
                  >
                    {notification.message}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  marginLeft="85px"
                  marginTop="8px"
                >
                  <DateRangeIcon sx={{ marginRight: '5px' }} />
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
                              color: date.approved === 1 ? 'green' : 'inherit',
                              marginLeft: index > 0 ? '10px' : '0px',
                            }}
                          >
                            {moment(date.date).format('MMMM DD, YYYY hh:mm A')}
                          </Typography>
                        </React.Fragment>
                      ))}
                  </Typography>
                </Box>

                {/* Third row: Action buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '8px',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleDeclineConfirmation(notification)}
                    disabled={
                      notification.status === 'declined' ||
                      notification.status === 'approved'
                    }
                    color="error"
                    startIcon={<DeclineIcon />}
                    sx={{ marginRight: '8px' }}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleApprove(notification)}
                    disabled={
                      notification.status === 'approved' ||
                      notification.status === 'declined'
                    }
                    color="success"
                    startIcon={<ApproveIcon />}
                  >
                    Approve
                  </Button>
                </Box>
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
