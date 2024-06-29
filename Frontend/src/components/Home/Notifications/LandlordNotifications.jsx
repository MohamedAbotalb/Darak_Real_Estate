
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchLandlordNotifications,
//   approveDate,
//   declineTour,
// } from 'store/notfications/notificationsSlice'; 
// import {
//   Box,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Typography,
//   Divider,
//   Radio,
//   FormControlLabel,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Pagination,
// } from '@mui/material';
// import {
//   CheckCircleOutline as ApproveIcon,
//   HighlightOff as DeclineIcon,
// } from '@mui/icons-material';

// const LandlordNotifications = () => {
//   const dispatch = useDispatch();
//   const { notifications, status, error } = useSelector(
//     (state) => state.notifications
//   );
  
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openDeclineConfirmation, setOpenDeclineConfirmation] = useState(false);

//   const notificationsPerPage = 5;

//   useEffect(() => {
//     dispatch(fetchLandlordNotifications());
//   }, [dispatch]);

//   const handleApprove = (notification) => {
//     setSelectedNotification(notification);
//     setOpenModal(true);
//   };

//   const handleDeclineConfirmation = (notification) => {
//     setSelectedNotification(notification);
//     setOpenDeclineConfirmation(true);
//   };

//   const handleDecline = () => {
//     if (selectedNotification) {
//       dispatch(declineTour(selectedNotification.id))
//         .then(() => {
//           // Optionally handle state update or UI interaction after declining
//         })
//         .catch((error) => {
//           // Handle error if needed
//         });
//       setOpenDeclineConfirmation(false);
//     }
//   };

//   const handleApproveDate = () => {
//     if (selectedNotification && selectedDate) {
//       setSubmitting(true);
//       dispatch(
//         approveDate({ tourId: selectedNotification.id, selectedDate })
//       )
//         .then(() => {
//           setSelectedNotification(null);
//           setSelectedDate(null);
//           setSubmitting(false);
//           setOpenModal(false);
//         })
//         .catch(() => {
//           setSubmitting(false);
//           setOpenModal(false);
//         });
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const startIndex = (currentPage - 1) * notificationsPerPage;
//   const currentNotifications = notifications
//     ? notifications.slice(startIndex, startIndex + notificationsPerPage)
//     : [];
//   console.log(currentNotifications)

