import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const EmptySate = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {text}
    </Text>
  </View>
);

EmptySate.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptySate;
