import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ element, roles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // If user doesn't have the required role, redirect to access denied page
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
