import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { sessionStorage } from 'store/sessionStorage';

export const SessionRequired = (Component) => {
  const Protected = (props) => {
    if (sessionStorage.sessionExists()) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: '/token', state: undefined }} />;
  };
  return Protected;
};

const PrivateRoute = ({ component, ...rest }) => {
  return <Route {...rest} component={SessionRequired(component)} />;
};

export default PrivateRoute;
