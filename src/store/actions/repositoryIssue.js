import { schema } from 'normalizr';

import { invert, map, orderBy, intersectionBy, pick, reduce, max, keys } from 'lodash';

import {
  getPrioritizedRepositoryIssueIds,
  repositoryIssueActionTypes,
  SWITCH_ISSUE_PRIORITY
} from 'store/reducers/repositoryIssue';

import { sessionStorage } from 'store/sessionStorage';

import { thunkAction } from 'store/actions';
import { fetchGithubApiV3 } from 'store/actions/utils';

const repositoryIssuesSchema = new schema.Entity('repositoryIssues');

const repositoryIssuesActionConfig = {
  types: repositoryIssueActionTypes,
  endpoint: (state, repository) => fetchGithubApiV3(`repos/${repository.owner.login}/${repository.name}/issues`, state.session.token),
  schema: [repositoryIssuesSchema]
};

export const fetchRepositoryIssues = thunkAction(repositoryIssuesActionConfig);

function toPriorityMap(ids) {
  return ids.reduce(
    (result, current, index) => {
      result[current] = index;
      return result
    }, {});
}

function toPriorityList(priorityMap) {
  return orderBy(
    map(priorityMap, (position, issueId) => ({ position, issueId })), 'position'
  ).map(issue => issue.issueId);
}

function calculatePriority(id, position, positionFrom, priorityMap) {
  if (position == positionFrom) {
    return priorityMap;
  }

  const positionMap = invert(priorityMap);

  if (max(keys(positionMap)) < position) {
    return { ...priorityMap, [id]: position + 1 };
  }

  const changeSet = { [id]: position };

  let currentPosition = position;
  let currentIssueId = positionMap[currentPosition];

  while (currentIssueId != id) {
    if (position < positionFrom) {
      changeSet[currentIssueId] = ++currentPosition;
    } else {
      changeSet[currentIssueId] = --currentPosition;
    }
    currentIssueId = positionMap[currentPosition];
  }
  return { ...priorityMap, ...changeSet };
}

export function mergeIssues(state, action) {
  const [repository] = action.args;
  const incomingIdMap = toPriorityMap(action.response.result);
  const prioritizedIdMap = toPriorityMap(state.priorityList[repository.id] || []);
  const commonIds = intersectionBy(keys(prioritizedIdMap), keys(incomingIdMap));
  const actualPrioritizedIdMap = pick(prioritizedIdMap, commonIds);
  const merged = reduce(
    orderBy(map(actualPrioritizedIdMap, (targetPosition, sourceId) => ({ targetPosition, sourceId })), 'targetPosition'),
    (result, { targetPosition, sourceId }) => {
      return calculatePriority(sourceId, targetPosition, result[sourceId], result);
    },
    incomingIdMap
  );

  return toPriorityList(merged);
}

export function switchIssuePriority(repositoryId, sourceId, targetPosition, sourcePosition) {
  return async (dispatch, getState) => {
    const prioritizedRepositoryIssueIdMap = calculatePriority(
      sourceId,
      targetPosition,
      sourcePosition,
      toPriorityMap(getPrioritizedRepositoryIssueIds(getState(), repositoryId))
    );

    const prioritizedRepositoryIssueIds = toPriorityList(prioritizedRepositoryIssueIdMap);

    sessionStorage.update({
      priorityList: { [repositoryId]: prioritizedRepositoryIssueIds }
    });

    dispatch({ type: SWITCH_ISSUE_PRIORITY, prioritizedRepositoryIssueIds, repositoryId });
  }
}
