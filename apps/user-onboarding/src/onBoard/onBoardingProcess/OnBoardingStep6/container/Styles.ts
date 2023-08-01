import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scroll: {
    margin: wp(5),
    marginTop: 0,
  },
  referralHeader: {
    marginTop: 18,
    width: '90%',
    color: Color.header_black,
    fontWeight: '500',
  },
  midBorder: {
    borderTopColor: Color.border_color,
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  main: {
    margin: 10,
  },
  name: {
    fontSize: 15,
  },
  container_textInput: {
    width: '95%',
    alignSelf: 'center',
    marginTop: -30,
  },
  buttonStyle: { marginBottom: hp(7), width: wp(80), alignSelf: 'center' },
});
