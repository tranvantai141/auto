import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { ColumnType, TransactionListItem } from '../typings';
import { useTransactionListContext } from '../context/transactionListContext';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import { transactionStatusName } from 'src/common/utils/transactionStatusName';

type ColumnConfig = {
  key: ColumnType;
  title: string;
  width: number;
};

export const columnTypeMap: Record<ColumnType, keyof TransactionListItem> = {
  no: 'serialNumber',
  idNumber: 'idCardNumber',
  fullName: 'customerFullName',
  phoneNumber: 'phoneNumber',
  cifNumber: 'cifNumber',
  accountNumber: 'currentAccountNumber',
  province: 'provinceName',
  district: 'districtName',
  ward: 'communeName',
  serviceType: 'productRequest',
  registerTime: 'statusChangedDate',
  status: 'transactionStatus',
};

export type Sort = { field: keyof TransactionListItem; order: 'ASC' | 'DESC' };

type Props = {
  currentPage: number;
  numberOfRowPerPage: number;
  columns: ColumnConfig[];
  transactions: TransactionListItem[];
  sort: Sort | null;
  onSortChanged: (sort: Sort | null) => void;
  onSelectedRow: (item: TransactionListItem) => void;
};

const TableDataView = ({
  columns,
  transactions,
  currentPage,
  numberOfRowPerPage,
  sort,
  onSortChanged,
  onSelectedRow,
}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
          <HeaderTableView
            columns={columns}
            sort={sort}
            onSelectColumn={(col) => {
              // exclude column 'no'
              if (['no'].includes(col)) {
                return;
              }
              const columnValue = columnTypeMap[col];
              if (sort?.field === columnValue) {
                onSortChanged({ field: columnValue, order: sort.order === 'ASC' ? 'DESC' : 'ASC' });
              } else {
                onSortChanged({ field: columnValue, order: 'ASC' });
              }
            }}
          />
          <FlatList
            data={transactions}
            renderItem={({ item, index }) => (
              <RowItem
                onPress={() => onSelectedRow(item)}
                numberOfRowPerPage={numberOfRowPerPage}
                page={currentPage}
                item={item}
                index={index}
                columns={columns}
              />
            )}
            keyExtractor={(item, index) => item.transactionId + index}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Row item of table view
const RowItem = ({
  page,
  item,
  columns,
  index,
  numberOfRowPerPage,
  onPress,
}: {
  page: number;
  numberOfRowPerPage: number;
  item: TransactionListItem;
  index: number;
  columns: ColumnConfig[];
  onPress: () => void;
}) => {
  const { query } = useTransactionListContext();

  const getValue = useCallback((valueKey: ColumnType) => {
    const value = function () {
      switch (valueKey) {
        case 'no':
          return index + numberOfRowPerPage * (page - 1) + 1;
        case 'phoneNumber':
          return item.phoneNumber;
        case 'registerTime':
          // raw date: dd/MM/yyyy HH:mm:ss
          // target date: dd/MM/yyyy
          return item.statusChangedDate.split(' ')[0];
        default:
          return item[columnTypeMap[valueKey]];
      }
    }();
    if (query.length > 1 && (value?.toString() ?? '').length > 0) {
      const regex = new RegExp(query, 'gi');
      return (<Text numberOfLines={3}>
        {`${value}`.split(regex).map((text, i) => {
          if (i === 0) {
            return text;
          }
          return [<Text key={i} style={{ color: '#EF6D00' }}>{query}</Text>, text];
        })}
      </Text>);
    } 
    return <Text numberOfLines={3}>{value}</Text>;
  }, [index, item, numberOfRowPerPage, page, query]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.rowItem}>
      {columns.map((column) => {
        return (
          <View key={column.key} style={{ width: column.width, paddingHorizontal: 4 }}>
            {column.key === 'status' ? (
              <StatusChip
                title={transactionStatusName[item.transactionStatus]}
                status={
                  item.transactionStatus === 'CANCEL'
                    ? 'yellow'
                    : item.transactionStatus === 'COMPLETE' || item.transactionStatus === 'SUCCESS'
                    ? 'green'
                    : item.transactionStatus === 'FAIL' || item.transactionStatus === 'ERROR'
                    ? 'red'
                    : item.transactionStatus === 'MANUAL'
                    ? 'purple'
                    : item.transactionStatus === 'SUBMITTED' || item.transactionStatus === 'PENDING'
                    ? 'blue'
                    : item.transactionStatus === 'OPEN'
                    ? 'gray'
                    : 'gray'
                }
              />
            ) : (
              getValue(column.key)
            )}
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

const HeaderTableView = ({
  columns,
  sort = null,
  onSelectColumn,
}: {
  columns: ColumnConfig[];
  sort?: Sort | null;
  onSelectColumn: (column: ColumnType) => void;
}) => {
  return (
    <View style={styles.header}>
      {columns.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onSelectColumn(item.key)}
            key={index}
            style={{
              width: item.width,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Text style={styles.tableHeaderText}>{translate(item.title)}</Text>
            {sort != null && sort.field === columnTypeMap[item.key] && (
              <Image
                resizeMode="contain"
                style={{
                  height: 10,
                  width: 20,
                  transform: sort.order === 'DESC' ? [] : [{ rotate: '180deg' }],
                }}
                source={Images.arrow_down}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },

  header: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.light_grey,
  },

  rowItem: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
  },

  tableHeaderText: {
    maxWidth: '80%',
    fontSize: 12,
    color: '#6D6D6D',
    fontWeight: '600',
  },
});

export default TableDataView;
