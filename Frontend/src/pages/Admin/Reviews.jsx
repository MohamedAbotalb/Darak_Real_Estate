import React, { lazy } from 'react';

const ReviewList = lazy(() => import('components/AdminDashboard/ReviewList'));

function ReviewsPage() {
  return <ReviewList />;
}

export default ReviewsPage;
