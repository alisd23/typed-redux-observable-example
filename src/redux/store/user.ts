import { createAction, ActionType } from 'typesafe-actions';

export interface IUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  bio: string;
  html_url: string;
}

export interface UserState {
  data: IUser | null;
  loading: boolean;
  error: string | null;
}

// ACTIONS
const fetchUser = createAction(
  'FETCH_USER',
  action => (username: string) => action({ username })
);

const fetchUserSuccess = createAction(
  'FETCH_USER_SUCCESS',
  action => (user: IUser) => action({ user })
);

const fetchUserFailure = createAction(
  'FETCH_USER_FAILURE',
  action => (username: string, error: string) => action({ username, error })
);

export const userActions = {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
};

export type UserAction = ActionType<typeof userActions>;

// REDUCER
export const initialUserState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        data: action.payload.user,
        loading: false,
        error: null,
      };
    case 'FETCH_USER_FAILURE':
      return {
        data: null,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default reducer;
