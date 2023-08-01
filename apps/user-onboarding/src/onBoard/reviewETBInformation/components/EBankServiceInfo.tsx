import { IconBlackLogo, IconEBanking } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { EBankingService } from '@screens/productServices/typings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InformationViewLine from './InformationViewLine';
import { DigiInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import { useAppSelector } from 'src/redux/hooks';
import HelperManager from 'src/common/utils/HelperManager';

type Props = {
  data: DigiInterface;
};

const EBankServiceInfo = (props: Props) => {
  const getDigibankDetail = useAppSelector((state) => state.getRegDigibankInfo.response);
  const accountListData = useAppSelector((state) => state.getAccountList.response);
  const { electronicBanking  } = props.data;


  const shouldShowVCBDigitalCard = React.useMemo(() => {
    if (HelperManager.isValid(getDigibankDetail?.isToggle) && 
        HelperManager.isValid(accountListData?.currentAccounts?.some(s => s.currency === 'VND')) || 
        HelperManager.isValid(accountListData?.openAccounts?.some(s => s.currency === 'VND'))) return true

    return false;
  }, [getDigibankDetail, accountListData]);

  const defaultAccountText = React.useMemo(() => {
    let output = 'Tài khoản đăng ký mở mới';

    if (HelperManager.isValid(electronicBanking?.existingAccountRequested)) {
      if(HelperManager.isValid(electronicBanking?.oldAccountNumberRequested))
          output = `${electronicBanking?.oldAccountNumberRequested} (Số tài khoản mới: ${electronicBanking.accountNumberRequested}) - ${electronicBanking?.accountCurrencyRequested}`;
      else
        output = `${electronicBanking.accountNumberRequested} ${electronicBanking?.accountCurrencyRequested ? ' - ' + electronicBanking?.accountCurrencyRequested : ''}`;
    }
    // else
    // {
    //   output = `${electronicBanking?.accountNumberRequested ?? ''} ${electronicBanking?.accountCurrencyRequested ? ' - ' + electronicBanking?.accountCurrencyRequested : ''}`;
    // }
  
    return output;
  }, [electronicBanking]);

  return (
    <View style={Style.box_style}>
      <View style={Style.top_view}>
        <IconEBanking height={32} width={32} style={Style.icon_style} />
        <Text style={Style.title_text}>{translate('ebank_services')}</Text>
      </View>


      <View style={Style.info_view}>
        {!props?.data?.ebankingRequested && (
          <View>
            <View style={{ flexDirection: 'row', marginLeft: -5 , marginBottom : 5 }}>
              <IconBlackLogo style={{ alignSelf: 'center', marginRight: 10 }} height={12} width={12} />
              <Text style={Style.heading_text}>Ngân hàng số VCB Digibank</Text>
            </View>
            <Text style={Style.text_info_phone}>
              {'Số điện thoại đăng ký dịch vụ: '}
              <Text style={{ fontWeight: '400' }}>{props?.data?.electronicBanking?.mobilePhone ?? ''}</Text>
            </Text>
            <Text style={Style.text_info_phone}>
              {'Email đăng ký dịch vụ: '}
              <Text style={{ fontWeight: '400' }}>{props?.data?.electronicBanking?.email ?? ''}</Text>
            </Text>
            <Text style={Style.text_info_phone}>
              {translate('default_accounts') + ': '}
              <Text style={{ fontWeight: '400' }}>
                {defaultAccountText}
              </Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  text_info_phone: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: wp(3),
    marginLeft: wp(3),
  },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(7),
  },
  vcbDigitalCardContainer: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(8),
    marginBottom: 16,
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: Colors.white,
  },
  info_heading_digi: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 10,
    lineHeight : 25,
    marginLeft : -5
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  register_button: {
    alignSelf: 'flex-start',
    marginLeft: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.light_black,
    fontSize: hp(1.6),
    fontWeight: '400',
    marginLeft: 10,
  },
  title_text: {
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.6),
    fontWeight: '600',
  },
  right_icon_view: {
    right: 10,
    position: 'absolute',
    top: 10,
  },
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  error_text: {
    color: Colors.red,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  heading_text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
});
export default EBankServiceInfo;
