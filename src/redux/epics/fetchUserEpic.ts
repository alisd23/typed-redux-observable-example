import { Epic } from 'redux-observable';
import { of, empty } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { switchMap, filter, map, catchError, tap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { RootState, RootAction } from '../store';
import { IUser, userActions } from '../store/user';

function getGithubUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

const fetchUserEpic: Epic<RootAction, RootAction, RootState> = (action$) => {
  return action$.pipe(
    filter(isOfType('FETCH_USER')),
    switchMap(action => ajax
      .getJSON<IUser>(getGithubUrl(action.payload.username))
      .pipe(
        map(user => userActions.fetchUserSuccess(user)),
        catchError((error: AjaxError) =>
          of(userActions.fetchUserFailure(action.payload.username, error.xhr.response.message))
        )
      )
    ),
    catchError(() => empty())
  )
};

export default fetchUserEpic;
