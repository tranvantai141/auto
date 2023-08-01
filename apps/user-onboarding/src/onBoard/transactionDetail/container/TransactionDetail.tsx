import React, { useEffect, useState } from 'react';

import Loader from '@components/loaders/ActivityIndicator';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import ContentView from '../components/ContentView';
import ErrorModal from '../components/ErrorModal';
import ErrorView from '../components/ErrorView';
import SideBar from '../components/SideBar';
import {
  dismissModalErrorMessage,
  getTransactionDetail,
  resetTransactionDetail,
} from '../redux/actions/GetTransactionDetailAction';
import { SideBarItemID, SideBarItemModel } from '../typings';

const SideBarItems: SideBarItemModel[] = [
  {
    id: 'transaction_info',
    title: 'sidebar_transaction_info',
    subItems: [],
  },
  {
    id: 'customer_info',
    title: 'sidebar_customer_info',
    subItems: [
      {
        id: 'customer_info_moc',
        title: 'sidebar_customer_info_moc',
        subItems: [],
      },
      {
        id: 'customer_info_addition',
        title: 'sidebar_customer_info_addition',
        subItems: [],
      },
      {
        id: 'customer_info_image',
        title: 'sidebar_customer_info_image',
        subItems: [],
      },
    ],
  },
  {
    id: 'compliance_info',
    title: 'sidebar_compliance_info',
    subItems: [],
  },
  {
    id: 'product_info',
    title: 'sidebar_product_info',
    subItems: [
      {
        id: 'product_info_customer_file',
        title: 'sidebar_product_info_customer_file',
        subItems: [],
      },
      {
        id: 'product_info_current_account',
        title: 'sidebar_product_info_current_account',
        subItems: [],
      },
      {
        id: 'product_info_ebank',
        title: 'sidebar_product_info_ebank',
        subItems: [],
      },
      {
        id: 'product_info_debit_ecard',
        title: 'sidebar_product_info_debit_ecard',
        subItems: [],
      },
      {
        id: 'product_info_debit_card',
        title: 'sidebar_product_info_debit_card',
        subItems: [],
      },
    ],
  },
  {
    id: 'terms_info',
    title: 'sidebar_terms_info',
    subItems: [],
  },
  {
    id: 'document',
    title: 'sidebar_document',
    subItems: [],
  },
];

const TransactionDetail = (props: any) => {
  const { navigation } = props;
  const transactionDetailId = props.route.params.transactionId;

  const [selectedSideBarID, setSelectedSideBarID] = useState<SideBarItemID>('transaction_info');
  const { isLoading, error, modalErrorMessage } = useAppSelector(
    (state: RootState) => state.transactionDetail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactionDetail(transactionDetailId));

    return () => {
      dispatch(resetTransactionDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionDetailId]);

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={Styles.container}>
      <ErrorModal
        isVisible={modalErrorMessage != null}
        display_message={modalErrorMessage ?? ''}
        onBackDropPress={() => dispatch(dismissModalErrorMessage())}
        onPressOk={() => dispatch(dismissModalErrorMessage())}
      />
      {/* <HeaderTitle
        title={translate('title')}
        backTitle={translate('btn_back')}
        onBackPress={() => navigation.goBack()}
      /> */}
      <HeaderBar
        testId={''}
        title={translate('title')}
        onPressBack={handleBackPress}
        isHiddenRight
        navigation={navigation}
      />
      <View style={Styles.body}>
        <SideBar
          style={Styles.sideBar}
          data={SideBarItems}
          selectedSideBarItemID={selectedSideBarID}
          onSelecteSideBarItem={(item) => {
            setSelectedSideBarID(item.id);
          }}
        />
        <View style={Styles.content}>
          {isLoading ? (
            <Loader />
          ) : error != null ? (
            <ErrorView error="Lấy chi tiết giao dịch không thành công, vui lòng thử lại" />
          ) : (
            <ContentView sideBarItemID={selectedSideBarID} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sideBar: {
    flex: 0.3,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  content: {
    flex: 0.7,
  },
});

export default TransactionDetail;
