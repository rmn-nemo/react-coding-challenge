import React from 'react';

import { connect } from 'react-redux';

import { fetchRepository } from 'store/actions/repository';
import { getRepositiryIds } from 'store/reducers/repository';

import RepositoryDetails from './repositoryDetails';

function RepositoryList({ repositories, fetchRepository, currentSelectionId }) {
  React.useEffect(
    () => { fetchRepository() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className='repository-content'>
      <p className='title'>Repository</p>
      <div className='column'>
        {repositories.map(repositoryId => <RepositoryDetails selected={currentSelectionId ? repositoryId == currentSelectionId : false} key={repositoryId} repositoryId={repositoryId} />)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { repositories: getRepositiryIds(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepository: (...args) => dispatch(fetchRepository(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);