import { sessionStorage } from 'store/sessionStorage';

export const INIT_SESSION = 'INIT_SESSION';
export const DESTROY_SESSION = 'DESTROY_SESSION';

function getInitialState() {
  const storage = sessionStorage.read() || {};
  return { token: storage.token, priority: {} };
}

const initialState = getInitialState();

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SESSION:
      return { ...state, token: action.token };
    case DESTROY_SESSION:
      return {};
    default:
      return state;
  }
};

export function getSession(state) {
  return state.session;
}
