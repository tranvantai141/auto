import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginTop: hp(6),
  },
  headerView: {
    width: '100%',
    top: 0,
    paddingTop: hp(1),
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 200,
  },
  mainContainer: {
    backgroundColor: Color.light_grey,
    flex: 1,
  },
  scroll: {
    padding: wp(4),
    marginTop: 0,
  },
  info_text1: {
    fontSize: hp(1.5),
    color: Color.app_black,
    fontWeight: '600',
  },
  info_text2: {
    fontSize: hp(1.5),
    color: Color.light_grey_text,
  },

  listViews: {
    borderBottomWidth: 1,
    borderBottomColor: Color.light_grey,
    flexDirection: 'row',
    flex: 1,
    marginLeft: hp(2),
    marginRight: hp(2),
  },
  imageCheckUncheck: {
    height: 20,
    width: 20,
    margin: 5,
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

  modalBtnsView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Color.light_grey,
    borderRadius: 10,
    height: hp(6.5),
    width: hp(7.5),
    flex: 0.4,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
  buttonAgree: {
    borderRadius: 5,
  },
  heading: {
    fontSize: 22,
    color: Color.app_black,
    alignSelf: 'center',
    fontWeight: '600',
  },
  headingbelow: {
    marginTop: 5,
    fontSize: 16,
    color: Color.app_black,
    textAlign: 'center',
  },
  buttonStyle: {
    width: wp(80),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonView: {
    paddingVertical: hp(2),
    backgroundColor: Colors.white,
  },
  heading_text: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 16,
    lineHeight: 40,
    letterSpacing: -0.28,   
    color:Colors.app_black
  },
});
