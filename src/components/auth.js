import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { authenticate } from 'store/actions/session';
import { getSession } from 'store/reducers/session';

function Auth({ history, session, authenticate }) {
  const [state, setState] = React.useState({ token: '' })

  if (session.token) {
    if (history.location.state) {
      return <Redirect to={history.location.state} />
    } else {
      return <Redirect to='/' />
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(state.token);
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className='login-form-container'>
      <div className='login-form'>
        <form onSubmit={onSubmit}>
          <input type='text' name='token' onChange={onChange} />
          <button type='submit'>Submit with Github token</button>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { session: getSession(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (token) => dispatch(authenticate(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);