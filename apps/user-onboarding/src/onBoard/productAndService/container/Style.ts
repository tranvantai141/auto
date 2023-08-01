import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Color from '../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  main_view: {
    height: hp(80),
    width: wp(100),
    backgroundColor: Color.light_grey,
    alignSelf: 'center',
    paddingHorizontal: wp(2.2),
    paddingBottom: wp(2),
  },
  title_text: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 16,
    color: Color.grey_black,
    lineHeight: 40,
  },
  button_style: {
    width: wp(50),
    alignSelf: 'center',
    marginTop: hp(3),
    height: hp(6.3),
  },
});
