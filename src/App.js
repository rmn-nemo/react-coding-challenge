import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Auth from './components/auth';
import Repository from './components/repository/repositoryList';
import RepositoryIssue from './components/repositoryIssue/repositoryIssueList';

import SessionRequired from './components/sessionRequired';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/token' component={Auth} />
        <SessionRequired path='/repositories/:id/issues' component={RepositoryIssue} />
        <SessionRequired path='/repositories' component={Repository} />

        <Redirect exact from='/' to='/repositories' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
