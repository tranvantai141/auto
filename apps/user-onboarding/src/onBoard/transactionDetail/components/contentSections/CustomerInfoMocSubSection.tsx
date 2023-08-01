import React from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import SubSection from '../common/SubSection';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';

const CustomerInfoMocSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);

  const {
    customerInfo: { document },
  } = response ?? { customerInfo: {} };

  if (!document) {
    return null;
  }
  return (
    <SubSection title={translate('ci_moc_title')}>
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_id')} />}
        right={<GeneralInfoItem.Value value={document.idNumber} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_name')} />}
        right={<GeneralInfoItem.Value value={document.fullName} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_dob')} />}
        right={
          <GeneralInfoItem.Value value={formatFuzzyDate(document.dateOfBirth, 'DD/MM/YYYY')} />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_gender')} />}
        right={<GeneralInfoItem.Value value={document.gender} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_nationality')} />}
        right={<GeneralInfoItem.Value value={document.nationality} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_home_town')} />}
        right={<GeneralInfoItem.Value value={document.hometown} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_address')} />}
        right={<GeneralInfoItem.Value value={document.resident} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_issue_date')} />}
        right={<GeneralInfoItem.Value value={formatFuzzyDate(document.validDate, 'DD/MM/YYYY')} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_expiry_date')} />}
        right={
          <GeneralInfoItem.Value
            value={
                formatFuzzyDate(document.expiredDate, 'DD/MM/YYYY')
            }
          />
        }
      />
      <GeneralInfoItem
        left={
          <GeneralInfoItem.Label label={translate('ci_moc_label_identifing_characteristics')} />
        }
        right={<GeneralInfoItem.Value value={document.indentifyCharacters} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_issue_place')} />}
        right={<GeneralInfoItem.Value value={document.issuePalce} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_old_id')} />}
        right={<GeneralInfoItem.Value value={document.oldIdNubmer} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('ci_moc_label_other_id')} />}
        right={<GeneralInfoItem.Value value={document.otherIdNumber} />}
      />
    </SubSection>
  );
};

export default CustomerInfoMocSubSection;
