import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { translate } from '../assets/translations/translate';
import Style from '../container/Style';
import Colors from '../assets/Colors';
import GradientButton from './GradientButton';
import Loader from '@components/loaders/ActivityIndicator';
import FooterButton from '@screens/WebView/components/FooterButton';
type Props = {
  isError?: boolean;
  onChangeSign?: () => void;
  onConfirmSign?: () => void;
  loading?: boolean;
  type?: string;
  disabled?: boolean;
};

const BottomButtonView = (props: Props) => {
  const isDisabled = !!(props?.loading || props?.isError || props?.disabled);
  return (
    <View>
      {/* <View style={Style.buttonView}>
        <TouchableOpacity
          style={[
            Style.touchableContainer,
            {
              borderColor: isDisabled ? Colors.border_color_light_grey : Colors.border_green,
            },
          ]}
          onPress={props?.onChangeSign}
          disabled={isDisabled}
        >
          {props?.type === 'YES' && props?.loading ? (
            <Loader color={Colors?.primary} style={{ margin: 0 }} />
          ) : (
            <Text
              style={[
                Style.touchableText,
                {
                  color: isDisabled ? Colors.border_color_light_grey : Colors.primary,
                },
              ]}
            >
              {translate('change_signature')}
            </Text>
          )}
        </TouchableOpacity>
        <GradientButton
          isLoading={props?.type === 'NO' && props?.loading ? true : false}
          buttonText={translate('confirm_signature_match')}
          disabled={isDisabled}
          useDisableColors={isDisabled}
          buttonStyle={Style.buttonStyle}
          onPress={props.onConfirmSign}
        />
      </View> */}

      <FooterButton
        text={translate('confirm_signature_match')}
        textOther={translate('change_signature')}
        isOtherButton
        isHiddenIcon
        isHiddenIconOther
        isNotLinearGradientOther
        isDisabled={isDisabled}
        isDisabledOther={isDisabled}
        isLoading={props?.type === 'NO' && props?.loading}
        isLoadingOther={props?.type === 'YES' && props?.loading}
        stylesButton={styles.btnConfirmSignatureMatch}
        stylesOtherButton={
          !isDisabled ? styles.btnChangeSignature : styles.btnChangeSignatureDisabled
        }
        stylesOtherButtonText={
          !isDisabled ? styles.btnChangeSignatureText : styles.btnChangeSignatureTextDisabled
        }
        onPress={props?.onConfirmSign}
        onPressOther={props?.onChangeSign}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnConfirmSignatureMatch: {
    width: 'auto',
    paddingHorizontal: 16,
  },
  btnChangeSignature: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#008047',
    backgroundColor: '#FFFFFF',
    width: 'auto',
    paddingHorizontal: 16,
  },
  btnChangeSignatureDisabled: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#B5B5B5',
    backgroundColor: '#FFFFFF',
    width: 'auto',
    paddingHorizontal: 16,
  },
  btnChangeSignatureText: {
    color: '#008047',
  },
  btnChangeSignatureTextDisabled: {
    color: '#B5B5B5',
  }
});
export default BottomButtonView;
