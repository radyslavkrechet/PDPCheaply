import { StyleSheet } from 'react-native';

import COLORS from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: 'white',
  },
  avatarView: {
    flexShrink: 0,
    width: 50,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BRAND,
  },
  emailView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
  },
  whiteColor: {
    color: 'white',
  },
});
