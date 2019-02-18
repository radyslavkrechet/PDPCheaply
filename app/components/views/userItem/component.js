import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const UserItem = ({ email }) => (
  <View style={styles.container}>
    <View style={styles.avatarView}>
      <Text style={[styles.text, styles.whiteColor]}>
        {email.charAt(0).toUpperCase()}
      </Text>
    </View>
    <View style={styles.emailView}>
      <Text style={styles.text}>
        {email}
      </Text>
    </View>
  </View>
);

UserItem.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UserItem;
