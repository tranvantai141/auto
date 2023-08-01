import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  main_view: {
    height: hp(80),
    width: wp(100),
    backgroundColor: Color.background_color,
    alignSelf: 'center',
    paddingHorizontal: wp(3),
  },
  Container: { backgroundColor: '#f2f2f2', flex: 1, padding: 4 },
  Upperspace: {
    backgroundColor: '#ffffff',
    height: hp(8),
  },
  button_style: {
    width: wp(50),
    alignSelf: 'center',
    marginVertical: hp(3),
    height: hp(6.3),
  },
  heading_text: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 16,
    color:Color.app_black,
    lineHeight: 40,
    letterSpacing: -0.28,
  },
  dropdown: {
    height: hp(7),
    backgroundColor: '#ffffff',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 15,
    borderRadius: 7,
  },
  icon: {
    width: 18,
    height: 18,
    margin: 5,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  Login: {
    height: hp(5),
    width: wp(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
  },
  LoginText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  Dropdown: {
    width: wp('90'),
    height: 35,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  Opacity: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: hp(7),
  },
  info_heading_digi: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 10,
    lineHeight : 25,
    marginLeft : -5
  },
});
