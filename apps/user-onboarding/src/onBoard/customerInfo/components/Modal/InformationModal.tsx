import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { IconErrorRedBbold, IconWarning } from 'src/assets/images/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'src/assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import Colors from '../../../../common/utils/Colors';
import Color from '../../../customerInformation/assets/Colors';
import { translate } from '../../../customerInformation/assets/translations/translate';

type Props = {
  isVisible?: boolean;
  isError?: boolean;
  onBackDropPress?: () => void;
  onPressOk?: () => void;
  onPressRetry?: () => void;
  onPressCancel?: () => void;
  display_message?: string;
  numberID?: string;
  resultSearch?: any;
};

const InformationModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      {props?.resultSearch === null ? (
        <View style={Styles.modal_view}>
          <IconWarning
            width={wp(7)}
            height={wp(7)}
            style={{ marginBottom: hp(1), marginLeft: wp(17) }}
          />

          <Text numberOfLines={2} style={Styles.title_text}>
            Tìm kiếm theo GTTT khác
          </Text>

          <Text numberOfLines={2} style={Styles.title_err_text}>
            Lỗi: 999-Time out
          </Text>

          <View style={Styles.modal_view_bottom}>
            <TouchableOpacity style={Styles?.button_style1} onPress={props?.onPressOk}>
              <Text style={Styles?.button_text}>Đóng</Text>
            </TouchableOpacity>

            <GradientButton
              onPress={props.onPressRetry}
              buttonText={'Thử lại'}
              buttonStyle={{
                width: wp(20),
                alignSelf: 'center',
                height: wp(7),
                marginRight: wp(3),
              }}
              textStyle={{ fontWeight: '600' }}
              // disabled={props?.isError ?? false}
            />
          </View>
        </View>
      ) : (
        <View style={Styles.modal_view}>
          <Text numberOfLines={2} style={Styles.title_text}>
            Kết quả tìm kiếm
          </Text>

          <View style={Styles.title_view}>
            <Text numberOfLines={2} style={[Styles.label_text, { marginLeft: 7 }]}>
              Số GTTT :
            </Text>
            <Text numberOfLines={2} style={[Styles.info_text, { marginLeft: wp(2.5) }]}>
              {props?.numberID}
            </Text>
          </View>

          {props?.resultSearch?.map((result: any, index: any) => {
            return (
              <View key={index}>
                {props?.resultSearch?.length > 1 && (
                  <View
                    style={{
                      width: wp(50),
                      height: hp(0.05),
                      backgroundColor: Colors.placeholder_grey,
                      marginBottom: hp(1),
                      marginLeft: wp(-2.5),
                    }}
                  />
                )}

                {result?.message?.errorMess?.cif ? (
                  <View style={Styles.title_view}>
                    <Text numberOfLines={2} style={Styles.label_text}>
                      Số CIF :
                    </Text>
                    <View style={Styles.err_view}>
                      <Text numberOfLines={2} style={Styles.info_text_err}>
                        {result?.result?.cifNumber ?? result?.message?.errorMess?.cif}
                      </Text>
                      <IconErrorRedBbold style={Styles.errorImage} />
                    </View>
                  </View>
                ) : (
                  <View style={Styles.title_view}>
                    <Text numberOfLines={2} style={Styles.label_text}>
                      Số CIF :
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        result?.message?.errorMess?.cif ? Styles.info_text_err1 : Styles.info_text,
                        { marginLeft: wp(3) },
                      ]}
                    >
                      {result?.result?.cifNumber ?? result?.message?.errorMess?.cif}
                    </Text>
                  </View>
                )}

                {(result?.message?.errorMess?.cif || result?.message?.successMess?.cif) &&
                  result?.result?.cifNumber && (
                    <View style={Styles.warn_view}>
                      <Text
                        numberOfLines={2}
                        style={
                          result?.message?.errorMess?.cif
                            ? Styles.info_text_error
                            : Styles.info_text_correct
                        }
                      >
                        {result?.message?.errorMess?.cif ?? result?.message?.successMess?.cif}
                      </Text>
                    </View>
                  )}

                {result?.result && (
                  <View>
                    {result?.message?.errorMess?.fullName ? (
                      <View style={Styles.title_view}>
                        <Text
                          numberOfLines={2}
                          style={[Styles.label_text, { marginLeft: wp(-0.7) }]}
                        >
                          Họ tên :
                        </Text>

                        <View style={Styles.err_view}>
                          <Text
                            numberOfLines={2}
                            style={[Styles.info_text_err, { marginLeft: wp(4.5) }]}
                          >
                            {result?.result?.fullName}
                          </Text>
                          <IconErrorRedBbold style={Styles.errorImage} />
                        </View>
                      </View>
                    ) : (
                      <View style={Styles.title_view}>
                        <Text
                          numberOfLines={2}
                          style={[Styles.label_text, { marginLeft: wp(-0.7) }]}
                        >
                          Họ tên :
                        </Text>
                        <View style={Styles.err_view}>
                          <Text
                            numberOfLines={2}
                            style={[Styles.info_text, { marginLeft: wp(4.5) }]}
                          >
                            {result?.result?.fullName}
                          </Text>
                        </View>
                      </View>
                    )}

                    <View style={Styles.warn_view}>
                      <Text
                        numberOfLines={3}
                        style={
                          result?.message?.errorMess?.fullName
                            ? Styles.info_text_error
                            : Styles.info_text_correct
                        }
                      >
                        {result?.message?.errorMess?.fullName ??
                          result?.message?.successMess?.fullName}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}

          <View style={Styles.modal_view_bottom}>
            <GradientButton
              onPress={props.onPressOk}
              buttonText={translate('btn_ok_text')}
              buttonStyle={{
                width: wp(25),
                alignSelf: 'center',
                height: wp(8),
                marginHorizontal: wp(2),
              }}
              textStyle={{ fontWeight: '600' }}
              // disabled={props?.isError ?? false}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: hp(4),
    paddingVertical: hp(2.5),
    justifyContent: 'center',
    width: wp(55),
  },
  modal_view_bottom: {
    width: wp(60),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title_view: {
    width: wp(60),
    marginVertical: hp(0.3),
    marginLeft: hp(5),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  warn_view: {
    marginVertical: hp(0.3),
    marginLeft: hp(4),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  err_view: {
    marginLeft: -15,
    flexDirection: 'row',
    flex: 3,
  },
  info_text: {
    color: Color.black,
    fontWeight: 'normal',
    marginLeft: hp(3),
    fontSize: hp(1.5),
    flex: 3,
  },
  info_text_err1: {
    color: Color.red,
    fontWeight: 'normal',
    marginLeft: hp(3),
    fontSize: hp(1.5),
    flex: 3,
  },
  info_text_err: {
    color: Color.red,
    fontWeight: 'normal',
    marginLeft: hp(3),
    marginRight: hp(1),
    fontSize: hp(1.5),
  },
  info_text_error: {
    color: Color.red,
    fontWeight: 'normal',
    marginLeft: hp(6),
    marginBottom: hp(0.6),
    fontSize: hp(1.5),
    flex: 3,
  },
  info_text_correct: {
    color: '#1FB369',
    fontWeight: 'normal',
    marginLeft: hp(6),
    marginBottom: hp(0.6),
    fontSize: hp(1.5),
    flex: 3,
  },
  label_text: {
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(1.5),
    fontWeight: '600',
    marginBottom: hp(1),
    flex: 1,
  },
  title_text: {
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(2.1),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  title_err_text: {
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(1.6),
    fontWeight: '400',
    marginBottom: hp(2),
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between' },
  button_style1: {
    backgroundColor: Color.white,
    width: wp(25),
    height: wp(8),
    marginHorizontal: wp(2),
    alignSelf: 'flex-end',
    marginRight: wp(2),
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Color?.app_black,
    fontWeight: '600',
    fontSize: 18,
  },
  f: {
    backgrounndColor: Color.red,
    flex: 1,
  },
  errorImage: {
    // height: 15,
    // width: 15,
    marginTop: wp(-0.5),
  },
  button_style1: {
    backgroundColor: Color.white,
    width: wp(20),
    height: wp(7),
    alignSelf: 'flex-end',
    marginLeft: wp(4),
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Color?.app_black,
    fontWeight: 'normal',
    fontSize: 18,
  },
});
export default InformationModal;
