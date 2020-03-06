import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { entities } from './reducers';
import { sessionReducer } from './reducers/session';
import { repositoryReducer } from './reducers/repository'
import { repositoryIssueReducer } from './reducers/repositoryIssue';

export default function configureStore() {
  const middlewares = [
    thunk, createLogger()
  ]
  const rootReducer = combineReducers({
    entities,
    session: sessionReducer,
    repositories: repositoryReducer,
    repositoryIssues: repositoryIssueReducer
  });

  return createStore(rootReducer, applyMiddleware(...middlewares));
}
