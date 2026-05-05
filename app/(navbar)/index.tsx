import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import HomeScreen from "../Screen/HomeScreen";
import LoginScreen from "../Screen/LoginScreen";
import RegisterScreen from "../Screen/RegisterScreen";

export default function RootScreen() {
  const [currentScreen, setCurrentScreen] = useState("Login");
  const [authEmail, setAuthEmail] = useState("");

  const chooseScreen = () => {
    switch (currentScreen) {
      case "Home":
        return (
          <HomeScreen
            authEmail={authEmail}
            setCurrentScreen={setCurrentScreen}
          />
        );
      case "Login":
        return (
          <LoginScreen
            setCurrentScreen={setCurrentScreen}
            setAuthEmail={setAuthEmail}
          />
        );
      case "Register":
        return (
          <RegisterScreen
            setCurrentScreen={setCurrentScreen}
            setAuthEmail={setAuthEmail}
          />
        );
      default:
        return (
          <LoginScreen
            setCurrentScreen={setCurrentScreen}
            setAuthEmail={setAuthEmail}
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.container}>{chooseScreen()}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#0a7ea4",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
