import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';
export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header_style: {
    borderBottomColor: Colors?.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.app_background,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  printAllSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  printFormText: {
    fontSize: hp(2.9),
    fontWeight: '600',
    color: Colors.dark_black,
  },
  button_style: {
    height: hp(5.5),
    width: wp(58),
    fontWeight: '600',
    marginRight: wp(2),
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  headerMemoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerMemoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingVertical: 16,
  },
});
