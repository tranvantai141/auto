import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollView: {
    // height: hp(84),
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  icon_style: {
    height: hp(2),
    width: hp(2),
    marginRight: 10,
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
    marginTop: hp(1.5),
    fontSize: hp(1.6),
    color: Color.grey_text,
    textAlign: 'center',
  },
  button_style: {
    width: wp(28),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(5),
    height: hp(5),
    borderRadius: 12,
  },
  button_text: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: Color.primary,
  },
  button_text2: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: Color.white,
  },
  white_button: {
    width: wp(28),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(5),
    borderRadius: 12,
    borderColor: Color.primary,
    borderWidth: 1,
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_view: {
    width: wp(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: hp(5),
  },
});
