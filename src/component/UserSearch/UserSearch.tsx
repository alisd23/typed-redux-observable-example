import React, { useState } from 'react';
import { Input, Image, Card, Message, Loader } from 'semantic-ui-react'

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
  if (error) {
    return (
      <Message warning>
        <Message.Header>An Error Occurred</Message.Header>
        <p>{error}</p>
      </Message>
    );
  }
  if (user) {
    return (
      <Card centered>
        <Image
          fluid
          src={user.avatar_url}
        />
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>{user.login}</Card.Meta>
          <Card.Description>{user.bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span>Company: {user.company}</span>
        </Card.Content>
      </Card>
    );
  } else {
    return (
      <Message info>
        <Message.Header>No user found</Message.Header>
      </Message>
    );
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
    if (newUsername) {
      debouncedFetchUser(newUsername);
    }
  }

  return (
    <div>
      <Input
        value={username}
        loading={loading}
        placeholder="Search GitHub usernames"
        fluid
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
