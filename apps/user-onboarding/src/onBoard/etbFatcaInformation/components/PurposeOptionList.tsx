import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IPurposeInfo } from '@interfaces/I_UserInfo';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { IconCheckboxActive, IconCheckBoxInactive } from '@assets/images';

type Props = {
  onPressItem: (index: number) => void;
  data: Array<IPurposeInfo>;
  showErr?: boolean;
  addPurpose?: boolean;
  otherPurpose: string;
  setOtherPurpose: (text: string) => void;
  notAdded?: boolean;
  render_item_id: string;
};

const WIDTH = Dimensions.get('screen').width;

const PurposeOptionList = (props: Props) => {
  const [wt, setWt] = useState(WIDTH);
  const [orientation, setOrientation] = useState('portrait');

  const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    setWt(Dimensions.get('window').width);
    if (width < height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => getOrientation());
  }, [orientation]);

  const renderitem = (item: IPurposeInfo, index: number) => {
    return (
      <View style={[Style.outer_view, { flex: 0.3333 }]}>
        <TouchableOpacity style={Style.no_check} onPress={() => props?.onPressItem(index)}>
          {item?.selected? <IconCheckboxActive height={hp(2.4)} width={hp(2.4)} style={Style.image_check_uncheck} /> : <IconCheckBoxInactive height={hp(2.4)} width={hp(2.4)}  style={Style.image_check_uncheck}/>}
        </TouchableOpacity>
        <Text testID={props?.render_item_id + index} style={Style.text_style}>
          {item?.name}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={[Style.container, { borderColor: props?.showErr ? Color.error_red : Color.white }]}
    >
      <Text style={Style.info_text1}>
        {translate('purpose_selction_title1')}
        <Text testID={TestIds.selection_title_id} style={Style.info_text2}>
          {translate('purpose_selction_title2')}
        </Text>
      </Text>
      {props?.showErr && <Text style={Style.alert_msg}>{translate('alert_message')}</Text>}
      <FlatList
        numColumns={3}
        data={props?.data}
        renderItem={({ item, index }) => renderitem(item, index)}
      />
      {props?.addPurpose && (
        <>
          <TextInput
            onChangeText={props?.setOtherPurpose}
            value={props?.otherPurpose}
            placeholder={translate('purpose_placeholder')}
            placeholderTextColor={Color.placeholder_grey}
            numberOfLines={3}
            multiline={true}
            style={[
              Style.text_view,
              { borderColor: !props?.notAdded ? Color.placeholder_grey : Color.error_red },
            ]}
          />
          {props?.notAdded && <Text style={Style.err_msg}>{translate('purpose_placeholder')}</Text>}
        </>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    padding: hp(2),
    width: '100%',
    backgroundColor: Color.white,
    borderRadius: 8,
    marginTop: hp(2),
    borderWidth: 1,
    marginBottom: hp(4)
  },
  alert_msg: {
    color: Color.error_red,
    fontSize: hp(1.5),
    marginBottom: hp(1),
  },
  image_check_uncheck: {
    height: hp(2.4),
    width: hp(2.4),
    margin: 8,
    alignSelf: 'center',
  },
  outer_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  no_check: {
    alignSelf: 'flex-start',
  },
  text_style: {
    fontSize: wp(2),
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '400',
    marginLeft: 10,
  },
  text_view: {
    borderRadius: 8,
    borderColor: Color.error_red,
    borderWidth: 1,
    marginTop: hp(1),
    width: '100%',
    height: hp(8),
    padding: 10,
    fontSize: hp(1.6),
  },
  err_msg: {
    color: Color.error_red,
    fontSize: hp(1.5),
    marginTop: 10,
  },
  info_text1: {
    fontSize: hp(1.7),
    color: Color.app_black,
    fontWeight: '600',
    marginBottom: hp(1),
  },
  info_text2: {
    fontSize: hp(1.7),
    color: Color.light_grey_text,
  },
});
export default PurposeOptionList;
