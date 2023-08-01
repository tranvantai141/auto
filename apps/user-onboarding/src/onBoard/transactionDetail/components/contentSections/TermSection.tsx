import { RouteNames } from '@routeNames';
import React from 'react';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import TermItem from '../common/TermItem';

const TermSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const terms = response?.termAndConditions ?? [];

  const { navigate } = useRootNavigation();

  return (
    <ContentSection title={translate('terms_info_title')}>
      {terms.map((item, index) => (
        <TermItem
          key={index}
          title={item.name}
          onPress={() => {
            navigate(RouteNames.webView.name, {
              title: item.name,
              url: item.fileName,
            });
          }}
        />
      ))}
    </ContentSection>
  );
};

export default TermSection;
