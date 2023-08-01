import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import {
  ICustomerInfoAddress,
  ICustomerInfoCard,
  ICustomerInfoForm,
  ICustomerInfoHeadings,
  ICustomerInfoPerson,
} from '@interfaces/I_Customer_info';
import { IconWarning, IconWarningError } from '@assets/images';

type Props = {
  text_id?: string;
  data: ICustomerInfoForm;
  age_error?: boolean;
  id_error?: boolean;
};

const PersonalInfoView = (props: Props) => {
  // View Infomation

  const renderViewInfoPerson = <T extends { id: string; name: string }[]>(
    data: T,
    numberParam: number
  ): JSX.Element => {
    return (
      <View
        style={{
          backgroundColor: Color.background_grey,
          marginHorizontal: wp(1.965),
          marginTop: wp(1.965),
          borderRadius: 12,
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={`item-${item.id}`}
              style={[
                {
                  borderBottomColor: data?.length - 1 === index ? Color.white : Color.dark_grey,
                  backgroundColor:
                    (numberParam + index === 1 && props.age_error) ||
                    (numberParam + index === 7 && props.id_error)
                      ? Color.red_10
                      : 'transparent',
                },

                Style.outer_view,
              ]}
            >
              <Text style={Style.heading_text}>{item.name}</Text>

              <View style={{ flexDirection: 'row', flex: 0.6, alignItems: 'center' }}>
                <Text
                  style={[
                    Style.info_text,
                    {
                      color:
                        (numberParam + index === 1 && props.age_error) ||
                        (numberParam + index === 7 && props.id_error)
                          ? Color.red_60
                          : Color.gray_100,
                    },
                  ]}
                >
                  {Object.values(props?.data)[numberParam + index]}
                </Text>

                {/* {numberParam + index === 1 && props.age_error && (
                  <IconWarningError height={wp(2.58)} width={wp(1.875)} style={Style.error} />
                )}
                {numberParam + index === 7 && props.id_error && (
                  <IconWarningError height={wp(2.58)} width={wp(1.875)} style={Style.error} />
                )} */}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <Text testID={TestIds.heading} style={Style.title_text}>
        {translate('personal_info_paper')}
      </Text>
      {renderViewInfoPerson(ICustomerInfoPerson, 0)}
      {renderViewInfoPerson(ICustomerInfoCard, 4)}
      {renderViewInfoPerson(ICustomerInfoAddress, 9)}
      {/* <View style={Style.lineView} /> */}
      {/* {ICustomerInfoHeadings.map((item, index) => {
        return (
          <View
            key={`item-${item.id}`}
            style={[
              {
                borderBottomColor:
                  ICustomerInfoHeadings?.length - 1 === index ? Color.white : Color.dark_grey,
              },

              Style.outer_view,
            ]}
          >
            <Text style={Style.heading_text}>{item.name}</Text>

            <Text style={Style.info_text}>{Object.values(props?.data)[index]}</Text>
            {index === 3 && props.age_error && (
              <IconWarning height={30} width={30} style={Style.error} />
            )}
            {index === 8 && props.id_error && (
              <IconWarning height={30} width={30} style={Style.error} />
            )}
          </View>
        );
      })} */}
    </View>
  );
};

const Style = StyleSheet.create({
  title_text: {
    color: Color.gray_100,
    fontSize: hp(1.851),
    fontWeight: '600',
    paddingHorizontal: hp(1.481),
  },
  lineView: {
    flex: 1,
    borderBottomColor: Color.primary,
    borderBottomWidth: 1,
    marginHorizontal: wp(2),
    margin: wp(2),
    marginBottom: 0,
  },
  outer_view: {
    // width: '100%',
    // backgroundColor: Color.white,
    borderBottomWidth: 1,
    // padding: hp(1.2),
    height: hp(3.707),
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  heading_text: {
    color: Color.gray_100,
    fontSize: hp(1.481),
    fontWeight: '600',
    flex: 0.4,
  },
  info_text: {
    color: Color.gray_100,
    fontSize: hp(1.481),
  },
  error: {
    marginLeft: 5,
  },
});
export default PersonalInfoView;
