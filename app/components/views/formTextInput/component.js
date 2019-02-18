import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

import styles from './styles';

const FormTextInput = ({ input, ...otherProps }) => (
  <View style={styles.container}>
    <TextInput
      {...otherProps}
      style={styles.textInput}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
    />
  </View>
);

FormTextInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default FormTextInput;
