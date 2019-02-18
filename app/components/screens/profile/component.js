import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import UserItem from '../../views/userItem';
import AuthorizationOptions from '../../views/authorizationOptions';

import styles from './styles';

const ProfileComponent = (props) => {
  if (props.signedIn) {
    return (
      <View style={styles.topMargin}>
        <UserItem email={props.user.email} />
      </View>
    );
  }

  return (
    <AuthorizationOptions
      onSignInButtonPress={props.onSignInButtonPress}
      onSignUpButtonPress={props.onSignUpButtonPress}
    />
  );
};

ProfileComponent.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  signedIn: PropTypes.bool.isRequired,
  onSignInButtonPress: PropTypes.func.isRequired,
  onSignUpButtonPress: PropTypes.func.isRequired,
};

export default ProfileComponent;
