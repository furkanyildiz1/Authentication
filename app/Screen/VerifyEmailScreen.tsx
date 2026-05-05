import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type VerifyEmailScreenProps = {
  authEmail: string;
  setCurrentScreen: (screen: string) => void;
};

export default function VerifyEmailScreen({
  authEmail,
  setCurrentScreen,
}: VerifyEmailScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setError("Lütfen kodu girin.");
      return;
    }
    if (trimmedCode.length < 4) {
      setError("Kod en az 4 karakter olmalıdır.");
      return;
    }

    setError("");
    Alert.alert("Doğrulama tamamlandı", "E-posta adresiniz onaylandı.");
    setCurrentScreen("Home");
  };

  const handleResend = () => {
    Alert.alert(
      "Tekrar gönderildi",
      `${authEmail || "E-posta adresi"} için doğrulama kodu yeniden gönderildi.`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-posta Doğrulama</Text>
      <Text style={styles.subtitle}>
        {authEmail
          ? `${authEmail} adresine gönderilen kodu girin.`
          : "Kayıt sırasında tanımlanan e-posta bulunamadı."}
      </Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Doğrulama kodu"
        keyboardType="number-pad"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
        <Text style={styles.primaryButtonText}>Onayla</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleResend}>
        <Text style={styles.secondaryButtonText}>Kodu tekrar gönder</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCurrentScreen("Login")}
      >
        <Text style={styles.cancelButtonText}>Giriş sayfasına dön</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e293b",
  },
  subtitle: {
    color: "#475569",
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#1f2937",
  },
  errorText: {
    color: "#b91c1c",
    marginBottom: 12,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 28,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
});
