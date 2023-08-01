import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  topSection: {
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginBottom: hp(1),
  },
  userPicStyle: {
    height: wp(5.5),
    width: wp(5.5),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  logoStyle: {
    height: wp(6),
    width: wp(18),
    alignSelf: 'center',
  },
  backgroundStyle: {
    height: hp(92),
    width: wp(100),
  },
  onboardView: {
    backgroundColor: Color.white,
    top: hp(6.5),
    left: hp(6.5),
    position: 'absolute',
    height: wp(12),
    width: wp(33),
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  titleHeader: {
    fontSize: wp(3.3),
    fontWeight: '500',
    marginLeft: wp(2),
  },
  iconStyle: {
    height: wp(5),
    width: wp(5),
  },
});
