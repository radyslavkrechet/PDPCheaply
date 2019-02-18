import { StyleSheet } from 'react-native';

import COLORS from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    margin: 15,
  },
  separator: {
    backgroundColor: COLORS.GRAY,
    height: 1,
  },
});
