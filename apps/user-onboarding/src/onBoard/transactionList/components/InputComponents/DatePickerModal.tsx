import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../assets/Colors';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

type Props = {
  open?: boolean;
  startDate?: Date;
  endDate?: Date;
  onConfirm: (startDate: Date, endDate: Date) => void;
  onCancel: () => void;
};

const DatePickerModal = ({ onCancel, open, onConfirm, startDate, endDate }: Props) => {
  const defaultStartDate = moment().subtract(6, 'days').toDate();
  const defaultEndDate = moment().toDate();

  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate ?? defaultStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate ?? defaultEndDate);

  const isValid = useMemo(() => {
    // Range not more than 7 days
    return moment(selectedEndDate).diff(selectedStartDate, 'days') <= 7;
  }, [selectedStartDate, selectedEndDate]);

  return (
    <Modal
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={Styles.modal}
      isVisible={open}
      hasBackdrop={true}
      backdropColor={Colors.black}
      onBackdropPress={onCancel}
      backdropOpacity={0.5}
    >
      <View style={Styles.modalContainer}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 20, textAlign: 'center' }}>
          Chọn ngày lọc
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <DatePicker
            style={{ width: wp(32) }}
            mode="date"
            date={selectedStartDate}
            maximumDate={defaultEndDate}
            onDateChange={(date) => {
              setSelectedStartDate(date);
            }}
          />
          <DatePicker
            style={{ width: wp(32) }}
            mode="date"
            date={selectedEndDate}
            onDateChange={(date) => {
              setSelectedEndDate(date);
            }}
          />
        </View>
        {!isValid && (
          <Text style={{ color: Colors.error_red, textAlign: 'center', marginTop: 10 }}>
            {'Vui lòng chọn khoảng thời gian tối đa 7 ngày'}
          </Text>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity onPress={onCancel} style={[Styles.button, Styles.buttonCancel]}>
            <Text style={{ fontSize: 16, fontWeight: '400' }}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isValid) {
                onConfirm(selectedStartDate, selectedEndDate);
              }
            }}
            style={
              isValid
                ? [Styles.button, Styles.buttonConfirm]
                : [Styles.button, Styles.buttonDisabled]
            }
          >
            <Text style={[Styles.buttonText, Styles.buttonTextConfirm]}>Áp dụng</Text>
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
    width: wp(75),
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    height: 54,
    width: wp(30),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
  },
  buttonTextConfirm: {
    color: Colors.white,
  },
  buttonCancel: {
    borderColor: Colors.grey_transparent,
  },
  buttonConfirm: {
    backgroundColor: Colors.app_green,
    borderColor: Colors.app_green,
  },
  buttonDisabled: {
    backgroundColor: Colors.grey,
    borderColor: Colors.grey,
  },
});

export default DatePickerModal;
