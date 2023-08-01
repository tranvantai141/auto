import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from 'src/common/utils/Colors';
import { translate } from '../assets/translations/translate';
import Images from '../assets/Images';
import TermsCondition, { TCdata } from '@dummy/TermsCondition';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { IconCancel } from '@assets/images';
import HelperManager from 'src/common/utils/HelperManager';

type Props = {
  isVisible?: boolean;
  setIsVisible?: () => void;
  touchableView?: () => void;
  okClick?: () => void;
  secondMessage?: string;
  onPressClose?: () => void;
  onPressNext?: () => void;
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
  const [contentSelect, selectedContent] = useState(0);
  const TermsConditionsWebView = React.useCallback(() => {
    const createProductServiceState = useAppSelector((state: RootState) => state.productService);
    const [listCondition, setListCondition] = useState<
      {
        id: number;
        content1: string;
      }[]
    >([]);

    useEffect(() => {
      const arr = [];
      if (HelperManager.isValid(createProductServiceState.account)) {
        arr.push(TCdata[0]);
      }
      if (
        createProductServiceState.ebanking &&
        (createProductServiceState.ebanking.registerDigibank ||
          createProductServiceState.ebanking.registerPhoneBanking ||
          createProductServiceState.ebanking.registerSmsBanking)
      ) {
        arr.push(TCdata[1]);
        if (createProductServiceState.ebanking.registerDigibank) {
          arr.push(TCdata[2]);
        }
        arr.push(TCdata[3]);
      }
      if (
        !createProductServiceState.ebanking?.registerDigibank &&
        createProductServiceState.debitCard &&
        createProductServiceState.debitCard.length != 0
      ) {
        arr.push(TCdata[2]);
      }
      arr.push(TCdata[4])
      setListCondition(arr);
    }, []);

    const whichContent = () => {
      let output = ''

      switch (contentSelect) {
        case 0:
          output = TermsCondition.terms
          break;

        case 1:
          output = TermsCondition.terms_services
          break;

        case 2:
          output = TermsCondition.debit_credit_card_terms
          break;

        case 3:
          output = TermsCondition.service
          break;

      
        default:
          output = TermsCondition.personal_data_protection
          break;
      }

      return output;
    };
    
    return (
      <View style={Styles.main}>
        <View style={Styles.topView}>
          <FlatList
            data={listCondition}
            renderItem={(item: any) => renderItem(item)}
            scrollEnabled={false}
          />
        </View>
        <ScrollView style={Styles.bottomView}>
          <View style={{ borderRadius: 20, backgroundColor: Colors.white, padding: 20 }}>
          <Text style={Styles.txt}>{whichContent()}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }, [contentSelect]);

  const renderItem = React.useCallback(
    (item: item_main) => {
      return (
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
