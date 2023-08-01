import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  section_title: {
    fontSize: hp(3),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: hp(5),
  },
  image_style: {
    alignSelf: 'center',
    marginTop: hp(5),
    height: hp(40),
    width: wp(45),
  },
  info_title: {
    fontSize: hp(1.5),
    alignSelf: 'center',
    padding: hp(1),
    color: Color.grey,
  },
  continue_button_style: {
    height: hp(6.3),
    width: wp(80),
    top: hp(40),
    alignSelf: 'center',
  },
  continue_button_text: {
    color: Color?.white,
    fontSize: hp(1.9),
    fontWeight: '600',
  },
  selectCard_button_style: {
    top: hp(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    borderRadius: hp(5),
    borderWidth: 1,
    borderColor: '#008047',
    padding:12
  },
  view1: {
    height: hp(14),
    width: hp(22),
    backgroundColor: Color.grey,
    top: hp(5),
    borderRadius: 10,
    left: hp(15),
  },
  view2: {
    left: 240,
    top: 120,
    // height: hp(45),
    // width: hp(12),
    // backgroundColor: Color.light_black,
    position: 'absolute',
    borderRadius: wp(2),
  },
  view3: {
    backgroundColor: Color.app_black,
    height: hp(1),
    width: hp(4),
    borderRadius: 10,
    alignSelf: 'center',
    margin: hp(2),
  },
  view4: {
    backgroundColor: Color.app_black,
    height: hp(20),
    width: hp(7),
    borderRadius: hp(1),
    alignSelf: 'center',
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  textView: {
    marginBottom: hp(2),
  },
  animatedView: {
    margin: hp(2),
  },
  bar1: { height: hp(3), width: hp(1.3), backgroundColor: Color.white },
  bar2: { height: hp(6), width: hp(1.3), backgroundColor: Color.white },
  bar3: { height: hp(16), width: hp(1.3), backgroundColor: Color.white },
  style_text_card_name: { color: '#008047', fontWeight: '400', fontSize: hp(1.9), marginLeft: wp(2) },
  style_view_card_selected: {  backgroundColor: '#E6F6EC', borderRadius: wp(3.5) }
});
