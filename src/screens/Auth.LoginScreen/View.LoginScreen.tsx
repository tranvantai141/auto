import React from "react";
import { Button, Text, View } from "react-native";
import styles from "./Styles.LoginScreen";
import ViewModel from "./ViewModel.LoginScreen";
import { TLoginScreenProps } from "./Model.LoginScreen";
import { COLORS, THEMES } from "@src/assets";
import moment from "moment";

const LoginScreen: React.FC<TLoginScreenProps> = React.memo((props) => {
  const { _handleLogin, userInformation } = ViewModel(props?.route?.params);

  const _renderUserData = React.useCallback(() => {
    const output: React.ReactNode[] = [];
    const userInformationClone = Object.assign({}, userInformation);

    for (const key of Object.keys(userInformation).filter((k) => k !== "purposes")) {
      let value = (userInformation as any)[key].toString();
      if (key === "dateOfBirth") {
        value = moment((userInformation as any)[key] as Date).format("DD/MM/YYYY");
      }
      output.push(
        <View style={styles.rowContainer} key={key}>
          <Text style={THEMES.commonRegularText}>{key}: </Text>
          <Text style={THEMES.commonRegularText}>{value}</Text>
        </View>,
      );
    }

    output.push(
      <View style={styles.rowContainer}>
        <Text style={THEMES.commonRegularText}>purposes: </Text>
        <Text style={THEMES.commonRegularText}>
          {userInformationClone?.purposes?.map((purpose) => purpose.name).join(", ")}
        </Text>
      </View>,
    );

    return output;
  }, [userInformation]);

  return (
    <View style={styles.container}>
      <Text style={THEMES.titleStyle(COLORS.defaultTextColor)}>{`LOGIN SCREEN: user's data`}</Text>
      {_renderUserData()}

      <Button title="login" onPress={_handleLogin} />
    </View>
  );
});

LoginScreen.displayName = styles.SCREEN_TAG;
export default LoginScreen as React.ComponentType;
