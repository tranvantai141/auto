import React, { useState } from 'react';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Colors from '../assets/Colors';
import FormAddress from './FilterModal/FormAddress';
import Header from './FilterModal/Header';
import FormDate from './FilterModal/FormDate';
import { ListItem } from 'src/typings/global';
import FormSelection from './FilterModal/FormSelection';
import { RefreshIcon } from '@assets/images';

type Props = {
  isVisible: boolean;
  filter?: FilterData | null;
  onBackDropPress?: () => void;
  onClosePress: () => void;
  onFilterChanged: (filter: FilterData) => void;
};

type Item = Pick<ListItem, 'code' | 'name'>;

const REGISTER_SERVICES: Item[] = [
  { code: 'CREATE_CIF', name: 'Hồ sơ thông tin khách hàng cá nhân' },
  { code: 'UPDATE_INFOMATION', name: 'Thay đổi thông tin khách hàng cá nhân' },
  { code: 'OPEN_CURRENT_ACCOUNT', name: 'Tài khoản tiền gửi' },
  { code: 'REGISTER_DIGI_BANK', name: 'Ngân hàng điện tử' },
  { code: 'CREATE_DEBIT', name: 'Thẻ ghi nợ' },
];

const STATUSES: Item[] = [
  // { code: 'OPEN', name: 'Chờ xử lý' },
  { code: 'SUBMITTED', name: 'Chờ xử lý' },
  { code: 'COMPLETE', name: 'Thành công' },
  { code: 'FAIL', name: 'Không thành công' },
  { code: 'MANUAL', name: 'Xử lý thủ công' },
  { code: 'CANCEL', name: 'Dừng thực hiện' },
];

const CLASSIFICATION: Item[] = [
  { code: 'NEW', name: 'Khách hàng mới' },
  { code: 'EXISTING', name: 'Khách hàng hiện hữu' },
];

export type FilterData = {
  provinces: Item[];
  districts: Item[];
  wards: Item[];
  rangeDate: [Date, Date] | null;
  registerServices: Item[];
  statuses: Item[];
  classification: Item[];
};

const defaultFilterData: FilterData = {
  provinces: [],
  districts: [],
  wards: [],
  rangeDate: null,
  registerServices: [],
  statuses: [],
  classification: [],
};

const FilterModal = ({
  onBackDropPress,
  isVisible,
  onClosePress,
  filter,
  onFilterChanged,
}: Props) => {
  const [filterData, setFilterData] = useState<FilterData>(filter ?? defaultFilterData);

  return (
    <Modal
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={Styles.modal}
      isVisible={isVisible}
      hasBackdrop={true}
      backdropColor={Colors.black}
      onBackdropPress={onBackDropPress}
      backdropOpacity={0.5}
    >
      <View style={Styles.modalContainer}>
        <Header title={'Bộ lọc tìm kiếm'} onClosePress={onClosePress} />
        <ScrollView style={Styles.scrollContainer}>
          <View style={{ height: 10 }} />
          <FormAddress
            provinces={filterData.provinces.map((item) => {
              return { ...item, id: 0 };
            })}
            districts={filterData.districts.map((item) => {
              return { ...item, id: 0 };
            })}
            communes={filterData.wards.map((item) => {
              return { ...item, id: 0 };
            })}
            onSelectedProvinces={(provinces) => {
              setFilterData({ ...filterData, provinces });
            }}
            onSelectedDistricts={(districts) => {
              setFilterData({ ...filterData, districts });
            }}
            onSelectedCommunes={(wards) => {
              setFilterData({ ...filterData, wards });
            }}
          />
          <FormDate
            range={filterData.rangeDate}
            onChanged={(start, end) => {
              setFilterData({ ...filterData, rangeDate: [start, end] });
            }}
          />
          <FormSelection
            title={'Dịch vụ đăng ký'}
            data={REGISTER_SERVICES}
            keyExtractor={(item) => item.code ?? ''}
            onSelected={(selected) => {
              setFilterData({ ...filterData, registerServices: selected });
            }}
            selected={filterData.registerServices}
            renderItem={(item) => item.name ?? ''}
          />
          <FormSelection
            title={'Tình trạng bản ghi'}
            data={STATUSES}
            keyExtractor={(item) => item.code ?? ''}
            onSelected={(selected) => {
              setFilterData({ ...filterData, statuses: selected });
            }}
            selected={filterData.statuses}
            renderItem={(item) => item.name ?? ''}
          />
          <FormSelection
            title={'Phân loại'}
            data={CLASSIFICATION}
            keyExtractor={(item) => item.code ?? ''}
            onSelected={(selected) => {
              setFilterData({ ...filterData, classification: selected });
            }}
            selected={filterData.classification}
            renderItem={(item) => item.name ?? ''}
          />
        </ScrollView>
        <View style={Styles.actionContainer}>
          <TouchableOpacity
            onPress={() => {
              setFilterData(defaultFilterData);
              onFilterChanged(defaultFilterData);
            }}
            style={[Styles.secondaryButton, { flexDirection: 'row' }]}
          >
            <RefreshIcon style={{ marginRight: 8 }} />
            <Text style={Styles.secondaryButtonText}>Xóa bộ lọc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onFilterChanged(filterData)}
            style={Styles.primaryButton}
          >
            <Text style={Styles.primaryButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 12,
    width: wp(80),
    height: hp(68),
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.light_grey,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'flex-end',
    paddingRight: 24,
  },
  primaryButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.app_green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 20,
    marginRight: 16,
  },
  secondaryButtonText: {
    color: Colors.app_green,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;
