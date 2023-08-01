import React, { useState } from 'react';
import Section from './Section';
import { Image, StyleSheet, Text } from 'react-native';
import Colors from '@screens/transactionList/assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '@screens/transactionList/assets/Images';
import DatePickerModal from '../InputComponents/DatePickerModal';
import { IconCalender } from '@assets/images';

const FormDate = ({
  range,
  onChanged,
}: {
  range: [Date, Date] | null;
  onChanged: (start: Date, end: Date) => void;
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(range ? range[0] : null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(range ? range[1] : null);
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  return (
    <Section title="Chọn thời gian">
      <DatePickerModal
        open={datePickerOpened}
        onCancel={() => {
          setDatePickerOpened(false);
          setSelectedStartDate(null);
          setSelectedEndDate(null);
        }}
        onConfirm={(start, end) => {
          setSelectedStartDate(start);
          setSelectedEndDate(end);
          setDatePickerOpened(false);
          onChanged(start, end);
        }}
      />
      <TouchableOpacity onPress={() => setDatePickerOpened(true)} style={Styles.input_style}>
        {(!selectedStartDate || !selectedEndDate) && (
          <Text style={Styles.placeholderStyle}>Chọn thời gian</Text>
        )}
        {selectedStartDate && selectedEndDate && (
          <Text style={Styles.selectedTextStyle}>
            {selectedStartDate.toLocaleDateString()} - {selectedEndDate.toLocaleDateString()}
          </Text>
        )}
        <IconCalender
          height={25}
          width={25}
          style={{
            position: 'absolute',
            right: 10,
          }}
        />
      </TouchableOpacity>
    </Section>
  );
};

const Styles = StyleSheet.create({
  input_style: {
    backgroundColor: Colors.white,
    height: hp(4.8),
    borderColor: Colors.placeholder_grey,
    borderRadius: 8,
    marginVertical: hp(1),
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.placeholder_grey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default FormDate;
