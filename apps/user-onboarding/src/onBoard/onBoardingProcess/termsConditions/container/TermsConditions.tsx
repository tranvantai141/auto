import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import Images from '../assets/Images';
import GradientButton from 'src/common/components/Button/GradientButton';
import Color from '../assets/Colors';
import Style from './Style';
import TermsCondition, { TCdata } from '@dummy/TermsCondition';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';

const TermsConditions = (props: any) => {
  const { navigation } = props;
  const [toggle, setToggle] = useState(false);
  const [contentSelect, selectedContent] = useState(0);

  type item = {
    id: string;
    content1: string;
  };

  type item_main = {
    item: item;
    index: number;
  };

  const renderItem = React.useCallback(
    (item: item_main) => {
      return (
        <TouchableOpacity onPress={() => selectedContent(item.index)}>
          <Text
            style={{
              ...Style.txt,
              textAlign: 'left',
              color: item.index == contentSelect ? Color.green : Color.app_black,
              marginBottom: 5,
              fontSize: wp(3),
            }}
          >
            {item.item.content1}
          </Text>
          {item.index == contentSelect && (
            <View
              style={{ borderBottomWidth: 0.6, borderBottomColor: Color.green, marginBottom: 5 }}
            ></View>
          )}
        </TouchableOpacity>
      );
    },
    [contentSelect]
  );

  const TermsConditionsWebView = React.useCallback(() => {
    return (
      <View style={Style.main}>
        <View style={Style.topView}>
          <FlatList data={TCdata} renderItem={(item: any) => renderItem(item)} />
        </View>
        <View style={Style.bottomView}>
          {contentSelect === 0 ? (
            <Text testID={TestIds.terms_detail} style={Style.txt}>
              {TermsCondition.terms}
            </Text>
          ) : contentSelect === 1 ? (
            <Text testID={TestIds.terms_detail} style={Style.txt}>
              {TermsCondition.terms_services}
            </Text>
          ) : contentSelect === 2 ? (
            <Text testID={TestIds.terms_detail} style={Style.txt}>
              {TermsCondition.debit_credit_card_terms}
            </Text>
          ) : (
            <Text testID={TestIds.terms_detail} style={Style.txt}>
              {TermsCondition.service}
            </Text>
          )}
        </View>
      </View>
    );
  }, [contentSelect, renderItem]);

  const checkBoxView = React.useCallback(() => {
    return (
      <View style={Style.checkView}>
        <TouchableOpacity onPress={() => setToggle(!toggle)} testID={TestIds.toggle_checkbox}>
          {toggle ? (
            <Image source={Images.checked} style={Style.checkImage} />
          ) : (
            <Image source={Images.un_checked} style={Style.checkImage} />
          )}
        </TouchableOpacity>
        <Text style={Style.textCheck}>{translate('agree_terms')}</Text>
      </View>
    );
  }, [toggle]);

  const bottomView = React.useCallback(() => {
    return (
      <GradientButton
        testIdValue={TestIds.terms_condition_btn}
        buttonText={translate('continue')}
        disabled={toggle ? false : true}
        toggleView={toggle}
        onPress={() => navigation.navigate(RouteNames.captureSignature.name)}
      />
    );
  }, [navigation, toggle]);

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.white} />
      <View style={Style.viewTop}>
        <TouchableOpacity style={Style.viewClose} onPress={() => navigation.goBack()}>
          <TouchableOpacity
            testID={TestIds.back_button + TestIds.step5}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.close} style={Style.backArrowStyle} resizeMode={'contain'} />
          </TouchableOpacity>
          <Text style={Style.backText}>{translate('close')}</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.8, alignItems: 'center', alignSelf: 'center' }}>
          <Text style={Style.heading}>{translate('agree_terms_heading')}</Text>
        </View>
      </View>
      <ScrollView style={Style.scroll}>
        {TermsConditionsWebView()}
        <View style={Style.bottomBorder}></View>
        {checkBoxView()}
        <View style={Style.buttonBottom}>{bottomView()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditions;
