import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  heading: {
    color: Color.app_black,
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'row',
  },
  txt: {
    textAlign: 'left',
    color: Color.app_black,
    fontSize: wp(3.1),
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Color.light_grey,
    opacity: 1,
    marginTop: 10,
  },
  buttonBottom: {
    margin: hp(3),
    marginTop: hp(0),
  },
  checkView: {
    flexDirection: 'row',
    margin: hp(3),
    alignItems: 'center',
  },
  textCheck: {
    color: Color.app_black,
    fontSize: 12,
  },
  checkImage: {
    height: 28,
    width: 28,
    marginRight: 10,
  },
  scroll: {
    margin: wp(5),
    marginTop: 10,
    backgroundColor: Color.white,
  },
  viewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.light_grey,
    height: hp(6),
  },
  backArrowStyle: {
    height: hp(2.5),
    width: hp(2.5),
    marginLeft: 10,
  },
  backText: {
    fontSize: hp(1.7),
    marginLeft: wp(1),
    color: Color.app_black,
    fontWeight: '600',
  },
  midBorder: { borderWidth: 0.3, borderColor: Color.green, marginTop: 10, marginBottom: 10 },
  topView: { flex: 0.3, marginRight: 15, marginTop: 10 },
  bottomView: { flex: 0.7, marginTop: 10 },
  viewClose: {
    flex: 0.2,
    flexDirection: 'row',
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
