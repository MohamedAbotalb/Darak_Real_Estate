import React from 'react';
import PropTypes from 'prop-types';
import secureLocalStorage from 'react-secure-storage';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { errorToast } from 'utils/toast';

function ProtectedRoute({ element, roles }) {
  const { t } = useTranslation();
  const user = JSON.parse(secureLocalStorage.getItem('user'));

  if (!user) {
    errorToast(t('You must be logged in to access this page'));
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
