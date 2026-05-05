import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ authEmail, setCurrentScreen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz!</Text>
      <Text style={styles.subtitle}>
        {authEmail
          ? `${authEmail} ile giriş yapıldı.`
          : "Hesabınıza başarıyla giriş yapıldı."}
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => setCurrentScreen("Login")}
      >
        <Text style={styles.primaryButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    padding: 28,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 26,
  },
  primaryButton: {
    backgroundColor: "#ef4444",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});
