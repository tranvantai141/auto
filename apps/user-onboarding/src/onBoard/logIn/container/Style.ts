import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scroll: {
    margin: hp(2),
    backgroundColor: Color.white,
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  belowText: {
    fontSize: 16,
    color: Color.app_green,
  },
});
