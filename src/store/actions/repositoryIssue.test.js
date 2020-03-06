import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { SWITCH_ISSUE_PRIORITY } from 'store/reducers/repositoryIssue';

import { switchIssuePriority } from './repositoryIssue';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  it('Should re-arrange issues by placing last issue to first position and shifting others to the right', () => {
    const repositoryId = '1';
    const issueIds = ['3', '2', '1'];

    const store = mockStore({
      repositoryIssues: {
        ids: issueIds,
        isFetching: false,
        priorityList: {}
      }
    });

    const expectedActions = [
      { type: SWITCH_ISSUE_PRIORITY, prioritizedRepositoryIssueIds: ['1', '3', '2'], repositoryId: '1' }
    ];

    store.dispatch(switchIssuePriority(repositoryId, '1', 0, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should re-arrange issues by placing first issue to last position and shifting others to the left', () => {
    const repositoryId = '1';
    const issueIds = ['3', '2', '1'];

    const store = mockStore({
      repositoryIssues: {
        ids: issueIds,
        isFetching: false,
        priorityList: {}
      }
    });

    const expectedActions = [
      { type: SWITCH_ISSUE_PRIORITY, prioritizedRepositoryIssueIds: ['2', '1', '3'], repositoryId: '1' }
    ];

    store.dispatch(switchIssuePriority(repositoryId, '3', 2, 0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should re-arrange issues by shifting only range from position the issue is moved from to target pisition', () => {
    const repositoryId = '1';
    const issueIds = ['5', '4', '3', '2', '1'];

    const store = mockStore({
      repositoryIssues: {
        ids: issueIds,
        isFetching: false,
        priorityList: {}
      }
    });

    const expectedActions = [
      { type: SWITCH_ISSUE_PRIORITY, prioritizedRepositoryIssueIds: ['5', '2', '4', '3', '1'], repositoryId: '1' }
    ];

    store.dispatch(switchIssuePriority(repositoryId, '2', 1, 3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});