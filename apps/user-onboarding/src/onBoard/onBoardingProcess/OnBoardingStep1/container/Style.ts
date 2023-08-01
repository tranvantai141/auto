import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  titleText: {
    marginTop: hp(5),
    fontWeight: '600',
    fontSize: hp(3.1),
    color: Color.app_black,
    textAlign: 'center',
  },
  titleText2: {
    fontWeight: '400',
    marginTop: hp(2),
    fontSize: hp(1.6),
    color: Color.grey_text,
    textAlign: 'center',
  },
  buttonStyle: { marginTop: hp(50), width: wp(80), alignSelf: 'center' },
});
