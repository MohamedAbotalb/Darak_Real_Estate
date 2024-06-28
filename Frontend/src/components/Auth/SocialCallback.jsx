import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleSocialLoginCallback } from 'services/socialAuth';
import { login } from 'store/authSlice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function SocialCallback({ provider }) {
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const code = query.get('code');
    if (code) {
      handleSocialLoginCallback(provider, code)
        .then((data) => {
          dispatch(login(data.user));
          toast.success('Logged in successfully');
          history.push('/');
        })
        .catch((error) => {
          toast.error(error.message);
          history.push('/login');
        });
    }
  }, [provider, query, dispatch, history]);

  return <div>Loading...</div>;
}

SocialCallback.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default SocialCallback;
