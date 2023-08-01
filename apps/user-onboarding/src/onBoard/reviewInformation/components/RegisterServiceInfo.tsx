import { IconArrowDown, IconArrowUp, IconEditGreen } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import DepositAccService from './DepositAccService';
import EBankServiceInfo from './EBankServiceInfo';
import NonPhysicalDebitCardInfo from './NonPhysicalDebitCardInfo';
import PhysicalDebitCardInfo from './PhysicalDebitCardInfo';

type Props = {
  onEdit?: () => void;
};

const RegisterServiceInfo = (props: Props) => {
  const [open, setOpen] = useState(true);
  const createProductServiceState = useAppSelector((state: RootState) => state.productService);

  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('register_service_info')}</Text>
        <TouchableOpacity style={Style.icon_view} onPress={props?.onEdit}>
          <IconEditGreen height={hp(2.5)} width={hp(2.5)} style={Style.edit_icon} />
          <Text style={Style.edit_text}>{translate('fix')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
          {!open ? (
            <IconArrowDown height={hp(2.5)} width={hp(2.5)} />
          ) : (
            <IconArrowUp height={hp(2.5)} width={hp(2.5)} />
          )}
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={Style.dropdown_view}>
          {(createProductServiceState.account && createProductServiceState.account.length > 0 && (
            <DepositAccService data={createProductServiceState.account} />
          )) || <View />}
          {(createProductServiceState.account &&
            createProductServiceState.account.length > 0 &&
            createProductServiceState.ebanking &&
            (createProductServiceState.ebanking.registerDigibank ||
              createProductServiceState.ebanking.registerPhoneBanking ||
              createProductServiceState.ebanking.registerSmsBanking) && (
              <EBankServiceInfo data={createProductServiceState.ebanking} />
            )) || <View />}

          {(createProductServiceState.account.filter((acc) => acc?.product?.currencyName === 'VND')
            .length > 0 &&
            createProductServiceState.ebanking &&
            createProductServiceState.ebanking.registerDigibank &&
            createProductServiceState.debitECard &&
            createProductServiceState.debitECard.length > 0 && (
              <NonPhysicalDebitCardInfo
                data={createProductServiceState.debitECard}
                email={createProductServiceState.ebanking.digibankEmail}
              />
            )) || <View />}

          {(createProductServiceState.debitCard &&
            createProductServiceState.debitCard.length > 0 &&
            createProductServiceState.account &&
            createProductServiceState.account.length > 0 && (
              <PhysicalDebitCardInfo
                data={createProductServiceState.debitCard}
                email={createProductServiceState?.ebanking?.digibankEmail ?? ''}
              />
            )) || <View />}
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
export default RegisterServiceInfo;
