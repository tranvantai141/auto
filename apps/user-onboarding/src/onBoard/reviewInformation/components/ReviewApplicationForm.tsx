import { IconArrowDown, IconArrowUp, IconDocumentBlack } from '@assets/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { FormInfo } from '@screens/printApplicationForm/typings/FormInfo';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';

type Props = {
  handleOnSeeDetailsPress: (formId: 'banking-services' | 'compliance') => void;
  showCompliance?: boolean;
};

const ReviewApplicationForm = (props: Props) => {
  const [open, setOpen] = useState(true);
  const formInfo: FormInfo[] = [
    {
      formId: 'banking-services',
      formTitle: 'form_description_banking_services',
      printActionTitle: 'print_form',
    },
    {
      formId: 'compliance',
      formTitle: 'form_description_compliance',
      printActionTitle: 'print_form',
    },
  ];

  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('application_form_section_title')}</Text>
        <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
        {!open? <IconArrowDown height={hp(2.5)} width={hp(2.5)} /> : <IconArrowUp height={hp(2.5)} width={hp(2.5)} />}
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={Style.dropdown_view}>
          {formInfo.map((item: FormInfo, index: number) => {
            const onPressSeeDetails = () => props.handleOnSeeDetailsPress(item.formId);
            return index === 1 && !props?.showCompliance ? null : (
              <View
                key={item.formId}
                style={{
                  backgroundColor: Colors.white,
                  flexDirection: 'row',
                  padding: 18,
                  marginBottom: 20,
                  borderBottomColor: Colors.border_grey,
                  borderBottomWidth:
                    item.formId === 'banking-services' ? StyleSheet.hairlineWidth : 0,
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <IconDocumentBlack height={24} width={24}/>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <Text style={{ fontSize: 16, lineHeight: 24 }}>{translate(item.formTitle)}</Text>
                  <Text
                    onPress={onPressSeeDetails}
                    style={{ color: Colors.app_green, fontSize: 16, lineHeight: 24 }}
                  >
                    {translate('see_details')}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  option_view: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  outer_view: { flexDirection: 'row' },
  container: {
    alignSelf: 'center',
    width: wp(94),
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: hp(1.5),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    marginBottom: hp(10),
    paddingVertical: hp(2),
  },
  heading_text: {
    fontSize: hp(2),
    color: Colors.light_black,
    fontWeight: '500',
  },
  icon_style: {
    height: hp(2.5),
    width: hp(2.5),
  },
  icon_view: {
    right: wp(1),
    position: 'absolute',
  },
  edit_icon: {
    right: wp(10),
    position: 'absolute',
    height: hp(2.5),
    width: hp(2.5),
  },
  option_heading: {
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
  },
  edit_text: {
    fontWeight: '400',
    color: Colors.border_green,
    fontSize: hp(1.6),
    right: wp(5.5),
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default ReviewApplicationForm;
