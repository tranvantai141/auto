import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Color from '../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  main_view: {
    flex: 1,
    width: wp(100),
    backgroundColor: Color.light_grey,
    alignSelf: "center",
    paddingHorizontal: wp(2),
    paddingBottom: wp(2),
  },
  title_text: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 16,
    color: Color.app_black,
    lineHeight: 40,
    letterSpacing: -0.28,
  },
  button_style: {
    width: wp(60),
    alignSelf: "center",
    flexDirection: "row",
    height: hp(5),
    marginVertical:30
  },
  button_text_style: { fontSize: 20, fontWeight: "600" },
});
