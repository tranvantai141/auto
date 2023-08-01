import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Color from '../../utils/Colors';
import Images from '../../utils/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  heading?: string;
  info?: string;
  service?: boolean;
  image_id?: string;
  text_id?: string;
};

const InfoTextLineView = (props: Props) => {
  return (
    <View
      style={[
        Style.outer_box,
        {
          justifyContent: props?.service ? 'flex-start' : 'space-between',
          flex: 1,
        },
      ]}
    >
      {props?.service && (
        <Image
          testID={props?.image_id}
          resizeMode="contain"
          source={Images.info}
          style={Style.icon_style}
        />
      )}
      <Text testID={props?.text_id} style={Style.heading_style}>
        {props?.heading}
      </Text>
      {!props?.service && <Text style={Style.info_style}>{props?.info}</Text>}
    </View>
  );
};

const Style = StyleSheet.create({
  heading_style: {
    fontSize: hp(1.9),
    fontWeight: '500',
    color: Color.neutral_gray,
    alignSelf: 'center',
    overflow: 'hidden',
    flex: 0.4,
  },
  icon_style: { height: hp(2), alignSelf: 'center', width: hp(2), marginRight: wp(3) },
  info_style: {
    fontSize: hp(1.9),
    fontWeight: '300',
    color: Color.neutral_gray,
    alignSelf: 'center',
    overflow: 'hidden',
    textAlign: 'right',
    flex: 0.6,
  },
  outer_box: {
    flexDirection: 'row',
    backgroundColor: Color.light_grey,
    width: '100%',
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
  },
});
export default InfoTextLineView;
