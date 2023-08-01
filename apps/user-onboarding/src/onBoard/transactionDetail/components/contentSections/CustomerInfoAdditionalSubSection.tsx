import React from 'react';
import GeneralInfoItem from '../common/GeneralInfoItem';
import { translate } from '../../assets/translations/translate';
import SubSection from '../common/SubSection';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { Text, View } from 'react-native';

const CustomerInfoAdditionalSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);

  const {
    customerInfo: { supplementalInfo },
  } = response ?? { customerInfo: {} };

  if (!supplementalInfo) {
    return null;
  }

  return (
    <SubSection title={translate('ci_addition_title')}>
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_other_nationality')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.otherNationality} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_resident_status')} />}
        right={
          <GeneralInfoItem.Value
            value={supplementalInfo.residenceStatus ? translate(supplementalInfo.residenceStatus === 'Resident' ? 'common_yes' : 'common_no') : '-'}
          />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_resident_duration')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.vietnamResidentPeriod} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_tax_code')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.taxCode} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_occupation')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.currentOccupation} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_position')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.jobTitle} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_forgin_address')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.overseasAddress} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_current_address')} />}
        right={
          <View>
            <AddressItem title="Tỉnh/Thành phố" value={supplementalInfo.currentProvince} />
            <AddressItem title="Quận/Huyện" value={supplementalInfo.currentDistrict} />
            <AddressItem title="Phường/Xã/Thị trấn" value={supplementalInfo.currentCommune} />
            <AddressItem title="Địa chỉ chi tiết" value={supplementalInfo.currentSpecificAddress} />
          </View>
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_current_address_duration')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.currentAddressTime} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_phone')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.mobilePhone} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_home_phone')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.landingPhone} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_email')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.email} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_business_type_code')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.economicSector} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_addition_label_legal_status')} />}
        right={<GeneralInfoItem.Value value={supplementalInfo.classLevel} />}
      />
    </SubSection>
  );
};

const AddressItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={{ borderBottomColor: '#F2F2F2', borderBottomWidth: 1, marginBottom: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>{title}</Text>
      <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 8 }}>{value}</Text>
    </View>
  );
};

export default CustomerInfoAdditionalSubSection;
