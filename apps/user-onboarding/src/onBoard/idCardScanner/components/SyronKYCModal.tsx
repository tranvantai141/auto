
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import GradientButtonAML from "./GradientButtonAML";
import Colors from "../assets/Colors";
import { translate } from "../assets/translations/translate";
import Loader from "@components/loaders/ActivityIndicator";

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onSelectItem?: (item: any) => void;
  status?: string;
  image_icon_id?: string;
  notify_text_id?: string;
  indicator_id?: string;
  check_info_id?: string;
  message_id?: string;
  button_1_id?: string;
  button_2_id?: string;
  onPressAgree?: () => void;
  onPressReject?: () => void;
  isLoading?: boolean;
  isLoadingAgree?: boolean
};

const SyronKYCModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <Text
          testID={props?.check_info_id}
          numberOfLines={2}
          style={Styles.info_text}
        >
          {translate("not_syronKYC")}
        </Text>
        <Text testID={props?.message_id} style={Styles.try_text}>
          {translate("Lookup_SyronKYC")}
        </Text>
        <View style={Styles.button_box}>
          <GradientButtonAML
            testIdValue={props?.button_2_id}
            buttonText1={translate("continue_text")}
            buttonText2={translate("customer_not_in_list")}
            buttonStyle={{ width: wp(55), alignSelf: "center" }}
            onPress={props.onPressAgree}
            isLoading={props.isLoadingAgree}
          />
          <TouchableOpacity
            testID={props?.button_1_id}
            style={Styles.white_button}
            onPress={props.onPressReject}
          >
            {props?.isLoading ? (
              <Loader color={Colors?.white} style={Styles.loaderStyle} />
            ) : (
              <>
                <Text style={Styles.button_text}>{translate("stop_working")}</Text>
                <Text style={Styles.button_text2}>{translate("customer_in_List")}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  white_button: {
    width: wp(55),
    backgroundColor: Colors.white,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: Colors.placeholder_grey,
  },
  try_text: {
    marginTop: hp(1),
    textAlign: "center",
    color: Colors.black_light,
    fontSize: hp(1.5),
    marginBottom: hp(1),
    fontWeight: "400",
  },
  button_text: {
    color: Colors.app_green,
    fontWeight: "500",
    fontSize: hp(1.9),
    textAlign: "center",
  },
  button_text2: {
    color: Colors.black,
    fontWeight: "normal",
    fontSize: hp(1.5),
    textAlign: "center",
  },
  modal: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 0,
  },
  modal_view: {
    width: wp(60),
    backgroundColor: Colors.white,
    alignSelf: "center",
    borderRadius: 12,
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    justifyContent: "center",
  },
  info_text: {
    textAlign: "center",
    color: Colors.black,
    fontSize: hp(2),
    fontWeight: "600",
  },
  image_icon: {
    height: hp(4.5),
    width: hp(4.5),
    alignSelf: "center",
  },
  button_box: {
    justifyContent: "space-between",
  },
  loaderStyle: {
    margin: 0,
  },
});
export default SyronKYCModal;
