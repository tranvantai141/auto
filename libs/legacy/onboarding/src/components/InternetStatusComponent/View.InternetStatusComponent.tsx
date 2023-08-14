import React from "react";
import { Text, View } from "react-native";
import styles from "./Styles.InternetStatusComponent";
import ViewModel from "./ViewModel.InternetStatusComponent";
import { ICON_LIST } from "@src/assets/icons";

const InternetStatusComponent: React.FC = React.memo(
  () => {
    const { isConnected, showBackOnline } = ViewModel();

    return (
      <View style={styles.container}>
        {!isConnected && (
          <View style={styles.subContainer}>
            <ICON_LIST.InternetConnectionOnIcon style={styles.iconWrapper} />
            <Text style={styles.commonMediumText}>{"You are currently offline."}</Text>
          </View>
        )}

        {showBackOnline && (
          <View style={{ ...styles.subContainer, backgroundColor: "#0FDE82" }}>
            <ICON_LIST.InternetConnectionOffIcon style={styles.iconWrapper} />
            <Text style={styles.commonMediumText}>{"Your internet connection is restored."}</Text>
          </View>
        )}
      </View>
    );
  },
  () => true,
);

InternetStatusComponent.displayName = "InternetStatusComponent";
export default InternetStatusComponent;
