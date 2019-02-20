import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import fetchUserEpic from './epics/fetchUserEpic';
import rootReducer, { RootAction, RootState } from './store';
 
const rootEpic = combineEpics(
  fetchUserEpic,
);

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

  const logger = createLogger();

  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
