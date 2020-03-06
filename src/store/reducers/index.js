import { merge } from 'lodash';

import { combineReducers } from 'redux';

export const entities = (state = {}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};

export const listEntities = (types) => {

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  const ids = (state = [], action) => {
    switch (action.type) {
      case successType:
        return action.response.result;
      default:
        return state;
    }
  }

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case requestType:
        return true;
      case successType:
      case failureType:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({ ids, isFetching });
};
