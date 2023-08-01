import { RouteNames } from '@routeNames';
import { SideBarItemID } from '@screens/transactionDetail/typings';
import { TermAndCondition } from '@screens/transactionDetailETB/apis/getTransactionDetailTermCondition';
import React from 'react';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import TermItem from '../common/TermItem';

type Props = {
  sideBarItemID?: SideBarItemID;
  data?: TermAndCondition;
};

const TermSection = (props: Props) => {
  const terms = props?.data?.termAndConditions ?? [];
  const { navigate } = useRootNavigation();
  return (
    <ContentSection title={translate('terms_info_title')}>
      {terms.map((item, index) => (
        <TermItem
          key={index}
          title={item?.name ?? ''}
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
