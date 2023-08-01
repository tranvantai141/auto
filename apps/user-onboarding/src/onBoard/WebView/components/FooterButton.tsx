import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import { TestIds } from 'src/common/utils/TestIds';
import { translate } from 'src/common/utils/translations/translate';
import LinearGradient from 'react-native-linear-gradient';
import { IconArrowRight, IconHome } from '@assets/images';

type Props = {
  text?: string;
  textOther?: string;
  testId?: string;
  testOtherId?: string;
  isOtherButton?: boolean;
  isHiddenIcon?: boolean;
  isHiddenIconOther?: boolean;
  isDisabled?: boolean;
  isDisabledOther?: boolean;
  isLeftIcon?: boolean;
  isLeftIconOther?: boolean;
  isLoading?: boolean;
  isLoadingOther?: boolean;
  isNotLinearGradient?: boolean;
  isNotLinearGradientOther?: boolean;
  navigation?: any;
  onPress?: () => void;
  onPressOther?: () => void;
  styles?: StyleProp<ViewStyle>;
  stylesButton?: StyleProp<ViewStyle>;
  stylesOtherButton?: StyleProp<ViewStyle>;
  stylesButtonText?: StyleProp<TextStyle>;
  stylesOtherButtonText?: StyleProp<TextStyle>;
};

const FooterButton = (props: Props) => {
  return (
    <View style={[styles.footer, props?.styles]}>
      {props?.isOtherButton && (
        <TouchableOpacity
          disabled={props?.isDisabledOther || props?.isLoadingOther}
          testID={TestIds.gradient_button + props?.testOtherId}
          onPress={props?.onPressOther}
        >
          {props?.isNotLinearGradientOther ? (
            <View style={[styles.button, props?.stylesOtherButton]}>
              {!props?.isHiddenIconOther && props?.isLeftIconOther && (
                <IconHome style={styles.buttonIcon} />
              )}

              <Text
                style={[
                  props?.isLeftIconOther ? styles.buttonTextLeft : styles.buttonText,
                  props?.stylesOtherButtonText,
                ]}
              >
                {props?.textOther && props?.textOther.length > 0
                  ? props?.textOther
                  : translate('continue_text')}
              </Text>

              {!props?.isHiddenIconOther && !props?.isLeftIconOther && (
                <IconArrowRight style={styles.buttonIcon} />
              )}
            </View>
          ) : (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={!props?.isDisabledOther ? ['#5FB621', '#008047'] : ['#B5B5B5', '#B5B5B5']}
              style={[styles.button, props?.stylesOtherButton]}
            >
              {!props?.isHiddenIconOther && props?.isLeftIconOther && (
                <IconHome style={styles.buttonIcon} />
              )}

              <Text
                style={[
                  props?.isLeftIconOther ? styles.buttonTextLeft : styles.buttonText,
                  props?.stylesOtherButtonText,
                ]}
              >
                {props?.textOther && props?.textOther.length > 0
                  ? props?.textOther
                  : translate('continue_text')}
              </Text>

              {!props?.isHiddenIconOther && !props?.isLeftIconOther && (
                <IconArrowRight style={styles.buttonIcon} />
              )}
            </LinearGradient>
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        disabled={props?.isDisabled || props?.isLoading}
        testID={TestIds.gradient_button + props?.testId}
        onPress={props?.onPress}
      >
        {props?.isNotLinearGradient ? (
          <View style={[styles.button, props?.stylesButton]}>
            {!props?.isHiddenIcon && props?.isLeftIcon && <IconHome style={styles.buttonIcon} />}

            <Text
              style={[
                props?.isLeftIcon ? styles.buttonTextLeft : styles.buttonText,
                props?.stylesButtonText,
              ]}
            >
              {props?.text && props?.text.length > 0 ? props?.text : translate('continue_text')}
            </Text>

            {!props?.isHiddenIcon && !props?.isLeftIcon && (
              <IconArrowRight style={styles.buttonIcon} />
            )}
          </View>
        ) : (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={!props?.isDisabled ? ['#5FB621', '#008047'] : ['#B5B5B5', '#B5B5B5']}
            style={[styles.button, props?.stylesButton]}
          >
            {!props?.isHiddenIcon && props?.isLeftIcon && <IconHome style={styles.buttonIcon} />}

            <Text
              style={[
                props?.isLeftIcon ? styles.buttonTextLeft : styles.buttonText,
                props?.stylesButtonText,
              ]}
            >
              {props?.text && props?.text.length > 0 ? props?.text : translate('continue_text')}
            </Text>

            {!props?.isHiddenIcon && !props?.isLeftIcon && (
              <IconArrowRight style={styles.buttonIcon} />
            )}
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 96,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  button: {
    borderRadius: 12,
    width: 462,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisable: {
    borderRadius: 12,
    width: 462,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5B5B5',
  },
  otherButton: {
    borderWidth: 1,
    borderColor: '#008047',
    backgroundColor: '#FFFFFF',
    width: 'auto',
    paddingHorizontal: 16,
  },
  otherButtonDisable: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#B5B5B5',
    backgroundColor: '#FFFFFF',
    width: 'auto',
    paddingHorizontal: 16,
  },
  load: {},
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#FFFFFF',
    marginRight: 8,
  },
  otherButtonText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#008047',
    marginRight: 8,
  },
  otherButtonTextDisable: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#B5B5B5',
    marginRight: 8,
  },
  buttonTextLeft: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  otherButtonTextLeft: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#008047',
    marginLeft: 8,
  },
  otherButtonTextLeftDisable: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#B5B5B5',
    marginRight: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
});

export default FooterButton;
