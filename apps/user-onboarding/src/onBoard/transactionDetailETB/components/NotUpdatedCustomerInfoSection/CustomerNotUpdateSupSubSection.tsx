import React, { useState } from 'react';
import GeneralInfoItem from '../common/GeneralInfoItem';
import { translate } from '../../assets/translations/translate';
import SubSection from '../common/SubSection';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusChip from '../common/StatusChip';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { useCustommerInfoSectionContext } from '@screens/transactionDetailETB/contexts/CustommerInfoSectionContext';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { CustomerInfoResult } from '@screens/transactionDetailETB/hooks/useEtbCustomerInfoSection';

type Props = {
  data: CustomerInfoResult | undefined;
};

export const CustomerNotUpdateSupSubSection = ({ data }: Props) => {
  const { selectedButton } = useCustommerInfoSectionContext();
  const [status, setStatus] = useState('SUCCESS');
  const supplementalInfo = data?.supInfo?.currentInfo;
  const [isExpandMobile, setIsExpandMobile] = useState(false);
  const [isExpandHomePhone, setIsExpandHomePhone] = useState(false);
  const [isExpandEmail, setIsExpandEmail] = useState(false);

  const errorView = () => {
    return (
      <>
        {status === 'PENDING' ? (
          <View style={Styles.errorView}>
            <StatusChip status="yellow" title="Chờ xử lý" />
          </View>
        ) : status === 'ERROR' ? (
          <View style={Styles.errorView}>
            <StatusChip style={{ maxWidth: 20, marginBottom: 8 }} status="red" title="Lỗi" />
            <Text style={Styles.errorText}>999-Timeout</Text>
          </View>
        ) : null}
      </>
    );
  };
  return (
    <SubSection
      title={
        status === 'PENDING' || status === 'ERROR'
          ? translate('ci_addition_title')
          : translate('ci_update_addition_information')
      }
      style={Styles.subSectionStyle}
      contentContainerStyle={Styles.subSectionContentContainer}
    >
      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label
            label={translate('ci_addition_label_phone')}
            labelLeftStyle={Styles.leftLabel}
          />
        }
        right={
          <View>
            <View style={{ flex: 2.5 }}>
              {!isExpandMobile ? (
                <Text numberOfLines={2} style={Styles.info_text}>
                  {supplementalInfo?.currentMobilePhones 
                  && supplementalInfo?.currentMobilePhones?.length > 0 
                  ? supplementalInfo?.currentMobilePhones[0].contactValue : ''}
                </Text>
              ) : (
                supplementalInfo?.currentMobilePhones?.map((item) => {
                  return (
                    <Text numberOfLines={2} key={item.contactValue} style={Styles.info_text_expand}>
                      {item.contactValue}
                    </Text>
                  );
                })
              )}
            </View>
            {supplementalInfo?.currentMobilePhones &&
              supplementalInfo?.currentMobilePhones?.length > 1 && (
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    setIsExpandMobile(!isExpandMobile);
                  }}
                >
                  <Text numberOfLines={2} style={Styles.hyper_link_text}>
                    {isExpandMobile
                      ? `Thu gọn`
                      : `Xem thêm (${supplementalInfo?.currentMobilePhones?.length - 1})`}
                  </Text>
                </TouchableOpacity>
              )}
            {errorView()}
          </View>
        }
      />
      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label
            label={translate('ci_addition_label_home_phone')}
            labelLeftStyle={Styles.leftLabel}
          />
        }
        right={
          <View>
            <View style={{ flex: 2.5 }}>
              {!isExpandHomePhone ? (
                <Text numberOfLines={2} style={Styles.info_text}>
                  {supplementalInfo?.currentLandPhones &&
                  supplementalInfo?.currentLandPhones?.length > 0
                    ? supplementalInfo?.currentLandPhones[0].contactValue
                    : ''}
                </Text>
              ) : (
                supplementalInfo?.currentLandPhones?.map((item) => {
                  return (
                    <Text numberOfLines={2} key={item.contactValue} style={Styles.info_text_expand}>
                      {item.contactValue}
                    </Text>
                  );
                })
              )}
            </View>
            {supplementalInfo?.currentLandPhones &&
              supplementalInfo?.currentLandPhones?.length > 1 && (
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    setIsExpandHomePhone(!isExpandHomePhone);
                  }}
                >
                  <Text numberOfLines={2} style={Styles.hyper_link_text}>
                    {isExpandHomePhone
                      ? `Thu gọn`
                      : `Xem thêm (${supplementalInfo?.currentLandPhones?.length - 1})`}
                  </Text>
                </TouchableOpacity>
              )}
            {errorView()}
          </View>
        }
      />
      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label
            label={translate('ci_addition_label_email')}
            labelLeftStyle={Styles.leftLabel}
          />
        }
        right={
          <View>
            <View style={{ flex: 2.5 }}>
              {!isExpandEmail ? (
                <Text numberOfLines={2} style={Styles.info_text}>
                  {supplementalInfo?.currentEmails &&
                  supplementalInfo?.currentEmails?.length > 0
                    ? supplementalInfo?.currentEmails[0].contactValue
                    : ''}
                </Text>
              ) : (
                supplementalInfo?.currentEmails?.map((item) => {
                  return (
                    <Text numberOfLines={2} key={item.contactValue} style={Styles.info_text_expand}>
                      {item.contactValue}
                    </Text>
                  );
                })
              )}
            </View>
            {supplementalInfo?.currentEmails &&
              supplementalInfo?.currentEmails?.length > 1 && (
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => {
                    setIsExpandEmail(!isExpandEmail);
                  }}
                >
                  <Text numberOfLines={2} style={Styles.hyper_link_text}>
                    {isExpandEmail
                      ? `Thu gọn`
                      : `Xem thêm (${supplementalInfo?.currentEmails?.length - 1})`}
                  </Text>
                </TouchableOpacity>
              )}
            {status === 'ERROR' ? (
              <View>
                <StatusChip
                  style={{ maxWidth: wp(8), marginVertical: 4 }}
                  status="yellow"
                  title="Chờ xử lý"
                />
              </View>
            ) : null}
          </View>
        }
      />
      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label
            label={translate('ci_addition_label_occupation')}
            labelLeftStyle={Styles.leftLabel}
          />
        }
        right={
          <GeneralInfoItem.Value
            value={
              supplementalInfo?.otherCurrentOccupation
                ? supplementalInfo?.currentOccupation +
                  ' - ' +
                  supplementalInfo?.otherCurrentOccupation
                : supplementalInfo?.currentOccupation ?? ''
            }
            valueRightStyle={Styles.rightValue}
          />
        }
      />

      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label
            label={translate('ci_addition_label_position')}
            labelLeftStyle={Styles.leftLabel}
          />
        }
        right={
          <GeneralInfoItem.Value
            value={
              supplementalInfo?.otherJobTitle
                ? supplementalInfo?.jobTitle + ' - ' + supplementalInfo?.otherJobTitle
                : supplementalInfo?.jobTitle ?? ''
            }
            valueRightStyle={Styles.rightValue}
          />
        }
      />
    </SubSection>
  );
};
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
  errorText: {
    color: Colors.error_red,
    width: wp(100),
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  errorView: {
    width: wp(12),
    marginVertical: 4,
  },
  leftLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  rightValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  hyper_link_text: {
    color: '#008047',
    fontWeight: '300',
    fontSize: hp(1.3),
  },
  info_text: {
    color: '#000000',
    fontWeight: '400',
    fontSize: hp(1.3),
  },
  info_text_expand: {
    color: '#000000',
    fontWeight: '400',
    marginBottom: hp(1),
    fontSize: hp(1.3),
  },
});
