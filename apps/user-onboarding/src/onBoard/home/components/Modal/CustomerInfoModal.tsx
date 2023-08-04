import { IconCancel, IconEmpty } from '@assets/images';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '@assets/sizes/Sizes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
// import PDFView from 'react-native-view-pdf';
// import { convertFileToBase64 } from 'src/common/utils/ConvertFileToBase64';
import Colors from '../../assets/Colors';
import { translate } from '../../assets/translations/translate';
// import { useAppSelector } from '../../../../redux/hooks';
// import { RootState } from '../../../../redux/store';
import colors from '../../assets/Colors';
// import ImageInformation from '@screens/customerInformation/components/ImageInformation';
import Loading from '../Loading';
import MutilpleCifInfo from '@screens/customerInfo/components/MutipleCifInfo';
import {
  CustomerInforResult,
  // useCustomerInforResult,
} from '@screens/home/hooks/useCustomerInfoResult';
import PersonalDocumentInfoETB from '@screens/home/components/CustomerInfo/PersonalDocumentInfoETB';
import ListMemoETB from '@screens/customerInformation/components/ListMemoETB';
import SuplementaryInfoSection from '@screens/customerInfo/components/SuplementaryInfoSection';
import { SupplementalInfoDTO } from '@screens/customerInfo/typings';
// import { removeData } from '../../../../redux/slices/mocResultInfo/SupplementalInfo';
import ProductAndServiceView from '../CustomerInfo/ProductAndServiceView';
import ErrorView from '@screens/home/components/ErrorView';
import Banner from '@screens/customerInfo/components/Banner';
import { AppButton } from '@components/Button/AppButton';
import Color from '@screens/home/assets/Colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

type Props = {
  onBackdropPress?: () => void;
  onReloadPress?: (value: string) => void;
  isVisible?: boolean;
  testIdValue?: string;
  textSearch?: string;
  onClosePress: () => void;
  formTitle: string;
  rawFormTitle?: string;
  result?: CustomerInforResult;
  resultSupplymental?: CustomerInforResult;
  resultEBank?: CustomerInforResult;
  resultCard?: CustomerInforResult;
};

