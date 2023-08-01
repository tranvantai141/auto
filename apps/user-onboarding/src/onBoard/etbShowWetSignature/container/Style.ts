import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "@assets/sizes/Sizes";
import Colors from "../assets/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: hp(6),
  },
  headerView: {
    width: "100%",
    top: 0,
    paddingTop: hp(1),
    backgroundColor: Colors.white,
    position: "absolute",
    zIndex: 200,
  },
  mainContainer: {
    backgroundColor: Colors.light_grey,
    flex: 1,
  },
  scroll: {
    padding: wp(4),
    marginTop: 0,
  },
  info_text1: {
    fontSize: hp(1.5),
    color: Colors.app_black,
    fontWeight: "600",
  },
  info_text2: {
    fontSize: hp(1.5),
    color: Colors.light_grey_text,
  },

  listViews: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: "row",
    flex: 1,
    marginLeft: hp(2),
    marginRight: hp(2),
  },
  imageCheckUncheck: {
    height: 20,
    width: 20,
    margin: 5,
    alignSelf: "center",
  },
  listNameView: {
    flex: 0.6,
    margin: 5,
  },
  optionsName: {
    color: Colors.app_black,
    fontSize: hp(1.8),
  },
  noCheck: {
    flex: 0.2,
  },
  yesCheck: {
    flex: 0.1,
  },

  modalBtnsView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: Colors.light_grey,
    borderRadius: 10,
    height: hp(6.5),
    width: hp(7.5),
    flex: 0.4,
    margin: 5,
    marginTop: 15,
    justifyContent: "center",
  },
  buttonAgree: {
    borderRadius: 5,
  },
  heading: {
    fontSize: 22,
    color: Colors.app_black,
    alignSelf: "center",
    fontWeight: "600",
  },
  headingbelow: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.app_black,
    textAlign: "center",
  },
  buttonStyle: {
    width: wp(38),
    alignSelf: "center",
    flexDirection: "row",
    height: hp(5.5),
    marginTop:0
  },
  buttonView: {
    paddingVertical: hp(2),
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading_text: {
    fontSize: 28,
    fontWeight: "600",
    marginVertical: 16,
    lineHeight: 40,
    letterSpacing: -0.28,
    color: Colors.app_black,
  },
  touchableContainer: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(5.5),
    borderRadius: 10,
    width: wp(25),
    marginHorizontal: 15,
    borderColor: Colors.border_green,
  },
  touchableText: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 20,
    color: Colors.border_green,
  },
  imageView: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: wp(4),
    marginBottom: hp(3),
  },
  gradiant_cont: {
    height: 50,
    borderRadius: 10,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageView:{
    marginTop: wp(3),
    backgroundColor: "#F849321A",
    flex: 1,
    padding: wp(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  errorText:{
    color: "white",
    fontWeight: "normal",
    fontSize: 18,
    marginLeft: 10,
  }
});
