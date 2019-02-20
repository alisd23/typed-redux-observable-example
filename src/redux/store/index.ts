import { StateType, ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import userReducer, { UserAction } from './user';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootAction = UserAction;

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
