import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerView: {
    width: '100%',
    top: 0,
    paddingTop: hp(1),
    backgroundColor: Color.white,
  },
  scroll: {
    backgroundColor: Color.global_grey,
  },
  header: {
    alignSelf: 'center',
    fontSize: 13,
    color: Color.header_black,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
  },
  id: {
    alignSelf: 'center',
    fontSize: 12,
    color: Color.header_black,
  },
  midView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  topView: { marginLeft: hp(6), marginRight: hp(6) },
  button_check: {
    width: hp(10),
    alignSelf: 'center',
    height: hp(6.3),
    marginTop: 0,
    flex: 0.3,
  },
  txtInput: {
    fontSize: 14,
    padding: 10,
    color: Color.black,
    width: hp(25),
  },
  error: {
    fontSize: hp(1.5),
    color: Color.error_red,
    marginLeft: hp(7),
    marginTop: 5,
  },
  cancel: { marginRight: hp(1), height: hp(3), width: hp(3) },
  vieww: {
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    flex: 0.7,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginTop: hp(1),
  },
  top: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: hp(2),
  },
  border: {
    borderWidth: 0.7,
    borderColor: Color.grey,
    width: '74%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  check_mark: {
    height: hp(3),
    width: hp(3),
    marginRight: 10,
  },
  default_user: { height: hp(6), width: hp(6), margin: 10 },
  itemsView: {
    backgroundColor: Color.white,
    borderRadius: 10,
    flexDirection: 'column',
    padding: 15,
    marginBottom: hp(2),
  },
  styleHeading: {
    fontSize: hp(1.8),
    color: Color.natural_grey,
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    lineHeight: hp(2),
  },
  mainHeading: { fontSize: 28, fontWeight: '600' ,marginVertical:16,lineHeight:40,letterSpacing: -0.28,color:Colors.app_black},
  buttonStyle: { alignSelf: 'center', width: hp(40), marginBottom: hp(2) },
  modalView:{backgroundColor:'transparent',width:'60%',alignSelf:'center',justifyContent:'center',padding:20},
  button_style: { flexDirection: 'row' },
  loader:{
    justifyContent:'center'
  }

});
