import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(27.777),
  },
  logoStyle: {
    width: wp(80),
    height: hp(8),
    alignSelf: 'center',
  },
});
