import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scroll: {
    margin: wp(10),
    marginTop: 0,
  },
  buttonStyle: {
    marginBottom: hp(7),
    width: wp(80),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  head: {
    fontSize: hp(3),
    color: Color.header_black,
    textAlign: 'center',
  },
  belowHeading: {
    fontSize: hp(2),
    color: Color.header_black,
    textAlign: 'center',
  },
  codeImage: {
    height: wp(50),
    width: wp(50),
    alignSelf: 'center',
  },
});
