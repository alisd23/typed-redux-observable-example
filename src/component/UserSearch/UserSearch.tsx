import React, { useState } from 'react';

import useDebounce from '../../hooks/useDebounce';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { userActions, IUser } from '../../redux/store/user';

interface UserSearchResultProps {
  error: string | null;
  loading: boolean;
  user: IUser | null;
};

const UserSearchResult: React.FunctionComponent<UserSearchResultProps> = ({ user, error, loading }) => {
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (user) {
    return (
      <div className="user-info">
        <p>Username: {user.login}</p>
        <p>Name: {user.name}</p>
        <p>Bio: {user.bio}</p>
        <p>Company: {user.company}</p>
      </div>
    )
  } else { 
    return <p>User not found</p>;
  }
};

type UserSearchProps = UserSearchResultProps & typeof userActions;

const UserSearch: React.FunctionComponent<UserSearchProps> = ({ user, error, loading, fetchUser }) => {
  const [username, setUsername] = useState<string>('');

  // Debounce callback
  const debouncedFetchUser = useDebounce(
    (newUsername: string) => fetchUser(newUsername),
    500,
    []
  );

  function onUsernameChange(newUsername: string) {
    setUsername(newUsername);
    debouncedFetchUser(newUsername);
  }

  return (
    <div>
      <input
        value={username}
        onChange={e => onUsernameChange(e.target.value)}
      />
      <UserSearchResult
        user={user}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default connect(
  (state: RootState) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.data,
  }),
  userActions,
)(UserSearch);
