import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  topView: {
    flex: 0,
    backgroundColor: Color.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  firstView: {
    marginTop: hp(15),
    width: wp(100),
  },
  secondView: {
    marginTop: hp(2),
    marginHorizontal: wp(18),
    borderRadius: 5,
    backgroundColor: Color.light_grey,
  },
  thirdView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp(5),
    width: wp(65),
    alignSelf: 'center',
  },
  fourthView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp(65),
    alignSelf: 'center',
    marginBottom: hp(12),
  },
  firstSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thirdSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoStyle: {
    height: hp(4.5),
    width: hp(4.5),
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  imageStyle: {
    height: hp(4.5),
    width: hp(4.5),
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  bgRectangleStyle: {
    alignSelf: 'center',
    marginTop: hp(1),
    width: wp(65),
    backgroundColor: 'yellow',
    borderRadius: 5,
    height: hp(10),
  },
  roundView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: wp(15),
    borderRadius: hp(4),
    backgroundColor: '#008047',
    height: hp(8),
    width: hp(8),
    justifyContent: 'center',
  },

  signSuccessTitle: {
    fontSize: hp(2.2),
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  informationTextTitle: {
    marginTop: hp(1),
    fontSize: hp(1),
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  customerNameText: {
    fontSize: hp(1),
    padding: hp(1),
    fontWeight: 'bold',
  },
  interestedNameText: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp(1),
    marginTop: hp(2),
    fontWeight: 'bold',
  },
  cifText: {
    fontSize: hp(1),
    padding: hp(1),
    fontWeight: 'normal',
  },
  buttonView: {
    width: wp(32),
    height: hp(4),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.green_border,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: hp(1.45),
    alignSelf: 'center',
    color: Color.green_border,
  },
  dividerView: {
    width: wp(62),
    backgroundColor: 'white',
    alignSelf: 'center',
    height: hp(0.1),
  },
  buttonStyle: {
    marginBottom: hp(7),
    width: wp(80),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonRoundStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: wp(5),
    borderRadius: hp(3.5),
    backgroundColor: '#008047',
    height: hp(7),
    width: hp(7),
    flexDirection: 'row',
  },
});
