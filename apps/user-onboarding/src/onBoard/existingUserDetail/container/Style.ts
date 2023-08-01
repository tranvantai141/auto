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
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    flex: 1,
    alignItems: 'center',
  },
  title: { color: Color.header_black, fontSize: 16, flex: 0.5 },
  itemBorder: {
    borderWidth: 0.5,
    borderBottomColor: Color.natural_grey,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    alignSelf: 'center',
    height: hp(6),
    width: hp(6),
  },
  header: {
    alignSelf: 'center',
    fontSize: 17,
    color: Color.header_black,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
  },
  id: {
    alignSelf: 'center',
    fontSize: 15,
    color: Color.header_black,
  },
  flatlistView: { backgroundColor: Color.light_grey, borderRadius: 10 },
});
