import { isEmpty } from 'lodash';

import { listEntities } from 'store/reducers';
import { mergeIssues } from 'store/actions/repositoryIssue';

import { sessionStorage } from 'store/sessionStorage';

const LIST_REPOSITORY_ISSUE_REQUEST = 'LIST_REPOSITORY_ISSUE_REQUEST';
const LIST_REPOSITORY_ISSUE_SUCCESS = 'LIST_REPOSITORY_ISSUE_SUCCESS';
const LIST_REPOSITORY_ISSUE_FAILURE = 'LIST_REPOSITORY_ISSUE_FAILURE';

export const SWITCH_ISSUE_PRIORITY = 'SWITCH_ISSUE_PRIORITY';

export const repositoryIssueActionTypes = [
  LIST_REPOSITORY_ISSUE_REQUEST,
  LIST_REPOSITORY_ISSUE_SUCCESS,
  LIST_REPOSITORY_ISSUE_FAILURE
];

const repositoryIssueBaseReducer = listEntities(repositoryIssueActionTypes);

function getInitialState() {
  const session = sessionStorage.read();
  return {
    ids: [],
    isFetching: false,
    priorityList: { ...(isEmpty(session) || isEmpty(session.priorityList) ? {} : session.priorityList) }
  };
}

export const repositoryIssueReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SWITCH_ISSUE_PRIORITY:
      return {
        ...state,
        ids: action.prioritizedRepositoryIssueIds,
        priorityList: {
          ...state.priorityList,
          [action.repositoryId]: action.prioritizedRepositoryIssueIds
        }
      };
    case LIST_REPOSITORY_ISSUE_SUCCESS:
      const syncronized = mergeIssues(state, action);
      const [repository] = action.args;
      return {
        ...state,
        isFetching: false,
        ids: syncronized,
        priorityList: {
          ...state.priorityList,
          [repository.id]: syncronized
        }
      }
    default:
      return {
        ...repositoryIssueBaseReducer({ ids: state.ids, isFetching: state.isFetching }, action),
        priorityList: state.priorityList
      };
  }
};

export function getRepositoryIssueById(state, id) {
  return !isEmpty(state.entities.repositoryIssues)
    ? state.entities.repositoryIssues[id]
    : null;
}

export function getPrioritizedRepositoryIssueIds(state, repositoryId) {
  return isEmpty(state.repositoryIssues.priorityList[repositoryId])
    ? getRepositoryIssueIds(state)
    : state.repositoryIssues.priorityList[repositoryId];
}

export function getRepositoryIssueIds(state) {
  return state.repositoryIssues.ids;
}