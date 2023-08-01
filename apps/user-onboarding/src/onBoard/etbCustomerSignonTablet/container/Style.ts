import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp(3),
  },
  term_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
  },

  content_view: {
    flex: 1,
    backgroundColor: Color?.app_background,
    paddingHorizontal: wp(3),
  },
  title_text: {
    fontSize: 28,
    fontWeight: '600',
    color: Color.app_black,
    marginVertical: 16,
    lineHeight: 40,
    letterSpacing: -0.28,
  },

  info_text: {
    fontWeight: '400',
    marginTop: hp(1),
    fontSize: hp(1.6),
    color: Color.light_grey,
    textAlign: 'left',
  },

  buttonStyle: {
    width: wp(60),
    alignSelf: 'center',
    position: 'absolute',
  },
  resignTextStyle: {
    fontWeight: '600',
    fontSize: hp(2.1),
    color: Color.primary,
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  resignBoxStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.primary,
    position: 'absolute',
    width: wp(12),
    height: hp(4.7),
  },
  captureBox: {
    borderRadius: 12,
    borderColor: Colors.neutral_grey,
    backgroundColor: Colors.white,
  },
  term_info: {
    fontWeight: '400',
    fontSize: hp(1.4),
    color: Color.black,
    textAlign: 'left',
    marginLeft: wp(2),
  },
  check_box: {
    height: hp(2.2),
    width: hp(2.2),
    alignSelf: 'center',
  },
  errorMessage: {
    color: Color.error_red,
    fontSize: 15,
    height: 30,
    marginLeft: wp(5),
  },
  viewScroll: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: Color.neutral_grey,
    padding: 10,
    backgroundColor: Color.light_white,
  },
  viewCapture: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: Color.neutral_grey,
    backgroundColor: Colors.white,
  },
  bottom_view: {
    backgroundColor: Colors.white,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
  writeFullName: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    padding: 10,
    top:0,
    position:'absolute'
  },
  writeFullName2: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    padding: 10,
  left:0,
    position:'absolute'
  },
});
