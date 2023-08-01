import Color from '../../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { IconWarning } from '@assets/images';

type Props = {
  isVisible?: boolean;
  onPressBackHome?: () => void;
  messError?: string;
  onChangeText?: (text: string) => void;
};

const ErrorMessageModal = (props: Props) => {
  // const [currency, setCurrency] = useState('');
  // const [focusedId, setFocusedId] = useState(0);

  return (
    <Modal
      hasBackdrop={false}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropColor={'transparent'}
      onBackdropPress={props.onPressBackHome}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <View style={Styles?.button_view}>
          <IconWarning height={wp(7)} width={wp(7)} />
          {/* <Image source={Images.red_error} style={Styles.error} /> */}
        </View>

        <View style={Styles?.button_view}>
          <Text style={Styles.title_text_1}>Lỗi : </Text>
          <Text style={Styles.title_text}>{props?.messError}</Text>
        </View>

        <View style={Styles?.button_view}>
          <GradientButton
            buttonText={translate('close')}
            buttonStyle={Styles?.button_style2}
            onPress={props?.onPressBackHome}
            textStyle={Styles.button_text}
          />
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  title_text_1: {
    fontSize: hp(1.9),
    fontWeight: '600',
    color: Color.black,
    marginTop: hp(1),
  },
  title_text: {
    fontSize: hp(1.9),
    fontWeight: '400',
    color: Color.black,
    marginTop: hp(1),
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    height: hp(23),
    width: wp(55),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  button_view: { justifyContent: 'center', flexDirection: 'row' },
  button_style1: {
    backgroundColor: Color.white,
    width: wp(45),
    height: hp(4.5),
    alignSelf: 'flex-end',
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  button_text: {
    color: Color?.white,
    fontWeight: '600',
    fontSize: 19,
  },
  button_style2: { width: wp(22), height: hp(5.5), alignSelf: 'flex-end', flexDirection: 'row' },

  error: {
    height: wp(7),
    width: wp(7),
  },
});
export default ErrorMessageModal;
