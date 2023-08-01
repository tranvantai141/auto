import { ComplianceItemModel } from '@screens/transactionDetail/typings';
import React from 'react';
import { translate } from '../../../transactionDetail/assets/translations/translate';
import ContentSection from '../common/ContentSection';
import GeneralInfoItem from '../common/GeneralInfoItem';
import SubSection from '../common/SubSection';

export interface ComplianceInfoInterface {
  complianceRequested?: boolean;
  complianceInfo?: Array<ComplianceItemModel>;
}
type Props = {
  data: ComplianceInfoInterface;
};

const ComplianceInfoSection = (props: Props) => {
  const { data } = props;
  const complianceInformation = data?.complianceInfo ?? [];
  const contentForItem = (item: ComplianceItemModel) => {
    const yes = translate('common_yes');
    const no = translate('common_no');

    if (item.type === 'purpose_relationship') {
      return item.data?.toString() ?? '-';
    }
    if (item.type === 'other_purpose_relationship') {
      return item.data?.toString() ?? '-';
    }

    if (item.value === 'YES') {
      return yes;
    }
    if (item.value === 'NO') {
      return no;
    }
    if (!item.data) {
      return '-';
    }
    if (
      (item.type === 'stateless_person' && item.data != null) ||
      (item.type === 'multiple_nationality' && (item.data ?? []).length > 0) ||
      (item.type === 'beneficial_owner' && (item.data ?? []).length > 0) ||
      (item.type === 'legal_agreement' && item.data != null) ||
      (item.type === 'resident_united_states' && item.data != null)
    ) {
      return yes;
    } else if (
      [
        'stateless_person',
        'multiple_nationality',
        'beneficial_owner',
        'legal_agreement',
        'resident_united_states',
      ].includes(item.type)
    ) {
      return no;
    }
    return item.data?.toString() ?? '-';
  };

  const subSectionForItem = (item: ComplianceItemModel) => {
    if (item?.type === 'stateless_person' && item?.data) {
      return (
        <SubSection>
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('compliance_info_label_visa_number')} />}
            right={<GeneralInfoItem.Value value={item?.data?.visaNumber ?? ''} />}
          />
          <GeneralInfoItem
            left={
              <GeneralInfoItem.Label label={translate('compliance_info_label_visa_place_issue')} />
            }
            right={<GeneralInfoItem.Value value={item?.data?.authorityName ?? ''} />}
          />
        </SubSection>
      );
    } else if (item.type === 'multiple_nationality' && (item?.data ?? []).length > 0) {
      return (
        <SubSection>
          {item?.data?.map((subItem, index) => (
            <>
              <GeneralInfoItem
                key={item?.type + index + 'nationality'}
                left={
                  <GeneralInfoItem.Label label={translate('compliance_info_label_nationality')} />
                }
                right={<GeneralInfoItem.Value value={subItem.nationalityName} />}
              />
              <GeneralInfoItem
                key={item.type + index + 'address'}
                left={
                  <GeneralInfoItem.Label
                    label={translate('compliance_info_label_nationality_address')}
                  />
                }
                right={<GeneralInfoItem.Value value={subItem.address} />}
              />
            </>
          ))}
        </SubSection>
      );
    } else if (item.type === 'beneficial_owner' && (item.data ?? []).length > 0) {
      return (
        <>
          {item.data.map((subItem, index) => (
            <SubSection key={item.type + index}>
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_full_name')} />}
                right={<GeneralInfoItem.Value value={subItem.fullName} />}
              />
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_dob')} />}
                right={<GeneralInfoItem.Value value={subItem.dateOfBirth} />}
              />
              <GeneralInfoItem
                left={
                  <GeneralInfoItem.Label label={translate('ci_beneficial_owner_nationality')} />
                }
                right={<GeneralInfoItem.Value value={subItem.nationality} />}
              />
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_address')} />}
                right={<GeneralInfoItem.Value value={subItem.address} />}
              />
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_occuption')} />}
                right={<GeneralInfoItem.Value value={subItem.job} />}
              />
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_id')} />}
                right={<GeneralInfoItem.Value value={subItem.idCardNumber} />}
              />
              <GeneralInfoItem
                left={
                  <GeneralInfoItem.Label label={translate('ci_beneficial_owner_id_issue_date')} />
                }
                right={<GeneralInfoItem.Value value={subItem.issueDate} />}
              />
              <GeneralInfoItem
                left={
                  <GeneralInfoItem.Label label={translate('ci_beneficial_owner_id_issue_place')} />
                }
                right={<GeneralInfoItem.Value value={subItem.issuingPlace} />}
              />
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={translate('ci_beneficial_owner_phone')} />}
                right={<GeneralInfoItem.Value value={subItem.phoneNumber} />}
              />
            </SubSection>
          ))}
        </>
      );
    } else if (item.type === 'legal_agreement' && item.data != null) {
      return (
        <SubSection>
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_legal_agreement_name')} />}
            right={<GeneralInfoItem.Value value={item.data.authorityName} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={
              <GeneralInfoItem.Label label={translate('ci_legal_agreement_date_entrustment')} />
            }
            right={<GeneralInfoItem.Value value={item.data.authorizationDate} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_legal_agreement_content')} />}
            right={<GeneralInfoItem.Value value={item.data.authorizationContent} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_legal_agreement_trust_nation')} />}
            right={<GeneralInfoItem.Value value={item.data.authorizationCountry} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_legal_agreement_id_trust')} />}
            right={<GeneralInfoItem.Value value={item.data.identifierNumber} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_legal_agreement_id_trust_info')} />}
            right={<GeneralInfoItem.Value value={item.data.beneficiaryInfo} />}
          />
        </SubSection>
      );
    } else if (item.type === 'resident_united_states' && item.data != null) {
      return (
        <SubSection>
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('ci_resident_united_states_tax_code')} />}
            right={
              <GeneralInfoItem.Value
                value={(item.data.tinOrSnnNumber ?? '').length > 0 ? item.data.tinOrSnnNumber : '-'}
              />
            }
          />
          {(item.data.tinOrSnnNumber === undefined || item.data.tinOrSnnNumber.length === 0) && (
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('ci_resident_united_states_no_code_reason')}
                />
              }
              right={<GeneralInfoItem.Value value={item.data.reasonForNoTinOrSnnNumber ?? ''} />}
            />
          )}
        </SubSection>
      );
    }

    return null;
  };

  return (
    <ContentSection title={translate('sidebar_compliance_info')}>
      {complianceInformation.map((item, index) => {
        if (item.type === 'other_purpose_relationship' && item.data == null) {
          return null;
        }
        return (
          <>
            <GeneralInfoItem
              key={item?.type ?? '' + index}
              leftRightRatio="2:1"
              left={<GeneralInfoItem.Label label={item?.name ?? ''} />}
              right={<GeneralInfoItem.Value value={contentForItem(item)} />}
            />
            {subSectionForItem(item)}
          </>
        );
      })}
    </ContentSection>
  );
};

export default ComplianceInfoSection;
