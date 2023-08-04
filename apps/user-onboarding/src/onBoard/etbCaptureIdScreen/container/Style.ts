import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';
export default StyleSheet.create({
  scanner: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  trans_view: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_style: {
    borderBottomColor: Colors?.black,
  },
  border_view: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: wp(22),
    top: hp(11),
    width: wp(54),
    height: hp(36),
    borderWidth: 2,
    borderColor: Colors?.light_green,
    borderRadius: 24,
  },
  camera_view: {
    width: wp(100),
    height: hp(58),
    backgroundColor: 'grey',
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: wp(0),
    borderRadius: 35,
    backgroundColor: '#008047',
    height: hp(9),
    width: hp(9),
    justifyContent: 'center',
  },
  captured_image: {
    flexDirection: 'column',
    backgroundColor: Colors?.white,
    width: wp(75),
    height: wp(75),
    borderRadius: 24,
    borderColor: Colors?.black,
    alignSelf: 'center',
  },
  camera_container: {
    flexDirection: 'column',
    backgroundColor: Colors?.white,
    width: wp(100),
    height: hp(58),
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: wp(50),
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 4,
    borderRadius: 24,
    overflow: 'hidden',
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});