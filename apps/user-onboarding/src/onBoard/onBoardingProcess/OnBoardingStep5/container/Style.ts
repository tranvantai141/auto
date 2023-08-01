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
  },
  buttonStyle: {
    marginBottom: hp(7),
    width: wp(80),
    alignSelf: 'center',
  },
  midView: {
    height: hp(2.8),
    margin: 20,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: Color.light_grey,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textView: {
    fontSize: hp(1.6),
    marginRight: hp(3),
    color: Color.app_black,
  },
  listViews: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    flexDirection: 'row',
    flex: 1,
    borderRadius: hp(2),
    marginLeft: hp(2),
    marginRight: hp(2),
    height: hp(7),
    alignItems: 'center',
    margin: hp(1),
    opacity: 1,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  imageCheckUncheck: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  listNameView: {
    flex: 0.6,
    margin: 5,
  },
  optionsName: {
    color: Color.app_black,
    fontSize: hp(1.8),
  },
  noCheck: {
    flex: 0.2,
  },
  yesCheck: {
    flex: 0.1,
  },

  itemImage: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginLeft: hp(1.5),
  },
  textList: {
    color: Color.app_black,
    fontSize: hp(2.2),
    fontWeight: '600',
    marginLeft: 10,
  },
  topView: {
    flex: 0.9,
    flexDirection: 'row',
  },
  checkView: {
    flex: 0.1,
    justifyContent: 'center',
    marginRight: hp(1),
  },
});
