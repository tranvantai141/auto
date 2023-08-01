import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '../assets/Colors';
export default StyleSheet.create({
  root:{
    flex:1 ,
    backgroundColor: Colors.black
  },
  scanner: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  header_style: {
    borderBottomColor: Colors?.black,
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
