import React from 'react';
import PropTypes from 'prop-types';
import secureLocalStorage from 'react-secure-storage';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { errorToast } from 'utils/toast';

function ProtectedRoute({ element, roles }) {
  const location = useLocation();
  const { t } = useTranslation();
  const user = JSON.parse(secureLocalStorage.getItem('user'));

  if (!user) {
    errorToast(t('You must be logged in to access this page'));
    if (location.pathname.includes('/admin'))
      return (
        <Navigate to="/admin-login" state={{ prevUrl: location.pathname }} />
      );
    return <Navigate to="/login" state={{ prevUrl: location.pathname }} />;
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