const CustomerInfoModal = (props: Props) => {
  const { textSearch, isVisible, onClosePress, onBackdropPress, onReloadPress, result,resultSupplymental,resultEBank , resultCard } = props;
  const [ht, setHt] = useState<number>(HEIGHT);
  const [wt, setWt] = useState<number>(WIDTH);
  const [orientation, setOrientation] = useState('portrait');
  // const [isLoading, setLoading] = useState<boolean>(true);
  // const [fileData, setFileData] = React.useState('');

  // const getContractFormUrls = useAppSelector((state: RootState) => state.GetContractFormSlice);

  const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    setHt(Dimensions.get('window').height);
    setWt(Dimensions.get('window').width);
    if (width < height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => getOrientation());
  }, [orientation]);

  // React.useEffect(() => {
  //   if (props?.isVisible) {
  //   }
  // }, [props?.isVisible]);


  const renderError = useCallback(() => {
    if (result?.result === 'ERROR') {
      return (
        <ErrorView
          error={result?.message ?? ''}
          resetErrorBoundary={null}
          onPressRetry={() => {
            onReloadPress && onReloadPress(textSearch ?? '');
          }}
        />
      );
    }
  }, [result]);

  const shouldShowRetryButton = useMemo(() => {
    if(result?.result === 'LOADING') return false;
    if (result?.result === 'ETB' && resultEBank?.productEbankStatus === 'FAILED') {
      return true;
    }
    if (result?.result === 'ETB' && resultCard?.productCardStatus === 'FAILED') {
      return true;
    }
    if (resultSupplymental?.result === 'ETB' && resultSupplymental?.supplementalInfo?.state !== 'SUCCESS') {
      return true;
    }
    return false;
  }, [result , resultSupplymental , resultEBank , resultCard]);

  // Callbacks render
  const renderErrorBanner = useCallback(() => {
  if (shouldShowRetryButton) {
        return (
          <Banner
            key="diffError"
            type="warning"
            style={{ marginHorizontal: 22, marginBottom: 16 }}
            action={
              <View style={{ minWidth: '30%', justifyContent: 'center' }}>
                <AppButton
                  type="gradient"
                  textStyles={{ fontSize: 16 }}
                  disabled={false}
                  onPress={() => {
                    onReloadPress && onReloadPress(textSearch ?? '');
                  }}
                  left="reload"
                  // loading={isRetryLoading}
                >
                  {translate('retry_button')}
                </AppButton>
              </View>
            }
          >
            {translate('retry_message')}
          </Banner>
        );
      }

    return null;
  }, [ result,resultSupplymental , resultEBank , resultCard, shouldShowRetryButton]);

  const renderLoading = useCallback(() => {
    if (result?.result === 'LOADING') {
      return <Loading />;
    }
  }, [result]);

  const renderLoadingMore = useCallback(() => {


    if (result?.result === 'LOADING' && resultSupplymental?.result === 'LOADING' && resultCard?.result === 'LOADING' && resultEBank?.result === 'LOADING')
        return null;


    if(result?.result === 'ERROR' || result?.result === 'CUSTOMER_NOT_EXIST' || result?.result === 'MUTIPLE_CIF')
      return null;

    if (result?.result !== 'LOADING' && resultSupplymental?.result !== 'LOADING' && resultCard?.result !== 'LOADING' && resultEBank?.result !== 'LOADING')
      return null;

      return (<ActivityIndicator style={Style.loader} size={20} color={Color.primary} />);

  }, [result , resultSupplymental , resultCard , resultEBank]);

  const renderCustomerNotExist = useCallback(() => {
    if (result?.result === 'CUSTOMER_NOT_EXIST') {
      return (
        <View style={Style.not_exist_container}>
          <IconEmpty width={wp(8)} height={wp(8)} style={{}} />
          <Text style={Style.labelText}>{translate('label_not_exist')}</Text>
        </View>
      );
    }
  }, [result]);

  // Multiple CIF info section
  const renderMultipleCifInfoSection = useCallback(() => {
    if (result?.result === 'MUTIPLE_CIF') {
      return (
        <View style={{ marginHorizontal: 16 }}>
          <MutilpleCifInfo cifInfos={result.cifs} isHighLine={false} />
        </View>
      );
    }
  }, [result]);

  // One CIF info section
  const renderOneCifInfoSection = useCallback(() => {
    if (result?.result === 'ETB') {
      return (
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: Colors.white,
            paddingVertical: hp(1),
            borderRadius: 10,
          }}
        >
          <PersonalDocumentInfoETB resultData={result} />
          <View style={{ marginTop: hp(3), marginRight: wp(2) }}>
            {result?.cifMemo.length > 0 ||
            (result?.accountList.length > 0 &&
              result.accountList.some((account) => (account.memoInfo ?? []).length > 0)) ? (
              <ListMemoETB resultData={result} />
            ) : (
              <View />
            )}
          </View>
        </View>
      );
    }
  }, [result]);

  // One CIF info section
  const renderSupplementalSection = useCallback(() => {
    if (resultSupplymental?.result === 'ETB') {
      return (
        <View
          style={{
            margin: 16,
            backgroundColor: Colors.white,
            paddingVertical: hp(1),
            borderRadius: 10,
          }}
        >
          <SuplementaryInfoSection
            loading={true}
            failded={resultSupplymental?.supplementalInfo?.state !== 'SUCCESS'}
            data={
              [...resultSupplymental?.supplementalInfo?.data].filter(
                (item) => item !== null
              ) as SupplementalInfoDTO[]
            }
            // onPressUpdate={() => {}}
            onPressClear={(key: string) => {
              //remove data in slice
            }}
           isError={false}
            onPressUpdate={()=>{}}/>
        </View>
      );
    }
  }, [result , resultSupplymental]);

  const renderProductionInformation = useCallback(() => {
    if (result?.result === 'ETB') {
      return (
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 8,
            marginTop: hp(2),
            marginBottom: hp(2),
            paddingBottom: 16,
            marginHorizontal: wp(2),
          }}
        >
          <View>
            <ProductAndServiceView resultEBank={resultEBank} resultCard={resultCard} resultAccount={result} />
          </View>
        </View>
      );
    }
  }, [result , resultEBank , resultCard]);

  return (
    <>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        onBackdropPress={onBackdropPress}
        style={Style.modal_view}
        animationIn={'fadeIn'}
        animationInTiming={10}
        animationOut={'fadeOut'}
        animationOutTiming={10}
        avoidKeyboard={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.light_grey,
          }}
        >
          <TouchableOpacity
            onPress={onClosePress}
            style={[
              Style.header_view,
              { paddingTop: ht * (3 / 100), paddingBottom: ht * (2 / 100) },
            ]}
          >
            <IconCancel height={hp(1.5)} width={hp(1.5)} />
            <Text style={Style.close_text}>{translate('close')}</Text>
          </TouchableOpacity>

          <ScrollView>
            <View style={Style.main_container}>
              <Text style={Style.titleText}>{translate('title')}
              </Text>
              {renderLoadingMore()}
              {renderError()}
              {renderErrorBanner()}
              {renderLoading()}
              {renderCustomerNotExist()}
              {renderMultipleCifInfoSection()}
              {renderOneCifInfoSection()}
              {renderSupplementalSection()}
              {renderProductionInformation()}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  main_container: {
    flex: 1,
    backgroundColor: colors.light_grey,
  },
  not_exist_container: {
    height: hp(12),
    backgroundColor: colors.white,
    marginHorizontal: hp(2.5),
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view: {
    margin: 0,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: wp(3.5),
    fontWeight: '500',
    marginVertical: wp(3),
    color: '#262626',
    marginTop: hp(2),
    marginLeft: heightPercentageToDP(3),
  },
  labelText: {
    fontSize: wp(2.1),
    fontWeight: '400',
    lineHeight: 40,
    letterSpacing: -0.28,
    color: '#959595',
  },
  close_icon: { height: hp(2.2), width: hp(2.2) },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: hp(2),
    backgroundColor: Colors.white,
  },
  close_text: {
    marginLeft: 6,
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  pdf_view: {
    backgroundColor: 'white',
    height: (83 / 100) * HEIGHT,
    alignSelf: 'center',
  },
  titleContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    height: hp(2.5),
    alignItems: 'center',
  },
  formTitle: {
    textAlign: 'center',
    marginHorizontal: 20,
    flex: 0.9,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: wp(3),
    color: Colors.black,
  },
  buttonView: {
    backgroundColor: 'white',
    paddingBottom: hp(3),
  },
  loader: {
    marginBottom : 20,
    marginLeft : 20
  },
});
export default CustomerInfoModal;
