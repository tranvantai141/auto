import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    width: wp(100),
    height: hp(100),
    backgroundColor: Colors.transparent_background, 
    zIndex: 999,
  },
  imageContainer: {
    height: wp(16.29),
    width: wp(16.29),
  },
});

export default Styles;