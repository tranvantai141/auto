import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import useCompareCustomerDocumentInfo from '@screens/customerInfo/hooks/useCompareCustomerDocumentInfo';
import { MoCResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';
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

const PersonalDocumentInfoETBContent = ({ resultData }: Props) => {
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);
  const { data } = useCompareCustomerDocumentInfo();

  // Row View Information

  const RowViewInformation = ({
    title,
    moCvalue,
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
            borderBottomColor: Colors.border_grey,
            borderBottomWidth: ishiddenBottonLine ? 0 : 1,
          },
        ]}
      >
        <View style={[styles.containerInfo, { flex: 0.23 }]}>
          <Text style={[styles.textStyle, { fontWeight: '600' }]}>{title}</Text>
        </View>
        <View style={styles.viewLine} />
        <View style={styles.containerInfo}>
          <Text
            style={[
              styles.textStyle,
              {
                fontWeight: isHeader ? '600' : '400',
                color: isDiffGreen ? Colors.green_70 : isDiff ? Colors.red_60 : Colors.gray_100,
              },
            ]}
          >
            {moCvalue}
          </Text>
        </View>
        <View style={styles.viewLine} />
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
      <View style={styles.line} />
      {/* Header */}
      <View style={styles.containerRow}>
        <RowViewInformation
          moCvalue={translate('moc_info')}
          cifValue={translate('cif_info')}
          isHeader={true}
        />
      </View>
      {/* User infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation title={translate('cif_number')} cifValue={resultData.cif.cifNumber} />
        <RowViewInformation
          title={translate('full_name')}
          moCvalue={mocResults.FullName}
          cifValue={resultData.cif.fullName}
          isDiff={resultData.diffInfos.includes('NAME')}
        />
        <RowViewInformation
          title={translate('date_of_birth')}
          moCvalue={mocResults.DOB}
          cifValue={formatFuzzyDate(parseInt(resultData.cif.dob), 'DD/MM/yyyy')}
          isDiff={resultData.diffInfos.includes('BIRTHDATE')}
        />
        <RowViewInformation
          title={translate('sex')}
          moCvalue={mocResults.Gender}
          cifValue={resultData.cif.gender}
          isDiffGreen={resultData.diffInfos.includes('GENDER')}
        />
        <RowViewInformation
          title={translate('ddnd')}
          moCvalue={mocResults.DDND}
          cifValue={resultData.cif.ddnd}
        />
      </View>
      {/* User document infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation
          title={translate('customer_document_number')}
          moCvalue={mocResults.IDNumber}
          cifValue={resultData.cif.idNumber}
          isDiffGreen={resultData.diffInfos.includes('ID_NO')}
        />
        <RowViewInformation
          title={translate('id_number_old')}
          moCvalue={mocResults.OldIDNumber}
          cifValue={resultData.cif.oldIdNumber}
        />
        <RowViewInformation
          title={translate('date_range')}
          moCvalue={mocResults.ValidDate}
          cifValue={formatFuzzyDate(parseInt(resultData.cif.validDate), 'DD/MM/yyyy')}
          isDiffGreen={resultData.diffInfos.includes('ISSUE_DATE')}
        />
        <RowViewInformation
          title={translate('valid_until')}
          moCvalue={mocResults.ExpiredDate}
          cifValue={
            resultData.cif.formattedExpiredDate === 'Không thời hạn'
              ? 'Không thời hạn'
              : formatFuzzyDate(parseInt(resultData.cif.expiredDate), 'DD/MM/yyyy')
          }
          isDiffGreen={resultData.diffInfos.includes('EXPIRED_DATE')}
        />
        <RowViewInformation
          title={translate('issued_by')}
          moCvalue={data?.issued_by}
          cifValue={resultData.cif.issuePlaceDescription ?? '-'}
          ishiddenBottonLine={true}
          isDiffGreen={resultData.diffInfos.includes('ISSUE_PLACE')}
        />
      </View>

      {/* User address infomation */}
      <View style={styles.containerRow}>
        <RowViewInformation
          title={translate('nationality')}
          moCvalue={mocResults.Nationality}
          cifValue={resultData.cif.nationality}
          isDiffGreen={resultData.diffInfos.includes('NATIONALITY')}
        />
        <RowViewInformation
          title={translate('home_town')}
          moCvalue={mocResults.Hometown}
          cifValue={resultData.cif.hometown}
        />
        <RowViewInformation
          title={translate('place_of_residence')}
          moCvalue={mocResults.Resident}
          cifValue={resultData.cif.resident}
          ishiddenBottonLine={true}
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
    marginTop: wp(1.975),
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
    flex: 0.385,
    justifyContent: 'center',
  },
  viewLine: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.border_grey,
  },
});

export default PersonalDocumentInfoETB;
