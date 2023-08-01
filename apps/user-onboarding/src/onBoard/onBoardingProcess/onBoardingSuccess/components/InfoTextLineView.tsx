import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { DebitCards } from '../typings/TransactionResultParams';
import { IconErrorRed, IconRefreshBlue } from '@assets/images';

type Props = {
  heading?: string;
  info?: string | undefined;
  card?: Array<DebitCards>;
  currency?: boolean;
  errorMessage?: string;
  isHaveDigiCard?: boolean;
  isHideHeading?: boolean;
  accountIndex?: number;
};

const InfoTextLineView = (props: Props) => {
  const {
    isHideHeading,
    info,
    card,
    currency,
    errorMessage,
    isHaveDigiCard,
    heading,
    accountIndex,
  } = props;
  const accountIndexTitle = accountIndex ? `Tài khoản ${accountIndex} : ` : '';
  return (
    <>
      <View style={Style.outer_box}>
        <Text style={Style.heading_style}>{isHideHeading ? '' : heading}</Text>
        {info === '' ? (
          <View style={Style.click_view}>
            <Image style={[Style.icon_style, { tintColor: '#EF6D00' }]} source={Images?.timer} />
            <Text style={[Style.info_style, { color: '#EF6D00' }]}>
              {accountIndexTitle + translate('pending')}
            </Text>
          </View>
        ) : info === 'error' ? (
          <View style={Style.click_view}>
            <IconErrorRed height={hp(2)} width={hp(2)} style={Style.icon_style} />
            <Text style={[Style.info_style, { color: Color.error_red }]}>
              {accountIndexTitle + translate('error')}
              {errorMessage ? `: ${errorMessage}` : ''}
            </Text>
          </View>
        ) : info === 'processing' ? (
          <View style={Style.click_view}>
            <IconRefreshBlue height={hp(2)} width={hp(2)} style={Style.icon_style} />
            <Text style={[Style.info_style, { color: Color.blue }]}>
              {accountIndexTitle + translate('processing')}
            </Text>
          </View>
        ) : (
          <Text style={Style.info_style}>{accountIndexTitle + info}</Text>
        )}
      </View>
      {isHaveDigiCard && (
        <View key={9999} style={Style.info_view}>
          <Image resizeMode="contain" source={Images?.dot} style={Style?.dot_style} />
          <Text style={Style.term_info}>Thẻ Ghi nợ quốc tế phi vật lý VCB DigiCard</Text>
        </View>
      )}
      {card &&
        card.map((res, index) => {
          return res ? (
            <View key={index} style={Style.info_view}>
              <Image resizeMode="contain" source={Images?.dot} style={Style?.dot_style} />
              <Text style={Style.term_info}>{res?.name}</Text>
            </View>
          ) : null;
        })}
    </>
  );
};

const Style = StyleSheet.create({
  term_info: {
    fontWeight: '500',
    fontSize: hp(1.4),
    color: Color.black,
    textAlign: 'left',
    marginLeft: wp(1),
  },
  info_view: {
    width: '50%',
    flexDirection: 'row',
    marginBottom: hp(1),
    alignSelf: 'flex-end',
  },
  dot_style: {
    height: hp(0.5),
    width: hp(0.5),
    marginTop: hp(0.8),
  },
  heading_style: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: Color.neutral_gray,
    textAlign: 'left',
    overflow: 'hidden',
    width: '50%',
  },
  info_style: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: Color.dark_black,
    overflow: 'hidden',
    textAlign: 'left',
    width: '50%',
  },
  icon_style: {
    // height: hp(2),
    // width: hp(2),
    marginRight: 8,
  },
  outer_box: {
    flexDirection: 'row',
    backgroundColor: Color.light_grey,
    width: '100%',
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  click_view: {
    flexDirection: 'row',
  },
});
export default InfoTextLineView;
