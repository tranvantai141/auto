import React from "react";
import styles from "../Styles.ErrorBoundaryComponent";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { IErrorScreenProps } from "../Model.ErrorBoundaryComponent";

// eslint-disable-next-line react/prop-types
const ErrorScreen: React.FC<IErrorScreenProps> = React.memo(({ error, resetError }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}></View>
      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>{"There is an error"}</Text>
        <Text style={styles.note}>{"Please contact to dev team to resolve"}</Text>
        <Text style={styles.error}>{error.toString()}</Text>
        <TouchableOpacity style={styles.button} onPress={resetError}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

ErrorScreen.displayName = "ErrorScreen";
export default ErrorScreen;
