import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  titleText: {
    marginTop: hp(4),
    fontWeight: '600',
    fontSize: hp(3.5),
    color: Color.app_black,
    marginLeft: wp(15),
  },

  buttonStyle: { marginTop: hp(5), width: wp(80), alignSelf: 'center', marginBottom: hp(3) },
});
