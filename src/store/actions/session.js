import { INIT_SESSION } from '../reducers/session';
import { sessionStorage } from '../sessionStorage';

export function authenticate(token) {
  sessionStorage.save({ token });
  return { type: INIT_SESSION, token };
}
