import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingFooter = ({ loading }) => {
  if (loading) {
    return (
      <ActivityIndicator style={styles.margin} />
    );
  }

  return null;
};

LoadingFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingFooter;
