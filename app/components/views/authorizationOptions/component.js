import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text } from 'react-native';

import COLORS from '../../../constants/colors';
import translations from '../../../i18n';

import styles from './styles';

const AuthorizationOptions = props => (
  <View style={styles.container}>
    <Button
      title={translations.t('sign_in')}
      color={COLORS.BRAND}
      onPress={props.onSignInButtonPress}
    />
    <Text style={styles.text}>
      {translations.t('or')}
    </Text>
    <Button
      title={translations.t('sign_up')}
      color={COLORS.BRAND}
      onPress={props.onSignUpButtonPress}
    />
  </View>
);

AuthorizationOptions.propTypes = {
  onSignInButtonPress: PropTypes.func.isRequired,
  onSignUpButtonPress: PropTypes.func.isRequired,
};

export default AuthorizationOptions;