//   if (status === 'loading') {
//     return <CircularProgress />;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <Box textAlign="center" padding="16px">
//       <Typography variant="h2" gutterBottom>
//         Landlord Notifications
//       </Typography>
//       <Divider />
//       {currentNotifications.length > 0 ? (
//         <List>
//           {currentNotifications.map((notification) => (
//             <ListItem
//               key={notification.id}
//               style={{
//                 marginBottom: '16px',
//                 border: '1px solid #ccc',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                 borderRadius: '8px',
//                 padding: '16px',
//                 textAlign: 'left',
//                 maxWidth: '600px',
//                 margin: '16px auto',
//                 backgroundColor: '#fff',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//               }}
//             >
//               <ListItemText
//                 primary={notification.message}
//                 secondary={
//                   <>
//                     {notification.dates && notification.dates.map((date) => (
//                       <span
//                         key={date}
//                         style={{
//                           color:
//                             notification.approvedDate === date
//                               ? 'green'
//                               : 'inherit',
//                           fontWeight:
//                             notification.approvedDate === date
//                               ? 'bold'
//                               : 'normal',
//                         }}
//                       >
//                         {date}
//                         {notification.approvedDate === date &&
//                           ' (Approved)'}
//                         {notification.dates.indexOf(date) <
//                           notification.dates.length - 1 &&
//                           ', '}
//                       </span>
//                     ))}
//                   </>
//                 }
//               />
//               {notification.approvedDate && (
//                 <Typography
//                   variant="body2"
//                   style={{ color: 'green', marginBottom: '8px' }}
//                 >
//                   Approved Date: {notification.approvedDate}
//                 </Typography>
//               )}
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 width="100%"
//                 marginTop="16px"
//               >
//                 <Button
//                   variant="contained"
//                   onClick={() => handleDeclineConfirmation(notification)}
//                   disabled={status === 'declined' || status === 'approved'}
//                   color="error"
//                   startIcon={<DeclineIcon />}
//                 >
//                   Decline
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => handleApprove(notification)}
//                   disabled={status === 'approved' || status === 'declined'}
//                   color="success"
//                   startIcon={<ApproveIcon />}
//                 >
//                   Approve
//                 </Button>
//               </Box>
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <Typography>No notifications available.</Typography>
//       )}
//       <Box display="flex" justifyContent="center" marginTop="16px">
//         <Pagination
//           count={Math.ceil(
//             (notifications ? notifications.length : 0) /
//               notificationsPerPage
//           )}
//           page={currentPage}
//           onChange={handlePageChange}
//           variant="outlined"
//           shape="rounded"
//         />
//       </Box>
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogTitle>Select a Date</DialogTitle>
//         <DialogContent>
//           {selectedNotification && (
//             <List>
//               {selectedNotification.dates && selectedNotification.dates.map((date) => (
//                 <ListItem key={date}>
//                   <FormControlLabel
//                     control={
//                       <Radio
//                         checked={selectedDate === date}
//                         onChange={() => setSelectedDate(date)}
//                         value={date}
//                       />
//                     }
//                     label={date}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenModal(false)} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleApproveDate}
//             color="primary"
//             disabled={submitting || !selectedDate}
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog
//         open={openDeclineConfirmation}
//         onClose={() => setOpenDeclineConfirmation(false)}
//         disableBackdropClick 
//         disableEscapeKeyDown 
//       >
//         <DialogTitle>Confirm Decline</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to decline this tour?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setOpenDeclineConfirmation(false)}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDecline}
//             color="secondary"
//             variant="contained"
//             disabled={!selectedNotification}
//           >
//             Confirm Decline
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LandlordNotifications;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLandlordNotifications,
  approveDate,
  declineTour,
} from 'store/notfications/notificationsSlice'; 
import {
  Box,
  CircularProgress,
  List,
  ListItem,
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
} from '@mui/material';
import {
  CheckCircleOutline as ApproveIcon,
  HighlightOff as DeclineIcon,
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
    dispatch(fetchLandlordNotifications());
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
      dispatch(declineTour(selectedNotification.id))
        .then(() => {
          // Optionally handle state update or UI interaction after declining
        })
        .catch((error) => {
          // Handle error if needed
        });
      setOpenDeclineConfirmation(false);
    }
  };

  const handleApproveDate = () => {
    if (selectedNotification && selectedDate) {
      setSubmitting(true);
      dispatch(
        approveDate({ tourId: selectedNotification.id, selectedDate })
      )
        .then(() => {
          setSelectedNotification(null);
          setSelectedDate(null);
          setSubmitting(false);
          setOpenModal(false);
        })
        .catch(() => {
          setSubmitting(false);
          setOpenModal(false);
        });
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = notifications
    ? notifications.slice(startIndex, startIndex + notificationsPerPage)
    : [];

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      notifications.forEach((notification) => {
        switch (notification.type) {
          case 'cancellation':
            // Handle cancellation type notification
            break;
          case 'confirmation':
            // Handle confirmation type notification
            break;
          case 'request':
            // Handle request type notification
            break;
          default:
            break;
        }
      });
    }
  }, [notifications]);

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
                backgroundColor: getNotificationBgColor(notification.type),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={notification.message}
                secondary={
                  <>
                    {notification.dates && notification.dates.map((date) => (
                      <span
                        key={date}
                        style={{
                          color:
                            notification.approvedDate === date
                              ? 'green'
                              : 'inherit',
                          fontWeight:
                            notification.approvedDate === date
                              ? 'bold'
                              : 'normal',
                        }}
                      >
                        {date}
                        {notification.approvedDate === date &&
                          ' (Approved)'}
                        {notification.dates.indexOf(date) <
                          notification.dates.length - 1 &&
                          ', '}
                      </span>
                    ))}
                  </>
                }
              />
              {notification.approvedDate && (
                <Typography
                  variant="body2"
                  style={{ color: 'green', marginBottom: '8px' }}
                >
                  Approved Date: {notification.approvedDate}
                </Typography>
              )}
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                marginTop="16px"
              >
                <Button
                  variant="contained"
                  onClick={() => handleDeclineConfirmation(notification)}
                  disabled={notification.type === 'cancellation'}
                  color="error"
                  startIcon={<DeclineIcon />}
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
            (notifications ? notifications.length : 0) /
              notificationsPerPage
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
              {selectedNotification.dates && selectedNotification.dates.map((date) => (
                <ListItem key={date}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedDate === date}
                        onChange={() => setSelectedDate(date)}
                        value={date}
                      />
                    }
                    label={date}
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
          <Typography>
            Are you sure you want to decline this tour?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeclineConfirmation(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDecline}
            color="secondary"
            variant="contained"
            disabled={!selectedNotification}
          >
            Confirm Decline
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Function to get background color based on notification type
const getNotificationBgColor = (type) => {
  switch (type) {
    case 'cancellation':
      return '#FFCCCC'; // Light red for cancellation
    case 'confirmation':
      return '#CCFFCC'; // Light green for confirmation
    case 'request':
      return '#FFFFCC'; // Light yellow for request
    default:
      return '#FFFFFF'; // Default white background
  }
};

export default LandlordNotifications;
