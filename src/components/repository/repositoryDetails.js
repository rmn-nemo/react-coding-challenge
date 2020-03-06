import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getRepositoryById } from 'store/reducers/repository';

function RepositoryDetails({ history, repository, selected }) {
  return (
    <div className={`${selected ? 'selected' : ''}`} onClick={() => history.push(`/repositories/${repository.id}/issues/`)}>
      {repository.name}
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return { repository: getRepositoryById(state, ownProps.repositoryId) };
}

export default connect(mapStateToProps)(withRouter(RepositoryDetails));