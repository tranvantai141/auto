import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from 'src/common/utils/Colors';
import { translate } from '../assets/translations/translate';
import TermsCondition from '@dummy/TermsCondition';
import { IconCancel } from '@assets/images';
import { TermAndConditionData } from '../typings/I_Save_Image';

type Props = {
  isVisible?: boolean;
  setIsVisible?: () => void;
  touchableView?: () => void;
  okClick?: () => void;
  secondMessage?: string;
  onPressClose?: () => void;
  onPressNext?: () => void;
  hideDebitCardRow?: boolean;
  newAccountRequested?: boolean;
  digibankRequested?: boolean;
};

type item = {
  id: string;
  content1: string;
};

type item_main = {
  item: item;
  index: number;
};

const TermsConditonModal = (props: Props) => {
  const [contentSelect, selectedContent] = useState(-1);
  useMemo(() => {
    if (contentSelect === -1) {
      if (props?.newAccountRequested) {
        selectedContent(0);
      } else if (props?.digibankRequested) {
        selectedContent(1);
      } else if (props?.hideDebitCardRow) {
        selectedContent(2);
      } else {
        selectedContent(4);
      }
    }
  }, []);

  const renderItem = React.useCallback(
    (item: item_main) => {
      return item?.index === 0 && !props?.newAccountRequested ? null : item?.index === 2 &&
        !props?.hideDebitCardRow ? null : (item?.index === 1 || item?.index === 3) &&
        !props?.digibankRequested ? null : (
        <TouchableOpacity onPress={() => selectedContent(parseInt(item.item.id))} activeOpacity={1}>
          <Text
            style={{
              ...Styles.txt,
              textAlign: 'left',
              color: parseInt(item.item.id) == contentSelect ? Colors.green : Colors.light_black,
              marginBottom: 10,
              marginTop: 8,
              fontSize: wp(2),
              fontWeight: '600',
            }}
          >
            {item.item && item.item.content1 ? item.item.content1 : ''}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                parseInt(item.item.id) === contentSelect ? Colors.green : Colors.light_grey,
              marginBottom: 5,
            }}
          ></View>
        </TouchableOpacity>
      );
    },
    [contentSelect]
  );

  const TermsConditionsWebView = React.useCallback(() => {
    let whichTerm = '';
    switch (contentSelect) {
      case 0:
        whichTerm = TermsCondition.terms;
        break;

      case 1:
        whichTerm = TermsCondition.terms_services;
        break;

      case 2:
        whichTerm = TermsCondition.debit_credit_card_terms;
        break;

      case 3:
        whichTerm = TermsCondition.service;
        break;

      default:
        whichTerm = TermsCondition.personal_data_protection;
        break;
    }

    return (
      <View style={Styles.main}>
        <View style={Styles.topView}>
          <FlatList
            data={TermAndConditionData}
            renderItem={(item: any) => renderItem(item)}
            scrollEnabled={false}
          />
        </View>
        <ScrollView style={Styles.bottomView}>
          <View style={{ borderRadius: 20, backgroundColor: Colors.white, padding: 20 }}>
            <Text style={Styles.txt}>{whichTerm}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }, [contentSelect, renderItem]);

  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.touchableView}>
      <View style={Styles.modalArea}>
        <View style={Styles.viewTop}>
          <TouchableOpacity style={Styles.viewClose} onPress={props.onPressClose}>
            <IconCancel height={hp(1.5)} width={hp(1.5)} style={Styles.backArrowStyle} />
            <Text style={Styles.backText}>{translate('close')}</Text>
          </TouchableOpacity>
          <View style={{ flex: 0.6, alignItems: 'center', alignSelf: 'center' }}>
            <Text style={Styles.heading}>{translate('agree_terms_heading')}</Text>
          </View>
        </View>
        <View style={Styles.scroll}>{TermsConditionsWebView()}</View>
      </View>
    </Modal>
  );
};
export default TermsConditonModal;
const Styles = StyleSheet.create({
  modalArea: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
  },
  viewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    height: hp(6),
  },
  viewClose: {
    flex: 0.2,
    flexDirection: 'row',
    marginLeft: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  backArrowStyle: {
    height: hp(2.5),
    width: hp(2.5),
    marginLeft: 10,
  },
  backText: {
    fontSize: wp(1.975),
    marginLeft: wp(1),
    color: Colors.light_black,
    fontWeight: '600',
  },
  heading: {
    color: Colors.app_black,
    fontSize: hp(1.6),
    fontWeight: '600',
    alignSelf: 'center',
  },
  scroll: {
    margin: wp(3),
    marginRight: wp(0),
    marginTop: 0,
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    opacity: 1,
    marginTop: 10,
  },
  buttonBottom: {
    margin: hp(3),
    marginTop: hp(0),
  },
  txt: {
    textAlign: 'left',
    color: Colors.light_black,
    lineHeight: hp(2.2222),
    fontSize: wp(1.975),
  },
  bottomView: {
    flex: 0.7,
    marginTop: 0,
    backgroundColor: Colors.light_grey,
    marginLeft: 10,
    padding: 20,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  topView: { flex: 0.4, lineHeight: 5, marginTop: 20 },
  checkView: {
    flexDirection: 'row',
    margin: hp(3),
    alignItems: 'center',
  },
  checkImage: {
    height: 28,
    width: 28,
    marginRight: 10,
  },
  textCheck: {
    color: Colors.app_black,
    fontSize: hp(1.5),
  },
});
