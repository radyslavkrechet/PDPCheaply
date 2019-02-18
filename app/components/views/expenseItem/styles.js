import { StyleSheet } from 'react-native';

import COLORS from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
  },
  icon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.BRAND,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    color: COLORS.GRAY,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  },
});
