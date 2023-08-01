import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark_grey,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 16,
    lineHeight: 40,
    letterSpacing: -0.28,
    color: Color.app_black,
    marginLeft: hp(2),
  },
  id_text: {
    marginTop: hp(2),
    fontWeight: '400',
    fontSize: hp(1.5),
    color: Color.light_black,
    marginLeft: wp(3),
    marginBottom: hp(1),
  },
  buttonStyle: {
    marginTop: hp(2),
    width: wp(56),
    alignSelf: 'center',
    marginBottom: hp(2),
    height: hp(5),
    flexDirection: 'row',
  },
  mainView: {
    marginHorizontal: wp(3),
  },
  mid_view: {
    paddingVertical: 12,
    backgroundColor: Color.white,
    // marginHorizontal: wp(3),
    // marginTop: hp(2),
    borderRadius: 12,
    borderColor: Color.border_grey,
    // borderWidth: 1,
    marginBottom: wp(3.5),
  },
  bottomView: {
    backgroundColor: Color.white,
  },
  errorView: {
    backgroundColor: Color.red_60,
    marginTop: wp(1.95),
    borderRadius: 8,
    marginHorizontal: wp(2.962),
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  errorImage: {
    // height: 15,
    // width: 15,
    marginRight: 12,
  },
  rightView: {
    position: 'relative',
  },
  topMainView: {
    justifyContent: 'space-between',
  },
});
