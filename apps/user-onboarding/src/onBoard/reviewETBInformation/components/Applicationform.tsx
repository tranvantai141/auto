import { IconArrowDown, IconArrowUp, IconDocumentBlack } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { FormInfo, FormType } from '../typings/ReviewInfoResponse';

type Props = {
  handleOnSeeDetailsPress: (formId: FormType) => void;
  showCompliance?: boolean;
  registerProduct?: boolean;
  isLoading?: boolean;
  openAccountRequested?: boolean;
  ebankingRequested?: boolean;
  debitCardRequested?: boolean;
  idUpdatedInfo?: boolean;
  isFatcaUpdated?: boolean;
};

const ApplicationForm = (props: Props) => {
  const [open, setOpen] = useState(true);

  const formProductServices: FormInfo[] = [
    {
      formId: 'register_customer_acc',
      formTitle: 'form_description_banking_services',
      printActionTitle: 'print_form',
    },
    {
      formId: 'register_digibank_form',
      formTitle: 'form_description_Ebanking',
      printActionTitle: 'print_form',
    },
    {
      formId: 'issued_debit_card_form',
      formTitle: 'form_description_debitCard',
      printActionTitle: 'print_form',
    },
    {
      formId: 'updateInfo',
      formTitle: 'form_description_updateInfo',
      printActionTitle: 'print_form',
    },

    {
      formId: 'fatca_info_form',
      formTitle: 'form_description_compliance',
      printActionTitle: 'print_form',
    },
  ];

  const formUpdateInfo: FormInfo[] = [
    {
      formId: 'updateInfo',
      formTitle: 'form_description_updateInfo',
      printActionTitle: 'print_form',
    },
  ];

  if (props?.registerProduct) {
    return (
      <View style={Style.container}>
        <View style={Style.outer_view}>
          <Text style={Style.heading_text}>{translate('application_form_section_title')}</Text>
          <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
            {!open ? (
              <IconArrowDown height={hp(2.5)} width={hp(2.5)} />
            ) : (
              <IconArrowUp height={hp(2.5)} width={hp(2.5)} />
            )}
          </TouchableOpacity>
        </View>
        {props?.isLoading ? (
          <Loader />
        ) : (
          open && (
            <ScrollView style={Style.dropdown_view}>
              <View
                key={formUpdateInfo[0].formId}
                style={{
                  backgroundColor: Colors.white,
                  flexDirection: 'row',
                  padding: 12,
                  borderBottomColor: Colors.border_grey,
                  borderBottomWidth: 0,
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <IconDocumentBlack height={24} width={24} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <Text style={{ fontSize: 16, lineHeight: 24 }}>
                    {translate(formUpdateInfo[0].formTitle)}
                  </Text>
                  <Text
                    onPress={() => props.handleOnSeeDetailsPress(formUpdateInfo[0].formId)}
                    style={{ color: Colors.app_green, fontSize: 16, lineHeight: 24 }}
                  >
                    {translate('see_details')}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )
        )}
      </View>
    );
  }

  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('application_form_section_title')}</Text>
        <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
          {!open ? (
            <IconArrowDown height={hp(2.5)} width={hp(2.5)} />
          ) : (
            <IconArrowUp height={hp(2.5)} width={hp(2.5)} />
          )}
        </TouchableOpacity>
      </View>
      {props?.isLoading ? (
        <Loader />
      ) : (
        open && (
          <ScrollView style={Style.dropdown_view}>
            {formProductServices.map((item: FormInfo, index: number) => {
              const onPressSeeDetails = () => props.handleOnSeeDetailsPress(item.formId);
              return index === 0 && !props?.openAccountRequested ? null : index === 1 &&
                !props?.ebankingRequested ? null : index === 2 &&
                !props?.debitCardRequested ? null : index === 3 &&
                !props?.idUpdatedInfo ? null : index === 4 && !props?.isFatcaUpdated ? null : (
                <View
                  key={item.formId}
                  style={{
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                    padding: 12,
                    borderBottomColor: Colors.border_grey,
                    borderBottomWidth:
                      // eslint-disable-next-line no-constant-condition
                      item.formId === 'register_customer_acc' ||
                      'issued_debit_card_form' ||
                      'register_digibank_form'
                        ? StyleSheet.hairlineWidth
                        : 0,
                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <IconDocumentBlack height={24} width={24} />
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, lineHeight: 24 }}>
                      {translate(item.formTitle)}
                    </Text>
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
        )
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
export default ApplicationForm;
