import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  titleText: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 28,
    lineHeight:40,
    letterSpacing:-0.28,
    color: Color.app_black,
    marginLeft: wp(5),
  },

  buttonStyle: {
    marginTop: hp(4),
    width: wp(80),
    alignSelf: 'center',
    marginBottom: hp(5),
  },
  mainView: { flexDirection: 'row' },
});
