import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { IconSearchNormal, IconSearchNormalGreen } from '@assets/images';
import TextInputSearch from '@screens/customerInformation/components/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '@components/loaders/ActivityIndicator';
import GradientButton from 'src/common/components/Button/GradientButton';
import { TestIds } from '@screens/customerInformation/assets/TestIds';
import Style from '@screens/customerInformation/container/Style';


type Props = {
  inputValue?: string;
  onChangeText: (text: string) => void;
  onPressSearch: () => void;
  loading?: boolean;

};

const SearchOtherPages = React.forwardRef (({ inputValue, onChangeText, onPressSearch , loading }: Props , ref : React.ForwardedRef<any>) => {
  
  // // const originRef = React.useRef<any>(null);
  // useImperativeHandle(ref, // forwarded ref
  //   function () {
  //     return {
  //       clear : () => {
  //         // setValue('');
  //         // onChangeText('');
  //       },
  //     } // the forwarded ref value
  //   }, [])

  const [value, setValue] = React.useState<string>(inputValue ? inputValue : '');
  const [errorText, setErrorText] = React.useState<string>( '');
  return (
    <View style={styles.viewContainer}>
      <View style={{ flex: 0.55 , justifyContent : 'center' }}>
        <Text style={styles.textStye}>
          Onboarding by Tablet
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 0.45, justifyContent: 'flex-end' , alignItems : 'center' , marginRight : wp(3) }}>
        <TextInputSearch
          ref={ref}
          maxLength={20}
          inputValue={value}
          onChangeText={(text) => {
            setValue(text.replace(/\s/g, ''));
            // if (text.includes(' ')) {
            //   setValue(text.trim());
            // } else {
            //   setValue(text);
            // }
            onChangeText(text);
            setErrorText(/[^A-Za-z 0-9]/g.test(text) ? 'Số GTTT Không chứa kí tự đặc biệt' : '')

          }}
          placeholder={translate('enterGTTTnumber')}
          errorText={errorText}
        />
        <GradientButton
          testIdValue={TestIds.existing_customers}
          buttonStyle={[
            styles.containerBtnSearch
          ]}
          toggleView
          onPress={onPressSearch}
          buttonText={'Kiểm tra'}
          isLoading={loading}
          useDisableColors={!(value && value.trim().length > 0 && !loading && errorText.trim().length <= 0)}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: Colors.light_grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginTop : hp(2.5),
    height : hp(6),
  },
  textStye: {
    fontSize: hp(2.5),
    color: Colors.black,
    fontWeight : '600',
    marginLeft : wp(3)
  },
  containerBtnSearch: {
    width: wp(14),
    height: hp(4.444),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.onboarding_grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft : wp(-0.5),
    marginTop : hp(0)
  },
  textSearch: {
    fontSize: 16,
    color: Colors.gray_50,
    fontWeight: '600',
    marginLeft: 10,
  },
  loaderStyle: {
    margin: 0,
  },
});
export default SearchOtherPages;
