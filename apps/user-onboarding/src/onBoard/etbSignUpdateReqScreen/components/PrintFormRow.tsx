import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../assets/Colors";
import { translate } from "../assets/translations/translate";
import PrintItemView from "./PrintItemView";
import { heightPercentageToDP as hp } from "@assets/sizes/Sizes";
import { IconDocumentBlack } from "@assets/images";

interface IPrintFormRow {
  rowTitle: string;
  printActionTitle: string;
  onPressPrintForm: () => void;
  onPressSeeDetails: () => void;
  isPrintDisabled: boolean;
}
const PrintFormRow = (props: IPrintFormRow) => {
  return (
    <View style={Style.container}>
       <View style={Style.iconDocumentView}>
        <IconDocumentBlack />
        </View>
        <View style={Style.textContainer}>
          <Text style={Style.titleText}>{props.rowTitle}</Text>
          <Text onPress={props.onPressSeeDetails} style={Style.detailText}>
            {translate("see_details")}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <PrintItemView
            isDisabled={props.isPrintDisabled}
            onPress={props.onPressPrintForm}
            key={"print-1"}
            title={translate(props.printActionTitle)}
          />
        </View>
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: "row",
    padding: 18,
    marginBottom: 20,
  },
  iconDocumentView: { alignItems: "flex-start", justifyContent: "flex-start" },
  textContainer: { flex: 1, paddingHorizontal: 20 },
  titleText: {
    fontSize: hp(1.5),
    fontWeight: "400",
    color: Colors.dark_black,
  },
  detailText: {
    color: Colors.app_green,
    fontSize: hp(1.5),
    fontWeight: "400",
    marginTop: 2,
  },
});
export default PrintFormRow;
