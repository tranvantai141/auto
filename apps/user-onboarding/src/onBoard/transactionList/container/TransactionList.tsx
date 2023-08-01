import { widthPercentageToDP } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import { RouteNames } from '@routeNames';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDebounce from 'src/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import FilterBar from '../components/FilterBar';
import FilterModal, { FilterData } from '../components/FilterModal';
import HeaderTitle from '../components/HeaderTitle';
import PageSelectionView from '../components/PageSelectionView';
import TableDataView, { Sort } from '../components/TableDataView';
import { TransactionListProvider } from '../context/transactionListContext';
import {
  TRANSACTION_PER_PAGE,
  TRANSACTION_REQUEST_DATA_DEFAULT,
  getTransactionList,
  reset,
} from '../redux/actions/GetTransactionList';
import { TransactionRequestData } from '../typings';
import HeaderBar from '@screens/WebView/components/HeaderBar';

type ScreenState = 'loading' | 'empty' | 'success';
type ModalType = 'filter';

const TransactionList = (props: any) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();
  const { loading, response, error, selectedPage } = useAppSelector(
    (state) => state.transactionList
  );
  const [showedModal, setShowedModal] = useState<ModalType | null>(null);
  const [query, setQuery] = useState<string>('');
  const debounceQuery = useDebounce(query, 500);

  const [sortConfig, setSortConfig] = useState<Sort | null>({
    field: 'statusChangedDate',
    order: 'DESC',
  });
  const [filterData, setFilterData] = useState<FilterData | null>(null);

  const numberOfPage = useMemo(() => {
    return Math.ceil((response?.transactions?.total ?? 0) / TRANSACTION_PER_PAGE);
  }, [response]);

  const buildParamsFromFilterData = (filterData: FilterData | null, sort: Sort | null) => {
    const startDate = filterData?.rangeDate?.[0];
    const startDateString = startDate ? moment(startDate).format('DD/MM/YYYY') : '';
    const endDate = filterData?.rangeDate?.[1];
    const endDateString = endDate ? moment(endDate).format('DD/MM/YYYY') : '';
    const result: TransactionRequestData = {
      ...TRANSACTION_REQUEST_DATA_DEFAULT,
      provinceCode: filterData?.provinces.map((item) => item.code) ?? [],
      districtCode: filterData?.districts.map((item) => item.code) ?? [],
      communeCode: filterData?.wards.map((item) => item.code) ?? [],
      productRequest: filterData?.registerServices.map((item) => item.code) ?? [],
      classification: filterData?.classification.map((item) => item.code) ?? [],
      transactionStatus: filterData?.statuses.map((item) => item.code) ?? [],
      // dd/MM/yyyy from filterData/rangeDate/0 date to string
      statusChangedDateFrom: startDateString,
      statusChangedDateTo: endDateString,
      sortField: sort?.field ?? '',
      sortType: sort?.order ?? '',
    };
    return result;
  };

  const filterParams = useMemo<TransactionRequestData>(() => {
    return buildParamsFromFilterData(filterData, sortConfig);
  }, [filterData, sortConfig]);

  useEffect(() => {
    dispatch(
      getTransactionList({
        ...filterParams,
        keyword: debounceQuery,
        pageIndex: 0,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceQuery]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screenState = useMemo<ScreenState>(() => {
    if (loading) {
      return 'loading';
    }
    if (error || response?.transactions?.content.length === 0) {
      return 'empty';
    }
    return 'success';
  }, [loading, error, response]);

  const columnConfig = require('../assets/ColumnConfig.json');

  const countFilter = () => {
    let count = filterData?.provinces.length ?? 0;
    count += filterData?.districts.length ?? 0;
    count += filterData?.wards.length ?? 0;
    count += filterData?.rangeDate != null ? 1 : 0;
    count += filterData?.classification.length ?? 0;
    count += filterData?.statuses.length ?? 0;
    count += filterData?.registerServices.length ?? 0;
    return count;
  };

  function handleBackPress() {
    navigation.goBack();
  }

  return (
    <TransactionListProvider value={{ query: query }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
        {/* Modal */}
        <FilterModal
          filter={filterData}
          isVisible={showedModal === 'filter'}
          onBackDropPress={() => setShowedModal(null)}
          onClosePress={() => setShowedModal(null)}
          onFilterChanged={(data) => {
            setFilterData(data);
            setShowedModal(null);
            dispatch(
              getTransactionList({
                ...buildParamsFromFilterData(data, sortConfig),
                keyword: debounceQuery,
                pageIndex: 0,
              })
            );
          }}
        />

        {/* Header */}
        {/* <HeaderTitle
          testId={TestIds.card_scanner}
          color={Color.black}
          title={translate('title')}
          backTitle={translate('come_back')}
          onPress={() => handleBackPress()}
          header_style={styles.marginTop}
        /> */}
        <HeaderBar
          testId={TestIds.card_scanner}
          title={translate('title')}
          onPressBack={handleBackPress}
          isHiddenRight
          navigation={navigation}
        />
        {/* <View>
          <Text style={styles.title}>{translate('title')}</Text>
        </View> */}

        {/* Filter Bar */}
        <FilterBar
          filterCount={countFilter()}
          containerStyle={{ marginBottom: 16 }}
          onChangeText={setQuery}
          placeholder={translate('search_placeholder')}
          onFilterPress={() => {
            setShowedModal('filter');
          }}
        />

        {/* Loading */}
        {screenState === 'loading' && <Loader />}

        {/* Empty */}
        {screenState === 'empty' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 120, height: 120, marginBottom: 20 }}
              source={Images.search_empty}
            />
            <Text style={{ width: widthPercentageToDP(50), textAlign: 'center' }}>
              {translate('no_data')}
            </Text>
          </View>
        )}

        {/* Data */}
        {screenState === 'success' && (
          <>
            {/* Table data */}
            <TableDataView
              onSelectedRow={(row) => {
                navigation.navigate(RouteNames.transactionDetail.name, {
                  transactionId: row.transactionId ?? '',
                });
              }}
              numberOfRowPerPage={TRANSACTION_PER_PAGE}
              currentPage={selectedPage ?? 0}
              columns={columnConfig.columns}
              transactions={response?.transactions?.content ?? []}
              sort={sortConfig}
              onSortChanged={(sort) => {
                setSortConfig(sort);
                dispatch(
                  getTransactionList({
                    ...TRANSACTION_REQUEST_DATA_DEFAULT,
                    ...filterParams,
                    pageIndex: 0,
                    keyword: debounceQuery,
                    sortField: sort?.field ?? '',
                    sortType: sort?.order ?? '',
                  })
                );
              }}
            />

            {/* Page selection */}
            <PageSelectionView
              selectedPage={selectedPage ?? 0}
              numberOfPages={numberOfPage}
              onSelectedPage={(page) => {
                dispatch(
                  getTransactionList({
                    ...TRANSACTION_REQUEST_DATA_DEFAULT,
                    ...filterParams,
                    keyword: debounceQuery,
                    pageIndex: page - 1,
                  })
                );
              }}
            />
          </>
        )}
      </SafeAreaView>
    </TransactionListProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '400',
    color: '#1B1B1B',
    marginLeft: 24,
  },
  marginTop: {
    // marginTop: -4,
  }
});
export default TransactionList;
