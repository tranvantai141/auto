import React from "react";
import { Button, Text, View } from "react-native";
import styles from "./Styles.HomeScreen";
import ViewModel from "./ViewModel.HomeScreen";

const HomeScreen = React.memo(() => {
  const { auth, _handleLogout } = ViewModel();
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={_handleLogout} />

      <Text>{auth.access_token}</Text>
      <Text>{auth.refresh_token}</Text>
    </View>
  );
});

HomeScreen.displayName = styles.SCREEN_TAG;
export default HomeScreen;
