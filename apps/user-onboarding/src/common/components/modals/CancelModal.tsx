import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import CancelButton from '@components/Button/CancelButton';
import GradientButton from '@components/Button/GradientButton';
import TextWithRadioButton from '@components/onboarding/TextWithRadioButton';
import React, { Dispatch, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from 'src/common/utils/Colors';
import Images from 'src/common/utils/Images';
import { translate } from 'src/common/utils/translations/translate';
import {
  clearCacheTransaction,
  handleCancelApi,
} from 'src/redux/actions/cancelTransaction/CancelTransaction';
import { useAppDispatch } from 'src/redux/hooks';
import Modal from 'react-native-modal';
import Color from '@screens/productAndService/assets/Colors';
import useTransactionId from 'src/hooks/useTransactionId';

type Props = {
  visible: boolean;
  closeModal?: () => void;
  navigation?: any;
  setVisible?: Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
};

const CancelModal = (props: Props) => {
  const transactionId = useTransactionId() ?? '';
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(false);
  const [otherReasonMessage, setOtherReasonMessage] = React.useState('');
  const dispatch = useAppDispatch();
  const handleRadioClick = (option: string) => {
    setSelectedOption(option);
  };
  const handleCancelTransaction = () => {
    if (selectedOption == '') {
      setError(true);
    } else {
      let reason = selectedOption;
      if (
        selectedOption === translate('other_reason') &&
        otherReasonMessage !== '' &&
        transactionId
      ) {
        reason = selectedOption.concat(`: ${otherReasonMessage}`);
      }
      props.setVisible?.(false);
      dispatch(clearCacheTransaction(null, transactionId));
      dispatch(handleCancelApi(reason, props.navigation));
      props.onCancel?.();
    }
  };
  return (
    <Modal isVisible={props.visible} style={Style.modal_view} hasBackdrop={true}>
      <View style={Style.mainContainer}>
        <View style={Style.container}>
          <View>
            <Text style={Style.heading}>{translate('cancel_customer_registeration')}</Text>
            <Text style={Style.text}>{translate('are_you_sure_cancel')}</Text>
          </View>
          <View style={Style.separator} />
          <ScrollView>
            <View>
              <Text style={[Style.text, { color: error ? Colors.error_red : Colors.black }]}>
                {translate('select_reason')}
              </Text>
              <TextWithRadioButton
                selected={selectedOption === translate('customer_change_need')}
                selectedText={translate('customer_change_need')}
                selectedImage={Images.unselectedRadio}
                onPress={() => handleRadioClick(translate('customer_change_need'))}
              />
              <TextWithRadioButton
                selected={selectedOption === translate('customer_memo_info')}
                selectedText={translate('customer_memo_info')}
                selectedImage={Images.selectedRadio}
                onPress={() => handleRadioClick(translate('customer_memo_info'))}
              />
              <TextWithRadioButton
                selected={selectedOption === translate('other_reason')}
                selectedText={translate('other_reason')}
                selectedImage={Images.unselectedRadio}
                onPress={() => handleRadioClick(translate('other_reason'))}
              />
              {selectedOption == translate('other_reason') && (
                <TextInput
                  onChangeText={(text) => setOtherReasonMessage(text)}
                  style={Style.inputBox}
                  maxLength={50}
                  placeholder={translate('enter_reason')}
                />
              )}
            </View>
          </ScrollView>
          <View style={Style.bottomView}>
            <CancelButton
              buttonStyle={Style.gradientBtn}
              textStyle={Style.gradientText}
              buttonText={translate('not_cancel')}
              onPress={props.closeModal}
            />
            <GradientButton
              textStyle={Style.gradientText}
              buttonStyle={Style.gradientBtn}
              buttonText={translate('i_want_to_cancel')}
              onPress={() => handleCancelTransaction()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Style = StyleSheet.create({
  modal_view: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: wp(60),
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border_color,
  },
  separator: { borderBottomWidth: 1, borderBottomColor: Colors.light_grey, marginVertical: 10 },
  heading: {
    fontSize: hp(2.3),
    fontWeight: '600',
    color: Colors.app_black,
    marginBottom: hp(0.5),
  },
  text: {
    color: Colors.black,
    fontSize: hp(1.5),
    fontWeight: 'normal',
    marginVertical: hp(1.2),
  },
  gradientBtn: {
    width: wp(20),
    height: 55,
    marginTop: 0,
  },
  gradientText: {
    fontSize: hp(1.5),
    fontWeight: '600',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(2),
  },
  cancelBtn: {
    backgroundColor: Colors.white,
  },
  inputBox: {
    height: hp(4.5),
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderRadius: 10,
    padding: hp(1),
    fontSize: hp(1.5),
  },
});

export default CancelModal;
