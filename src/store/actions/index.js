import { normalize } from 'normalizr';

export const thunkAction = ({ types, endpoint, schema }) => (...args) => {
  return async (dispatch, getStore) => {

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected types to be an array of three elements.');
    }

    if (!types.every(t => typeof t === 'string')) {
      throw new Error('Expected types to be strings.');
    }

    if (typeof endpoint !== 'function') {
      throw new Error('Expected endpoint to be function.');
    }

    const [requestType, successType, failureType] = types;

    dispatch({ type: requestType });

    try {
      const response = await endpoint(getStore(), ...args);
      dispatch({ type: successType, response: normalize(response, schema), args });
    } catch (error) {
      dispatch({ type: failureType, error })
    }
  };
};
