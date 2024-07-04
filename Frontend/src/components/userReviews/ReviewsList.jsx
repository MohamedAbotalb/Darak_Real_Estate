// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchReviews,
//   deleteReviewAsync,
//   updateReviewAsync,
// } from 'store/userReviews/userReviewsSlice';
// import {
//   Box,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   IconButton,
//   TextField,
//   Rating,
//   Menu,
//   MenuItem,
//   Avatar,
//   Paper,
// } from '@mui/material';
// import { MoreVert, Save, Cancel } from '@mui/icons-material';
// import { format, formatDistanceToNow } from 'date-fns'; // Import necessary date-fns functions

// function ReviewsList({ propertyId }) {
//   const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviews.reviews);
//   const user = useSelector((state) => state.auth.user); // Assuming the logged-in user ID is stored in state.user.id
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [editingReview, setEditingReview] = useState(null);
//   const [editedContent, setEditedContent] = useState('');
//   const [editedRating, setEditedRating] = useState(0);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuReviewId, setMenuReviewId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchReviews(propertyId));
//   }, [dispatch, propertyId]);

//   const handleDelete = (reviewId) => {
//     dispatch(deleteReviewAsync(reviewId));
//   };

//   const handleEditClick = (review) => {
//     setEditingReview(review.id);
//     setEditedContent(review.content);
//     setEditedRating(review.rate);
//     handleMenuClose();
//   };

//   const handleEditSubmit = () => {
//     dispatch(
//       updateReviewAsync({
//         reviewId: editingReview,
//         reviewData: { content: editedContent, rate: editedRating },
//       })
//     );
//     setEditingReview(null);
//     setEditedContent('');
//     setEditedRating(0);
//   };

//   const handleEditCancel = () => {
//     setEditingReview(null);
//     setEditedContent('');
//     setEditedRating(0);
//   };

//   const handleMenuClick = (event, reviewId) => {
//     setAnchorEl(event.currentTarget);
//     setMenuReviewId(reviewId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setMenuReviewId(null);
//   };

//   const loadMore = () => {
//     setVisibleReviews((prev) => prev + 4);
//   };

//   // Function to format a date as "d/M/yyyy"
//   const formatCustomDate = (date) => {
//     return format(date, 'd/M/yyyy');
//   };

//   // Function to format review date dynamically
//   const formatReviewDate = (createdAt) => {
//     const reviewDate = new Date(createdAt);
//     const now = new Date();
//     const differenceInHours = Math.abs(now - reviewDate) / 36e5; // Calculate difference in hours

//     if (differenceInHours < 3) {
//       // If less than 3 hours ago, show relative time (about 3 hours ago)
//       return formatDistanceToNow(reviewDate, { addSuffix: true });
//     }
//     // If more than 3 hours ago, show formatted date (1/2/2024)
//     return formatCustomDate(reviewDate);
//   };

//   return (
//     <Box>
//       <List>
//         {reviews
//           ?.slice()
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//           .slice(0, visibleReviews)
//           .map((review) => (
//             <Paper
//               elevation={3}
//               style={{
//                 marginBottom: '16px',
//                 padding: '16px',
//                 borderRadius: '8px',
//               }}
//               key={review.id}
//             >
//               <ListItem alignItems="flex-start">
//                 <Box display="flex" flexDirection="column" width="100%">
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box display="flex" alignItems="center">
//                       <Avatar
//                         src={review.user.avatar}
//                         alt={review.user.first_name}
//                         style={{ marginRight: '16px' }}
//                       />
//                       <Box>
//                         <Typography
//                           variant="subtitle1"
//                           component="span"
//                           fontWeight="bold"
//                         >
//                           {`${review?.user.first_name} ${review?.user.last_name}`}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     {user.id === review.user.id && ( // Only show menu options for user's own reviews
//                       <>
//                         <IconButton
//                           onClick={(event) => handleMenuClick(event, review.id)}
//                         >
//                           <MoreVert />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={Boolean(anchorEl) && menuReviewId === review.id}
//                           onClose={handleMenuClose}
//                         >
//                           <MenuItem
//                             onClick={() => handleEditClick(review)}
//                             color="primary"
//                           >
//                             Edit
//                           </MenuItem>
//                           <MenuItem
//                             onClick={() => handleDelete(review.id)}
//                             color="error"
//                           >
//                             Delete
//                           </MenuItem>
//                         </Menu>
//                       </>
//                     )}
//                   </Box>
//                   <Box display="flex" alignItems="center" mt={1} ml={1}>
//                     <Rating
//                       name="rate"
//                       value={
//                         editingReview === review.id ? editedRating : review.rate
//                       }
//                       readOnly={editingReview !== review.id}
//                       size="small"
//                       onChange={(e, newValue) => setEditedRating(newValue)}
//                     />
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       style={{ marginLeft: '4px', fontSize: '0.75rem' }}
//                     >
//                       {formatReviewDate(review.created_at)}
//                     </Typography>
//                   </Box>

//                   <Box marginTop={2}>
//                     {editingReview === review.id ? (
//                       <TextField
//                         value={editedContent}
//                         onChange={(e) => setEditedContent(e.target.value)}
//                         variant="outlined"
//                         fullWidth
//                       />
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">
//                         {review.content}
//                       </Typography>
//                     )}
//                   </Box>
//                   {editingReview === review.id && (
//                     <Box display="flex" justifyContent="flex-end" marginTop={1}>
//                       <IconButton onClick={handleEditSubmit} color="primary">
//                         <Save />
//                       </IconButton>
//                       <IconButton onClick={handleEditCancel} color="secondary">
//                         <Cancel />
//                       </IconButton>
//                     </Box>
//                   )}
//                 </Box>
//               </ListItem>
//             </Paper>
//           ))}
//       </List>
//       {visibleReviews < reviews.length && (
//         <Button variant="contained" color="primary" onClick={loadMore}>
//           Load More
//         </Button>
//       )}
//     </Box>
//   );
// }

// export default ReviewsList;
