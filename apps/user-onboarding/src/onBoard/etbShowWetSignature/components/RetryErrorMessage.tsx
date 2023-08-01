import { IconReloadWhite, IconWarningError } from "@assets/images";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { translate } from "../assets/translations/translate";
import Style from "../container/Style";

import LinearGradient from "react-native-linear-gradient";
import { heightPercentageToDP as hp} from "@assets/sizes/Sizes";
type Props = {
  onReload?:()=> void
};

const RetryErrorMessage = (props: Props) => {
  return (
    <View style={Style.errorMessageView}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconWarningError
          width={20}
          height={20}
          color={"white"}
          style={{ marginLeft: 5 }}
        />
        <Text style={{ marginLeft: 10, fontSize: hp(1.4) }}>
          {translate("system_interrupted")}
        </Text>
      </View>
      <TouchableOpacity onPress={props?.onReload} style={{ minWidth: "30%", justifyContent: "center" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#5FB621", "#008047"]}
          style={Style.gradiant_cont}
        >
          <>
            <IconReloadWhite />
            <Text style={Style.errorText}>
              {translate("retrieve_information")}
            </Text>
          </>

        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default RetryErrorMessage;
