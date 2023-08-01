import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  sectionTitle: {
    fontSize: hp(3.8),
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: hp(5),
  },
  midView: {
    marginHorizontal: wp(20),
  },
});
