import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, ImageSourcePropType } from 'react-native';
import Color from '../assets/Colors';
import GradientButton from 'src/common/components/Button/GradientButton';
import { HeadingsOnBoarding } from '../components/HeadingTextOnBoard';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import OnboardingOption from '../components/OnboardingOption';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import Style from './Style';
import { servicesList } from '@dummy/servicesList';

const UserService = (props: any) => {
  const { navigation } = props;
  const [data, setData] = useState([]);

  type ListItemInterface = {
    item: itemList;
  };

  type itemList = {
    id: string;
    name: string;
    isSelected: boolean;
    image: ImageSourcePropType;
  };

  useEffect(() => {
    const data = servicesList.map((v) => ({ ...v, isSelected: true }));
    setData(data as any);
  }, [servicesList]);

  const renderItem = (selectedItem: ListItemInterface) => {
    return (
      <OnboardingOption
        testId={TestIds.checked_item + selectedItem.item.id}
        onPress={() => {
          selectedItem.item.isSelected = !selectedItem.item.isSelected;
          setData([...data]);
        }}
        icon={selectedItem.item.image}
        title={selectedItem.item.name}
        services
        isSelect={selectedItem.item.isSelected}
      />
    );
  };

  function listItems() {
    return (
      <FlatList
        data={data}
        renderItem={(item: any) => renderItem(item)}
        keyExtractor={(item: any) => item.id}
      />
    );
  }

  function bottomView() {
    return (
      <GradientButton
        testIdValue={TestIds.step5_user_info}
        buttonText={translate('continue')}
        disabled={false}
        toggleView={true}
        buttonStyle={Style.buttonStyle}
        onPress={() => navigation.navigate(RouteNames.additionalInfo.name)}
      />
    );
  }

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.app_background} />
      <OnboardingProgressbar
        testId={TestIds.step5_progress_bar}
        onclickRightIcon={() => navigation.goBack()}
        onPress={() => navigation.goBack()}
        percentage={'50%'}
      />
      <ScrollView style={Style.scroll}>
        {HeadingsOnBoarding('userService')}
        {listItems()}
      </ScrollView>
      {bottomView()}
    </SafeAreaView>
  );
};

export default UserService;
