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
    fontSize: hp(3),
    color: Color.app_black,
    textAlign: 'center',
  },
  titleText2: {
    fontWeight: '400',
    marginTop: hp(2),
    fontSize: hp(2),
    color: Color.grey_text,
    textAlign: 'center',
  },
  buttonStyle: { marginTop: hp(42), width: wp(80), alignSelf: 'center' },
  midView: {
    width: wp(70),
    borderWidth: 1,
    borderColor: Color.onboarding_grey,
    alignSelf: 'center',
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headingText: {
    marginVertical: hp(1),
    fontWeight: '600',
    fontSize: hp(1.6),
    color: Color.app_black,
    textAlign: 'center',
  },
});
