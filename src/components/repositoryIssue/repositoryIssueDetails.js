import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import moment from 'moment';

import { getRepositoryIssueById } from 'store/reducers/repositoryIssue';

function RepositoryIssueDetails({ issue }) {
  return (
    <div className='issue'>
      <p>{issue.title}</p>
      <div className='issue-details'>
        <p>{issue.created_at}</p>
        <p>{moment(issue.updated_at).fromNow()}</p>
        <img src={issue.user.avatar_url} alt='Avatar' className='avatar' />
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return { issue: getRepositoryIssueById(state, ownProps.issueId) };
}

export default connect(mapStateToProps)(withRouter(RepositoryIssueDetails));