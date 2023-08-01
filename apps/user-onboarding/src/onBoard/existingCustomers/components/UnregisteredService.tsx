import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import {
  IUnregisteredServiceHeadings,
  IUnregisteredServiceInfoForm,
} from '@interfaces/I_Unregistered_service';
import Images from '../assets/Images';
import { TestIds } from '../assets/TestIds';

type Props = {
  data: IUnregisteredServiceInfoForm;
  heading_test_id: string;
  test_id?: string;
};

const UnregisteredService = (props: Props) => {
  return (
    <View>
      <Text testID={props?.heading_test_id} style={Style.heading_style}>
        {translate('select_unregistered_service')}
      </Text>
      <View style={Style.info_box}>
        {IUnregisteredServiceHeadings.map((item, index) => {
          return (
            <View key={`item-${item.heading}`} style={[Style.outer_box]}>
              <Image resizeMode="contain" source={item?.img} style={Style.icon_style} />
              <Text testID={TestIds?.unregistered_info + index} style={Style.info_style}>
                {item?.heading}
              </Text>
              <TouchableOpacity>
                <Image resizeMode="contain" source={Images.un_checked} style={Style.icon_style} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  heading_style: {
    fontSize: hp(2.2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginBottom: hp(2),
  },
  info_box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(60),
    alignSelf: 'center',
  },
  outer_box: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    width: '100%',
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: hp(1.5),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.onboarding_grey,
    marginBottom: hp(1),
    justifyContent: 'space-between',
  },
  info_style: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: Color.app_black,
    alignSelf: 'center',
    left: wp(7),
    position: 'absolute',
  },
  icon_style: { height: hp(2), alignSelf: 'center', width: hp(2), marginRight: wp(3) },
});
export default UnregisteredService;
