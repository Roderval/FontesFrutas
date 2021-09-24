import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../auth/LoginPage';
import SignUpPage from '../auth/SignUpPage';

import MonitoringPage from '../content/MonitoringPage';
import ActivityPage from '../content/ActivityPage';
import RegistrationPage from '../content/RegistrationPage';
import RelatoryPage from '../content/RelatoryPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <PrivateRoute exact path="/monitoramento" component={MonitoringPage} />
      <PrivateRoute exact path="/atividades" component={ActivityPage} />
      <PrivateRoute exact path="/cadastro" component={RegistrationPage} />
      <PrivateRoute exact path="/relatorio" component={RelatoryPage} />
    </Switch>
  );
};

export default Routes;
