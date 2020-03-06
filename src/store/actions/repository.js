import { schema } from 'normalizr';

import { thunkAction } from 'store/actions';
import { fetchGithubApiV3 } from 'store/actions/utils';
import { repositoryActionsTypes } from 'store/reducers/repository';

const repositorySchema = new schema.Entity('repositories');

const repositoryActionConfig = {
  types: repositoryActionsTypes,
  endpoint: (state, ...args) => fetchGithubApiV3('user/repos', state.session.token),
  schema: [repositorySchema]
};

export const fetchRepository = thunkAction(repositoryActionConfig);
