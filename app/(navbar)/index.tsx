import { useEffect, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import HomeScreen from "../Screen/HomeScreen";
import LoginScreen from "../Screen/LoginScreen";
import RegisterScreen from "../Screen/RegisterScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false, //uyg ikonuna kırmızı bildirim sayısı ekler
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

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

  //bildirime basınca uygulamaya girme veya uygulama kapalıyken bildirime basınca uygulamaya girmeyi sağlar ve bunu useeffcet ile ypaprız
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification received");
        console.log(notification);
        const userName = notification.request.content.data.username;
        console.log("username: ", userName);
      },
    );

    return () => {
      subscription.remove(); //bunu yapmazsak uygulama kapalıyken bildirim gelince hata verir
    };
  }, []);

  async function scheduleNotificationAsync() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My First LOCAL NOTIFICATION",
        body: "This is the body of the notification",
        data: { username: "JohnDoe" },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
      },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.container}>{chooseScreen()}</View>
      <Button title="Test Notification" onPress={scheduleNotificationAsync} />
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
