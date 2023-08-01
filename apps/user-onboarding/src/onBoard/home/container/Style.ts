import { StyleSheet } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

export default StyleSheet.create({
  topView: {
    flex: 0,
    backgroundColor: Color.white,
  },
  safeArea: {
    backgroundColor: Color.light_grey,
    flex: 1,
  },

  list: {
    marginTop: wp(2.696),
    flex: 1,
  },
  midView: {
    flexDirection: 'row',
    marginHorizontal:wp(3),
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp(2.2222),
  },

  listView: {
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: wp(2.696),
    paddingTop: wp(2.696),
    borderRadius: 12,
    marginBottom: hp(4),
    marginHorizontal:wp(3),
    flex: 1,
  },

  sectionTitle: {
    fontSize: hp(3.5),
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  buttonView: {
    width: wp(20),
    height: hp(4),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.header_black,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: hp(1.45),
    alignSelf: 'center',
    color: Color.header_black,
  },
  recentText: {
    fontSize: hp(1.45),
    alignSelf: 'flex-start',
    fontWeight: '600',
    color: Color.header_black,
  },
});
