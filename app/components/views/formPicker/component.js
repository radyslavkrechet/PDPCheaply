import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Picker } from 'react-native';

import styles from './styles';

const FormPicker = ({
  input, children, label, ...otherProps
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
    </Text>
    <View style={styles.separator} />
    <Picker
      {...otherProps}
      onValueChange={input.onChange}
      selectedValue={input.value}
    >
      {children}
    </Picker>
  </View>
);

FormPicker.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  label: PropTypes.string.isRequired,
};

export default FormPicker;
