import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { IReviewInfoHeading, IReviewInfoResponse } from '../typings/ReviewInfoResponse';

type Props = {
  data: IReviewInfoResponse;
};
const PersonalDocInfo = (props: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <View style={Style.container}>
      <TouchableOpacity>
        <Text style={Style.heading_text}>{translate('personal_doc_info')}</Text>
        {/* <Image style={Style.icon_style} source={!open ? Images.drop_down : Images.drop_up} /> */}
      </TouchableOpacity>
      {open && (
        <FlatList
          style={Style.dropdown_view}
          data={IReviewInfoHeading}
          renderItem={({ item, index }) => {
            return (
              <View style={Style.option_view}>
                <Text style={Style.option_heading}>{item}</Text>
                {index === 0 ? (
                  <Image
                    style={Style.user_img}
                    source={{ uri: Object.values(props.data)[index] }}
                  />
                ) : (
                  <Text style={Style.option_info}>{Object.values(props.data)[index]}</Text>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  user_img: { height: hp(9), width: hp(9), borderRadius: 12 },
  container: {
    alignSelf: 'center',
    width: wp(94),
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: hp(1.5),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  option_view: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  heading_text: {
    fontSize: hp(2),
    color: Colors.light_black,
    fontWeight: '500',
  },
  icon_style: {
    right: wp(1),
    position: 'absolute',
    height: hp(2.5),
    width: hp(2.5),
    top: 0,
  },
  option_heading: {
    flex: 0.4,
    fontWeight: '600',
    color: Colors.light_black,
    fontSize: hp(1.6),
    textAlign: 'left',
    width: wp(35),
  },
  dropdown_view: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: Colors.border_green,
  },
  option_info: {
    fontWeight: '400',
    color: Colors.light_black,
    fontSize: hp(1.6),
    flex: 0.6,
  },
});
export default PersonalDocInfo;
