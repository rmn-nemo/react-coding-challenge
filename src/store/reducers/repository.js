import { isEmpty } from 'lodash';

import { listEntities } from 'store/reducers';

export const LIST_REPOSITORY_REQUEST = 'LIST_REPOSITORY_REQUEST';
export const LIST_REPOSITORY_SUCCESS = 'LIST_REPOSITORY_SUCCESS';
export const LIST_REPOSITORY_FAILURE = 'LIST_REPOSITORY_FAILURE';

export const repositoryActionsTypes = [
  LIST_REPOSITORY_REQUEST,
  LIST_REPOSITORY_SUCCESS,
  LIST_REPOSITORY_FAILURE
]

export const repositoryReducer = listEntities(repositoryActionsTypes)

export function getRepositoryById(state, id) {
  return !isEmpty(state.entities.repositories)
    ? state.entities.repositories[id]
    : null;
}

export function getRepositiryIds(state) {
  return state.repositories.ids;
}