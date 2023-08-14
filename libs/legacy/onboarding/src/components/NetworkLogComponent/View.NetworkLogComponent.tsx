import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import NetworkLogger from "react-native-network-logger";
import ViewModel from "./ViewModel.NetworkLogComponent";
import styles from "./Styles.NetworkLogComponent";
import { ICON_LIST } from "@src/assets/icons";

export const NetworkLogComponent = React.memo(
  () => {
    const { pan, panResponder, isNetworkModalVisible, _handleToggleShowModal } = ViewModel();

    return (
      <React.Fragment>
        {isNetworkModalVisible && (
          <View style={styles.container}>
            <View style={styles.modal}>
              <NetworkLogger theme="dark" />
              <TouchableOpacity style={styles.closeButton} onPress={_handleToggleShowModal(false)}>
                <Text style={styles.closeButtonTitle}>{"CLOSE"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Animated.View style={styles.showButtonStyle(pan)}>
          <TouchableOpacity onPress={_handleToggleShowModal(true)}>
            <Text style={styles.content}>{"Network Logs"}</Text>
          </TouchableOpacity>

          <Animated.View {...panResponder.panHandlers} style={styles.rightAnimatedView}>
            <ICON_LIST.DragIcon />
          </Animated.View>
        </Animated.View>
      </React.Fragment>
    );
  },
  () => true,
);

NetworkLogComponent.displayName = styles.SCREEN_TAG;
export default NetworkLogComponent;
