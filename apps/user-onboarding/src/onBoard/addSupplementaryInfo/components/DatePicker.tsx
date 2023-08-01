import React from 'react';
import DatePicker from 'react-native-date-picker';
import { translate } from '../assets/transalations/translate';


type Props = {
    open?: boolean;
    onConfirm: (date: any) => void;
    onCancel: () => void
    maximumDate?: Date;
};

const DatePickerModal = (props: Props) => {
    return (
        <>
            <DatePicker
                modal
                mode={'date'}
                open={props.open}
                date={new Date()}
                onConfirm={(date: any) => {
                    props.onConfirm(date)

                }}
                onCancel={() => {
                    props.onCancel()

                }}
                title={translate('selectDate')}
                confirmText={translate('confirmDate')}
                maximumDate={props.maximumDate ?? new Date()}
            />
        </>
);
};
export default DatePickerModal;
