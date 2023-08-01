import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import OnboardingProgressbar from '@components/onboarding/OnboardingProgressbar';
import { RouteNames } from '@routeNames';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import BottomButtonView from '../components/BottomButtonView';
import RetryErrorMessage from '../components/RetryErrorMessage';
import SignatureImageView from '../components/SignatureImageView';
import { getCustomerInfoFlagReq } from '../redux/actions/GetCustomerInfoFlagReq';
import { UpdateWetSignFlagReq } from '../redux/actions/UpdateWetSignFlagReq';
import { getWetSignatureRequest } from '../redux/actions/getWetSignature';
import { onUpdateWetSignFlagError, onUpdateWetSignFlagSuccess, resetUpdateWetSignFlag, setLoading } from '../redux/slices/UpdateWetSignFlagSlice';
import {
  CustomerInfoParams,
  CustomerInfoResultResponse,
  UpdateSignFlagParams,
} from '../typings/CustomerInfoParams';
import { IGetImage } from '../typings/I_Get_Image';
import Style from './Style';
import axiosTokenInstance from 'src/service/network/axios';
import { GENERATE_ECONTRACT_FORM } from '@screens/printApplicationForm/api/endpoints';
import { UPDATE_WET_SIGN_FLAG } from '../api/endpoints';
import { updateIsChangedWetSignature } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';

const EtbShowWetSignature = (props: any) => {
  const { navigation } = props;
  const [transaction_id, setTransaction_id] = useState<string>('');
  const [wantToChange, setWantToChange] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };
  const dispatch = useAppDispatch();

  const getCustomerInfoWetSign = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        const params = {
          transactionId: data,
        } as CustomerInfoParams;
        dispatch(getCustomerInfoFlagReq(params));
      }
    });
  };
  useEffect(() => {
    getCustomerInfoWetSign();
    getWetSignatureImage();
  }, []);

  const getCustomerInfoWetSignRes = useAppSelector(
    (state: RootState) => state.getCustomerInfoForWetSign
  );

  const UpdateWetSignFlagResult = useAppSelector(
    (state: RootState) => state.UpdateWetSignFlagResult
  );
  const getWetSignatureResult = useAppSelector((state: RootState) => state.getWetSignature);

  const onConfirmSignPress = () => {
    const CustomerInfoResultResp: CustomerInfoResultResponse = getCustomerInfoWetSignRes?.response;
    CustomerInfoResultResp?.updateIdInfo
      ? navigation.navigate(RouteNames.etbCaptureIdScreen.name)
      : navigation.navigate(RouteNames.otpScreen.name);
  };

  // Checking the update wet sign flag API response here then moving to another screens.
  useEffect(() => {
    if (UpdateWetSignFlagResult?.response?.result === 'updated') {
      if (wantToChange === 'YES') {
        setWantToChange('');
        dispatch(resetUpdateWetSignFlag());
        navigation.navigate(RouteNames.etbSignatureUpdateScreen.name);
      } else if (wantToChange === 'NO') {
        setWantToChange('');
        dispatch(resetUpdateWetSignFlag());
        onConfirmSignPress();
      }
    }
  }, [UpdateWetSignFlagResult, dispatch, navigation, wantToChange]);

  const getWetSignatureImage = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        setTransaction_id(data);
        const params: IGetImage = {
          transactionId: data,
        };
        dispatch(getWetSignatureRequest(params));
      }
    });
  };

  const UpdateWetSignFlag = (type: boolean) => {
    setWantToChange(type ? 'YES' : 'NO');
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        setTransaction_id(data);
        const params: UpdateSignFlagParams = {
          transactionId: data,
          updateCustomerWetSignature: type,
        };
        dispatch(UpdateWetSignFlagReq(params));
      }
    });
  };

  const confirmSignatureMatching = React.useCallback(async () => {
    try {
      const transactionId = await getData(TRANSACTION_ID);
      if (transactionId !== null) {
        const param: UpdateSignFlagParams = {
          transactionId: transactionId,
          updateCustomerWetSignature: false,
        };

      dispatch(setLoading(true));
      const resp = await axiosTokenInstance({
        method: 'post',
        url: UPDATE_WET_SIGN_FLAG,
        data: param,
      })

      dispatch(onUpdateWetSignFlagSuccess(resp?.data));
      dispatch(updateIsChangedWetSignature(param.updateCustomerWetSignature));

      await axiosTokenInstance({
        method: 'POST',
        url: GENERATE_ECONTRACT_FORM,
        data: {
          "transactionId": transaction_id,
          "requestType": "TRIGGER",
          "contractType": "OB_UPD_INFO", 
          "contractFormType": "PRINT",
          "formats": ["pdf"],
          "overprinted": false
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setWantToChange('');
      dispatch(resetUpdateWetSignFlag());
      onConfirmSignPress();
    }
    } catch (error: any) {
      dispatch(setLoading(false));
      const _error = {
        data: error?.response?.data || error?.message,
        status: error?.response?.status || error?.status,
      };
      dispatch(onUpdateWetSignFlagError(_error));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, onConfirmSignPress, transaction_id]);

  return (
    <>
      <View style={Style.headerView}>
        <OnboardingProgressbar
          testId={TestIds.show_wet_sign}
          onPress={handleGoBack}
          percentage={'40%'}
          cancel_registration
          onclickRightIcon={handleGoBack}
          right_heading={translate('stop_execution')}
          transaction_id={`#${transaction_id}`}
          navigation={navigation}
        />
      </View>

      <SafeAreaView style={Style.container}>
        <View style={Style.mainContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            style={{ flex: 1, width: '100%' }}
            keyboardVerticalOffset={hp(7)}
          >
            <ScrollView keyboardShouldPersistTaps="handled" style={Style.scroll}>
              {getWetSignatureResult?.error && (
                <TouchableOpacity onPress={getWetSignatureImage}>
                  <RetryErrorMessage />
                </TouchableOpacity>
              )}
              <Text testID={TestIds.heading_text} style={Style.heading_text}>
                {translate('compare_signatures')}
              </Text>
              <SignatureImageView
                isLoading={getWetSignatureResult?.loading ?? false}
                signatureImg={getWetSignatureResult?.response}
                isError={getWetSignatureResult?.error ? true : false}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          <BottomButtonView
            onChangeSign={() => {
              UpdateWetSignFlag(true);
            }}
            onConfirmSign={confirmSignatureMatching}
            disabled={!getWetSignatureResult?.response?.images?.length}
            type={wantToChange}
            loading={(UpdateWetSignFlagResult?.loading || getWetSignatureResult.loading) ?? false}
            isError={getWetSignatureResult?.error ? true : false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default EtbShowWetSignature;
