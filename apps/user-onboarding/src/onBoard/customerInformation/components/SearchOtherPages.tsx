import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useImperativeHandle, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { IconSearchNormal, IconSearchNormalGreen } from '@assets/images';
import TextInputSearch from './TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '@components/loaders/ActivityIndicator';
import { Camera } from 'react-native-vision-camera';

type Props = {
  inputValue?: string;
  errorText?: string;
  onChangeText: (text: string) => void;
  onPressSearch: () => void;
  loading?: boolean;

};

const SearchOtherPages = React.forwardRef (({ inputValue, onChangeText, onPressSearch, errorText , loading }: Props , ref : React.ForwardedRef<any>) => {

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
  return (
    <View style={styles.viewContainer}>
      <View style={{ flex: 0.38 }}>
        <Text style={styles.textStye}>
          {'Số GTTT khác nếu có \n'}
          <Text style={{ color: Colors.gray_60 }}>{'(không bắt buộc)'}</Text>
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
        <TextInputSearch
          ref={ref}
          maxLength={20}
          inputValue={value}
          onChangeText={(text) => {
            // setValue(text);
            setValue(text.replace(/[^a-zA-Z0-9]/g,''))
            onChangeText(text.replace(/[^a-zA-Z0-9]/g,''));
          }}
          placeholder={translate('enterGTTTnumber')}
          errorText={errorText}
        />
        <TouchableOpacity
          disabled={value && value.trim().length > 0 && !loading ? false : true}
          onPress={onPressSearch}
          style={[
            styles.containerBtnSearch,
            {
              borderColor:
                value && value.trim().length > 0 ? Colors.green_90 : Colors.onboarding_grey,
            },
          ]}
        >
          { loading ? (
              <Loader color={Colors?.primary} style={styles.loaderStyle} />
            ) : (
          <>
          {(value && value.trim().length > 0 && (
            <IconSearchNormalGreen width={wp(2.962)} height={wp(2.962)} />
          )) || <IconSearchNormal width={wp(2.962)} height={wp(2.962)} />}
          <Text
            style={[
              styles.textSearch,
              { color: value && value.trim().length > 0 ? Colors.green_90 : Colors.gray_50 },
            ]}
          >
            {'Tìm kiếm'}
          </Text>
          </> )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: wp(1.975),
    marginBottom: wp(1.975),
    justifyContent: 'space-between',
    borderRadius: 12,
    // height : hp(10)
  },
  textStye: {
    fontSize: hp(1.481),
    color: Colors.gray_100,
    lineHeight: 24,
  },
  containerBtnSearch: {
    width: wp(16.925),
    height: hp(4.444),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.onboarding_grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
