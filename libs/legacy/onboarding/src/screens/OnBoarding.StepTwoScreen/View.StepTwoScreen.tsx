import React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './Styles.StepTwoScreen';
import ViewModel from './ViewModel.StepTwoScreen';
import { TStepTwoScreenProps } from './Model.StepTwoScreen';
import { IMAGES, THEMES } from '@src/assets';
import { InputComponent } from '@src/components';
import HelperManager from '@skeleton-app/sdk-managers/helper';

const StepTwoScreen: React.FC<TStepTwoScreenProps> = React.memo((props) => {
  const {
    email,
    setEmail,
    errorText,
    phoneNumber,
    selectedDate,
    setPhoneNumber,
    dismissKeyboard,
    setDateModalVisible,
  } = ViewModel(props);
  return (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.loginBackground}
      style={styles.imageBackground}
      {...HelperManager.setLocator(styles.SCREEN_TAG, `imageBackground`)}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={THEMES.title}>{'Email address'}</Text>
          <InputComponent
            testId={'email-textinput'}
            {...{
              value: email,
              setValue: setEmail,
              autoCapitalize: 'none',
              placeHolder: 'Enter email address',
              errorMessageText: 'Invalid email',
              onBlur: (trueCallBack, falseCallback) => () => {
                if (!HelperManager.validateEmail(email)) {
                  falseCallback();
                } else {
                  trueCallBack();
                }
              },
            }}
          />

          <Text style={THEMES.title}>{'Phone number'}</Text>
          <InputComponent
            testId={'phoneNumber-textinput'}
            {...{
              value: phoneNumber,
              setValue: setPhoneNumber,
              placeHolder: 'Enter phone number',
              keyboardType: 'decimal-pad',
              errorMessageText: 'Invalid phone number',
              onBlur: (trueCallBack, falseCallback) => () => {
                const passConditions = [] as Array<RegExp>;
                if (!HelperManager.isValid(phoneNumber, passConditions)) {
                  falseCallback();
                } else {
                  trueCallBack();
                }
              },
            }}
          />
          <View style={styles.dateOfBirthRow}>
            <Text style={styles.dateOfBirthText}>{'Date of birth'}</Text>
            <Text style={styles.dateOfBirthText}>{`Age: ${
              new Date().getFullYear() -
              new Date(selectedDate.getTime()).getFullYear()
            } years old`}</Text>
          </View>

          {!!errorText && <Text testID="errorText">{errorText}</Text>}

          <TouchableOpacity
            testID="setDateModalVisible"
            onPress={() => {
              setDateModalVisible(true);
            }}
            style={styles.dateOfBirthRow}
          >
            <Text style={styles.minAgeUsageNotice}>
              *The minimum age requirement is 15 years or older
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
});

StepTwoScreen.displayName = styles.SCREEN_TAG;
export default StepTwoScreen;
