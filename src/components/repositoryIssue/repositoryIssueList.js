import React from 'react';

import { connect } from 'react-redux';

import { findIndex, isEmpty } from 'lodash';

import { fetchRepositoryIssues, switchIssuePriority } from 'store/actions/repositoryIssue';
import { getRepositoryById } from 'store/reducers/repository';
import { getPrioritizedRepositoryIssueIds, getRepositoryIssueIds } from 'store/reducers/repositoryIssue';
import RepositoryList from '../repository/repositoryList';

import RepositoryIssueDetails from './repositoryIssueDetails';

function RepositoryIssueList({ isRepositoryIssueReady, isRepositoryReady, repository, repositoryId, repositoryIssues, fetchRepositoryIssues, switchIssuePriority }) {

  const [state, setState] = React.useState({ dragging: null, position: null });

  React.useEffect(
    () => { isRepositoryReady && fetchRepositoryIssues(repository) },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRepositoryReady]
  );

  const onDragStart = (e, source) => {
    setState({
      ...state,
      dragging: source,
      position: findIndex(repositoryIssues, (id) => id === source)
    })
  };

  const onDrop = (e, target) => {
    switchIssuePriority(
      repositoryId,
      state.dragging,
      findIndex(repositoryIssues, (id) => id === target),
      state.position,
    );
  };

  // For onDrop to emit
  const onDragOver = (e) => e.preventDefault();

  return (
    <div className='issue-dashboard'>
      <RepositoryList currentSelectionId={repositoryId} />
      <div className='issue-content'>
        <p className='title'>Tasks</p>
        <div className='column'>
          {isRepositoryIssueReady && repositoryIssues.map(issueId => (
            <div key={issueId}
              draggable='true'
              onDragStart={(e) => onDragStart(e, issueId)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, issueId)}>
              <RepositoryIssueDetails issueId={issueId} />
            </div>)
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const { id: repositoryId } = ownProps.match.params;
  const repository = getRepositoryById(state, repositoryId);
  return {
    repositoryId, repository,
    repositoryIssues: getPrioritizedRepositoryIssueIds(state, repositoryId),
    isRepositoryIssueReady: !isEmpty(getRepositoryIssueIds(state)),
    isRepositoryReady: !isEmpty(repository)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepositoryIssues: (repository) => dispatch(fetchRepositoryIssues(repository)),
    switchIssuePriority: (repositoryId, sourceId, sourcePosition, targetId, targetPosition) => dispatch(switchIssuePriority(repositoryId, sourceId, sourcePosition, targetId, targetPosition))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryIssueList);
