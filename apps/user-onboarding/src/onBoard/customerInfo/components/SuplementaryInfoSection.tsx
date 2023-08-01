import React, { useMemo } from 'react';
import { SupplementalInfoDTO } from '../typings';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconCancel, IconEditGreen } from '@assets/images';
import { translate } from '../assets/translations/translate';

export type Props = {
  loading: boolean;
  failded: boolean;
  invalidMemoKyc: boolean;
  // (result.result === 'ETB' && result.invalidMemoKyc)
  data: SupplementalInfoDTO[];
  isError: boolean;
  onPressUpdate: () => void;
  onPressClear: (value: string) => void;
};

function SuplementaryInfoSection(props: Props) {
  const { loading, data, onPressUpdate, onPressClear, isError, failded, invalidMemoKyc } = props;
  // const isTwoColumn = updateSupplemental();

  const isTwoColumn = useMemo(() => {
    if (data.length === 1) return false;
    if (data[1] === undefined) return false;
    if (Object.keys(data[1]).length < 1) return false;
    if (Object.keys(data[1]).length === 1) {
      if (Object.keys(data[1])[0] === 'contactList')
        if (Object.keys(data[1].contactList).length <= 0) return false;
    }
    return true;
  }, [data]);

  // console.log('data', data);

  const displayData = useMemo<
    {
      label: string;
      key: string;
      required: boolean;
      value: string[];
      valueUpdate?: string[];
    }[]
  >(() => {
    return [
      {
        label: translate('sup_info_label_address'),
        key: 'currentAddress',
        required: true,
        value: failded ? [translate('fail_to_get_info_message')] : [data[0]?.currentAddress],
        valueUpdate: isTwoColumn ? [data[1]?.currentAddress] : undefined,
      },
      {
        label: translate('sup_info_label_phone'),
        key: 'contactList.MP',
        required: true,
        value: failded
          ? [translate('fail_to_get_info_message')]
          : data[0]?.contactList?.['MP']?.map((e) => e.contactValue) ?? [],
        valueUpdate: isTwoColumn
          ? data[1]?.contactList?.['MP']?.map((e) => e.contactValue)
          : undefined,
      },
      {
        label: translate('sup_info_label_landline'),
        key: 'contactList.HP',
        required: false,
        value: failded
          ? [translate('fail_to_get_info_message')]
          : data[0]?.contactList?.['HP']?.map((e) => e.contactValue) ?? [],
        valueUpdate: isTwoColumn
          ? data[1]?.contactList?.['HP']?.map((e) => e.contactValue)
          : undefined,
      },
      {
        label: translate('sup_info_label_email'),
        key: 'contactList.EP',
        required: true,
        value: failded
          ? [translate('fail_to_get_info_message')]
          : data[0]?.contactList?.['EP']?.map((e) => e.contactValue) ?? [],
        valueUpdate: isTwoColumn
          ? data[1]?.contactList?.['EP']?.map((e) => e.contactValue)
          : undefined,
      },
      {
        label: translate('sup_info_label_occu'),
        key: 'currentOccupation',
        required: true,
        value: failded
          ? [translate('fail_to_get_info_message')]
          : [
              data[0]?.currentOccupation?.trim() === 'Khác'
                ? `Khác (${data[0]?.otherCurrentOccupation?.trim()})`
                : data[0]?.currentOccupation,
            ],
        valueUpdate: isTwoColumn
          ? [
              data[1]?.currentOccupation?.trim() === 'Khác'
                ? `Khác (${data[1]?.currentOtherOccupation?.trim()})`
                : data[1]?.currentOccupation,
            ]
          : undefined,
      },
      {
        label: translate('sup_info_label_job_title'),
        key: 'jobTitle',
        required: true,
        value: failded
          ? [translate('fail_to_get_info_message')]
          : [
              data[0]?.jobTitle?.trim() === 'Khác'
                ? `Khác (${data[0]?.otherJobTitle?.trim()})`
                : data[0]?.jobTitle,
            ],
        valueUpdate: isTwoColumn
          ? [
              data[1]?.jobTitle?.trim() === 'Khác'
                ? `Khác (${data[1]?.jobOtherTitle?.trim()})`
                : data[1]?.jobTitle,
            ]
          : undefined,
      },
    ];
  }, [data, failded, isTwoColumn]);

  return (
    <View style={[Styles.container, { borderWidth: isError ? 1 : 0, borderColor: Colors.red_60 }]}>
      <View
        style={{
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: Colors.green_90,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600' }}>{translate('sup_info_title')}</Text>
        {!loading && !failded && (
          <TouchableOpacity
            disabled={invalidMemoKyc}
            onPress={onPressUpdate}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconEditGreen style={{ opacity: invalidMemoKyc ? 0.7 : 1 }} />
            <Text
              style={{
                marginLeft: 4,
                fontSize: 16,
                fontWeight: '600',
                color: Colors.green_90,
                opacity: invalidMemoKyc ? 0.5 : 1,
              }}
            >
              {translate('sup_info_title_update')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 16 }}>
        <Row
          type="header"
          label=""
          value="Thông tin hiện tại"
          valueUpdate={isTwoColumn ? 'Thông tin cập nhật' : undefined}
        />
        {displayData.map((element, index) => (
          <Row
            key={element.label}
            type={index % 2 === 0 ? 'white' : 'gray'}
            label={<RowLabel label={element.label} required={element.required} />}
            value={<RowValue value={element.value} isError={failded} />}
            valueUpdate={
              isTwoColumn ? (
                <RowValue value={element.valueUpdate ?? []} isError={failded} />
              ) : undefined
            }
            isShowCancel={isTwoColumn && (element.valueUpdate?.[0] ?? '') !== ''}
            onPressCancel={() => onPressClear(element.key)}
          />
        ))}
      </View>
      {isError && (
        <Text style={{ marginTop: 16, color: Colors.red_60, fontSize: 18 }}>
          Vui lòng bổ sung thông tin bắt buộc
        </Text>
      )}
    </View>
  );
}

function Row(props: {
  type: 'header' | 'white' | 'gray';
  label: React.ReactNode | string;
  value: React.ReactNode | string;
  valueUpdate?: React.ReactNode | string;
  isShowCancel?: boolean;
  onPressCancel?: () => void;
}) {
  const isTwoColumn = props.valueUpdate !== undefined;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: Colors.border_grey,
          borderBottomWidth: 1,
        },
        Styles[`row_${props.type}`],
        props.isShowCancel && { backgroundColor: Colors.green_10 },
      ]}
    >
      <View
        style={{
          flex: 0.3,
          paddingLeft: 16,
          paddingVertical: 12,
          borderRightWidth: 1,
          borderRightColor: Colors.border_grey,
        }}
      >
        {typeof props.label === 'string' ? (
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.black }}>
            {props.label}
          </Text>
        ) : (
          props.label
        )}
      </View>
      <View
        style={{
          flex: isTwoColumn ? 0.35 : 0.7,
          paddingLeft: 16,
          paddingVertical: 12,
          borderRightWidth: isTwoColumn ? 1 : 0,
          borderRightColor: Colors.border_grey,
        }}
      >
        {typeof props.value === 'string' ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: props.type === 'header' ? '600' : '400',
              color: Colors.black,
            }}
          >
            {props.value}
          </Text>
        ) : (
          props.value
        )}
      </View>
      {isTwoColumn && props.valueUpdate != null && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.35,
            paddingLeft: 16,
            paddingVertical: 12,
            justifyContent: 'space-between',
          }}
        >
          {typeof props.valueUpdate === 'string' ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: props.type === 'header' ? '600' : '400',
                color: Colors.black,
              }}
            >
              {props.valueUpdate}
            </Text>
          ) : (
            props.valueUpdate
          )}
          {props.isShowCancel && (
            <TouchableOpacity style={Styles.cancel_button} onPress={() => props.onPressCancel?.()}>
              <IconCancel />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

function RowLabel(props: { label: string; required?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.black }}>{props.label}</Text>
      {props.required && (
        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.red_60, marginLeft: 4 }}>
          *
        </Text>
      )}
    </View>
  );
}

export function RowValue(props: { value: string[]; isError: boolean }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <View style={{ alignItems: 'flex-start' }}>
      {props.value.map((item, index) => {
        if (index !== 0 && !isExpanded) {
          return null;
        }
        return (
          <Text
            key={index}
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: props.isError ? Colors.red : Colors.black,
              marginRight: 4,
            }}
          >
            {item && item.trim().length > 0 ? item : '-'}
          </Text>
        );
      })}
      {props.value.length === 0 && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: props.isError ? Colors.red : Colors.black,
            marginRight: 4,
          }}
        >
          -
        </Text>
      )}
      {props.value.length > 1 && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text
            style={{ fontSize: 16, fontWeight: '400', color: Colors.green_90, paddingVertical: 4 }}
          >
            {isExpanded
              ? translate('sup_info_value_view_less')
              : `${translate('sup_info_value_view_more')} (${props.value.length - 1})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexL: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
  },
  row_header: {
    backgroundColor: Colors.dark_grey,
  },
  row_white: {
    backgroundColor: Colors.white,
  },
  row_gray: {
    backgroundColor: Colors.background_grey,
  },
  cancel_button: {
    paddingRight: 10,
  },
});

export default SuplementaryInfoSection;
