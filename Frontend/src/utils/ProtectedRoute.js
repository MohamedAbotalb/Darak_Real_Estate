import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { errorToast } from 'utils/toast';

function ProtectedRoute({ element, roles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    errorToast('You should be logged in to access this page');
    return <Navigate to="/login" />;
  }

  // If user doesn't have the required role, redirect to access denied page
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/403" />;
  }

  return element;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

ProtectedRoute.defaultProps = {
  roles: null,
};

export default ProtectedRoute;
