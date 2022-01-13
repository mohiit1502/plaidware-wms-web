import useAuthentication from 'hooks/useAuthentication';
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoutes = ({ component }) => {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <>{component} </>;
  }

  return <Navigate to="/dashboard" />;
};

PublicRoutes.propTypes = {
  component: PropTypes.any
};

export default PublicRoutes;
