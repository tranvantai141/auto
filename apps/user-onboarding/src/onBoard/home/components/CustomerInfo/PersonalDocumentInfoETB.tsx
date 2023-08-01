import React, { Suspense, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Colors from '../../assets/Colors';
import { translate } from '../../assets/translations/translate';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import useCompareCustomerDocumentInfo from '@screens/customerInfo/hooks/useCompareCustomerDocumentInfo';
import { MoCResultFlow, useMocResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';

type Props = {
  title?: string;
  resultData?: MoCResultFlow;
};

function PersonalDocumentInfoETB(props: Props) {
  return (
    // <Suspense fallback={<Text>Loading</Text>}>
    <PersonalDocumentInfoETBContent {...props} />
    // </Suspense>
  );
}

const PersonalDocumentInfoETBContent = ({ title, resultData }: Props) => {
  // Row View Information

  const RowViewInformation = ({
    title,
    cifValue,
    isHeader,
    isDiff,
    isDiffGreen,
    ishiddenBottonLine,
  }: {
    title?: string;
    moCvalue?: string;
    cifValue?: string;
    isHeader?: boolean;
    isDiff?: boolean;
    isDiffGreen?: boolean;
    ishiddenBottonLine?: boolean;
  }) => {
    return (
      <View
        style={[
          styles.rowViewInformation,
          {
            backgroundColor: isDiffGreen
              ? Colors.green_10
              : isDiff
              ? Colors.red_10
              : isHeader
              ? Colors.dark_grey
              : Colors.gray_10,
          },
        ]}
      >
        <View style={[styles.containerInfo, { flex: 0.4 }]}>
          <Text style={[styles.textStyle, { fontWeight: '600' }]}>{title}</Text>
        </View>
        <View style={[styles.containerInfo]}>
          <Text style={[styles.textStyle, { fontWeight: isHeader ? '600' : '400' }]}>
            {cifValue}
          </Text>
        </View>
      </View>
    );
  };

  if (resultData?.result !== 'ETB') {
    return null;
  }

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.txtHeader}>{translate('personal_info_paper')}</Text>
      {/* User infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation title={translate('cif_number')} cifValue={resultData.cif.cifNumber} />
      </View>
      <View style={styles.containerRow}>
        <RowViewInformation title={translate('full_name')} cifValue={resultData.cif.fullName} />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>

        <RowViewInformation
          title={translate('date_of_birth')}
          cifValue={
            resultData.cif.formattedDoB?.includes('*')
              ? resultData.cif.formattedDoB
              : formatFuzzyDate(parseInt(resultData.cif.dob), 'DD/MM/yyyy')
          }
        />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>

        <RowViewInformation title={translate('sex')} cifValue={resultData.cif.gender} />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>
      </View>
      {/* User document infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation
          title={translate('customer_document_number')}
          cifValue={resultData.cif.idNumber}
        />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>

        <RowViewInformation
          title={translate('date_range')}
          cifValue={
            resultData.cif.formattedValidDate?.includes('*')
              ? resultData.cif.formattedValidDate
              : resultData.cif.formattedValidDate === 'Không thời hạn'
              ? 'Không thời hạn'
              : formatFuzzyDate(parseInt(resultData.cif.validDate), 'DD/MM/yyyy')
          }
        />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>

        <RowViewInformation
          title={translate('valid_until')}
          cifValue={
            resultData.cif.formattedExpiredDate?.includes('*')
              ? resultData.cif.formattedExpiredDate
              : resultData.cif.formattedExpiredDate === 'Không thời hạn'
              ? 'Không thời hạn'
              : formatFuzzyDate(parseInt(resultData.cif.expiredDate), 'DD/MM/yyyy')
          }
        />
        <View style={{ height: 1, width: wp(90), backgroundColor: Colors.dark_grey }}></View>

        <RowViewInformation
          title={translate('issued_by')}
          cifValue={resultData.cif.issuePlaceDescription}
        />
      </View>

      {/* User address infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation
          title={translate('nationality')}
          cifValue={resultData.cif.nationality}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {},
  txtHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray_100,
    paddingHorizontal: wp(1.975),
    marginTop: hp(2),
  },
  line: {
    height: 1,
    marginTop: wp(1.975),
    marginHorizontal: wp(1.975),
    backgroundColor: Colors.green_90,
  },
  containerRow: {
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: wp(1.975),
    marginTop: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowViewInformation: {
    flexDirection: 'row',
    backgroundColor: Colors.dark_grey,
  },
  textStyle: {
    paddingVertical: wp(0.9875),
    fontSize: 16,
    color: Colors.gray_100,
    paddingLeft: wp(1.975),
    paddingRight: 10,
  },
  containerInfo: {
    flex: 0.6,
    justifyContent: 'center',
  },
  viewLine: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.border_grey,
  },
});

export default PersonalDocumentInfoETB;
