import React, { useState } from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import SubSection from '../common/SubSection';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import { StyleSheet, Text, View } from 'react-native';
import StatusChip from '../common/StatusChip';
import { widthPercentageToDP } from '@assets/sizes/Sizes';
import { transaction_detail } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import Colors from '@screens/transactionDetailETB/assets/Colors';

const document = transaction_detail?.customerInfo?.document;

export function CustomerNotUpdateMoCSubSection() {
  const [status, setStatus] = useState('SUCCESS');

  return (
    <View style={Styles.mainContainer}>
      <SubSection
        title={translate('ci__moc_personal_document_information')}
        isVisible={status === 'PENDING' || status === 'ERROR' ? true : false}
        style={Styles.subSectionStyle}
        contentContainerStyle={Styles.subSectionContentContainer}
      >
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_name')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value value={document.fullName} valueRightStyle={Styles.rightValue} />
          }
        />

        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_dob')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value
              value={formatFuzzyDate(document.dateOfBirth, 'DD/MM/YYYY')}
              valueRightStyle={Styles.rightValue}
            />
          }
        />
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_gender')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value value={document.gender} valueRightStyle={Styles.rightValue} />
          }
        />
        {status === 'PENDING' || status === 'ERROR' ? (
          <GeneralInfoItem
            left={
              <GeneralInfoItem.Label
                label={translate('ci_moc_label_identifing_characteristics')}
                labelLeftStyle={Styles.leftLabel}
              />
            }
            right={
              <GeneralInfoItem.Value
                value={document.identifyCharacters}
                valueRightStyle={Styles.rightValue}
              />
            }
          />
        ) : null}
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_id')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value value={document.idNumber} valueRightStyle={Styles.rightValue} />
          }
        />
        {status === 'PENDING' || status === 'ERROR' ? (
          <GeneralInfoItem
            left={
              <GeneralInfoItem.Label
                label={translate('ci_moc_label_old_id')}
                labelLeftStyle={Styles.leftLabel}
              />
            }
            right={
              <GeneralInfoItem.Value
                value={document.oldIdNumber}
                valueRightStyle={Styles.rightValue}
              />
            }
          />
        ) : null}
        <View
          style={{
            backgroundColor:
              status === 'PENDING' || status === 'ERROR' ? Colors.green_10 : Colors.gray_10,
            marginLeft: -10,
            paddingLeft: 10,
          }}
        >
          <GeneralInfoItem
            left={
              <GeneralInfoItem.Label
                label={translate('ci_moc_label_issue_date')}
                labelLeftStyle={Styles.leftLabel}
              />
            }
            right={
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color:
                    status === 'PENDING' || status === 'ERROR' ? Colors.green_60 : Colors.app_black,
                }}
              >
                {formatFuzzyDate(document.validDate, 'DD/MM/YYYY')}
              </Text>
            }
          />
        </View>
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_valid_until')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value
              value={formatFuzzyDate(document.expiredDate, 'DD/MM/YYYY')}
              valueRightStyle={Styles.rightValue}
            />
          }
        />
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_issue_place')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value
              value={document.issuePalce}
              valueRightStyle={Styles.rightValue}
            />
          }
        />
        <GeneralInfoItem
          left={
            <GeneralInfoItem.Label
              label={translate('ci_moc_label_nationality')}
              labelLeftStyle={Styles.leftLabel}
            />
          }
          right={
            <GeneralInfoItem.Value
              value={document.nationality}
              valueRightStyle={Styles.rightValue}
            />
          }
        />
        {status === 'PENDING' || status === 'ERROR' ? (
          <>
            <GeneralInfoItem
              left={
                <GeneralInfoItem.Label
                  label={translate('ci_moc_label_home_town')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                <GeneralInfoItem.Value
                  value={document.hometown}
                  valueRightStyle={Styles.rightValue}
                />
              }
            />
            <GeneralInfoItem
              left={
                <GeneralInfoItem.Label
                  label={translate('ci_moc_label_address')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                <GeneralInfoItem.Value
                  value={document.resident}
                  valueRightStyle={Styles.rightValue}
                />
              }
            />
          </>
        ) : null}
      </SubSection>
      <View style={Styles.addressView}>
        {status === 'PENDING' || status === 'ERROR' ? (
          <>
            
            <GeneralInfoItem
              left={
                <GeneralInfoItem.Label
                  label={translate('ci_moc__label_update_status')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                <>
                  {status === 'PENDING' ? (
                    <StatusChip status="green" title="Chờ xử lý" />
                  ) : status === 'ERROR' ? (
                    <View>
                      <StatusChip
                        style={{ maxWidth: 20, marginBottom: 8 }}
                        status="red"
                        title="Lỗi"
                      />
                      <Text style={Styles.errorText}>999-Timeout</Text>
                    </View>
                  ) : null}
                </>
              }
            />
          </>
        ) : (
          <GeneralInfoItem
            left={
              <GeneralInfoItem.Label
                label={translate('ci_moc_label_addres')}
                labelLeftStyle={Styles.leftLabel}
              />
            }
            right={
              <GeneralInfoItem.Value
                value={document.currentAddress}
                valueRightStyle={Styles.rightValue}
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.white, borderRadius: 10 },
  subSectionStyle: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  subSectionContentContainer: {
    minHeight: 86,
    backgroundColor: Colors.gray_10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addressView: {
    marginHorizontal: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  errorText: {
    color: Colors.error_red,
    width: widthPercentageToDP(100),
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  leftLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  rightValue: {
    fontSize: 16,
    fontWeight: '400',
  },
});
