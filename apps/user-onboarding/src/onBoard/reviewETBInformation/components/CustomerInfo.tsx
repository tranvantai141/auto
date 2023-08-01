import { IconArrowDown, IconArrowUp, IconEditGreen } from '@assets/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { CreateFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import React, { useState } from 'react';
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
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { CustomerInfoHeadings, CustomerInfoResponse } from '../typings/ReviewInfoResponse';
import BeneficialOwner from './BeneficialOwner';
import FatcaNationalityInfo from './FatcaNationalityInfo';
import FatcaStatelessPersonInfo from './FatcaStatelessPersonInfo';
import InfoTextLine from './InfoTextLine';
import LegalAgreementInfo from './LegalAgreementInfo';

type Props = {
  onEdit?: () => void;
  data: CustomerInfoResponse;
  fatcaInfo: CreateFatcaInfoParam;
};

const CustomerInfo = (props: Props) => {
  const { data } = props;
  const [open, setOpen] = useState(true);
  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('customer_info')}</Text>
        <TouchableOpacity style={Style.icon_view} onPress={props?.onEdit}>
        <IconEditGreen height={hp(2.5)} width={hp(2.5)} style={Style.edit_icon}/>
          <Text style={Style.edit_text}>{translate('fix')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.icon_view} onPress={() => setOpen(!open)}>
        {!open? <IconArrowDown height={hp(2.5)} width={hp(2.5)} /> : <IconArrowUp height={hp(2.5)} width={hp(2.5)} />}
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={Style.dropdown_view}>
          <FlatList
            data={Object?.keys(CustomerInfoHeadings) || []}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View style={Style.option_view}>
                    <Text style={Style.option_heading}>
                      {Object.values(CustomerInfoHeadings)[index]}
                    </Text>
                    <Text style={Style.option_info}>{Object.values(data)[index]}</Text>
                  </View>
                  {index === 5 && data?.have_other === true && (
                    <View style={Style.option_view}>
                      <Text style={Style.option_heading}>{translate('another_purpose')}</Text>
                      <Text style={Style.option_info}>{props?.fatcaInfo?.otherSpecification}</Text>
                    </View>
                  )}
                  {Object.values(data)[index] === translate('have') ? (
                    index === 0 ? (
                      <FatcaStatelessPersonInfo fatcaInfo={props?.fatcaInfo} />
                    ) : index === 1 ? (
                      <FatcaNationalityInfo data={props?.fatcaInfo?.nationalities} />
                    ) : index === 2 ? (
                      <View style={Style.info_box}>
                        <InfoTextLine
                          heading={
                            props?.fatcaInfo?.hasTINOrSSN
                              ? translate('tin_ssn')
                              : translate('reason_not_having_tin_ssn')
                          }
                          hideBorder
                          info={
                            props?.fatcaInfo?.hasTINOrSSN
                              ? props?.fatcaInfo?.usTINOrSSN || ''
                              : props?.fatcaInfo?.reasonOfNotHavingTINOrSSN || ''
                          }
                        />
                      </View>
                    ) : index === 3 ? (
                      <BeneficialOwner beneficiaryItems={props?.fatcaInfo?.beneficialOwners} />
                    ) : index === 4 ? (
                      <LegalAgreementInfo data={props?.fatcaInfo} />
                    ) : null
                  ) : null}
                </View>
              );
            }}
          />
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
  info_box: {
    backgroundColor: Colors.light_grey,
    width: '100%',
    alignSelf: 'center',
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
    fontSize: 16,
    textAlign: 'left',
    flex: 0.5,
    paddingRight: 10,
  },
  dropdown_view: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: Colors.border_green,
  },
  option_info: {
    fontWeight: '400',
    color: Colors.light_black,
    fontSize: 16,
    textAlign: 'left',
    flex: 0.5,  
    alignSelf: 'flex-start',
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
export default CustomerInfo;
