import { AuthContext } from "@/store/auth-context";
import { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUpWithEmailPassword } from "../../services/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ setCurrentScreen, setAuthEmail }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const authCtx = useContext(AuthContext);

  const handleRegister = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirm
    ) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (trimmedPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }
    if (trimmedPassword !== trimmedConfirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setError("");
      const result = await signUpWithEmailPassword(
        trimmedEmail,
        trimmedPassword,
      );
      authCtx.authenticate(result.idToken);
      console.log("Firebase kayıt başarılı:", result);
      setAuthEmail(trimmedEmail);
      Alert.alert(
        "Kayıt başarılı",
        "Hesabınız oluşturuldu. Giriş yapabilirsiniz.",
      );
      setCurrentScreen("Home");
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || err.message;
      console.error("Firebase kayıt hatası:", errorMessage);
      setError(errorMessage || "Kayıt işlemi başarısız oldu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Hesap Oluştur</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Ad"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Soyad"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-posta"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Şifre"
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Şifreyi tekrar gir"
        secureTextEntry
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setCurrentScreen("Login")}
      >
        <Text style={styles.secondaryButtonText}>Zaten hesabım var</Text>
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
    marginBottom: 20,
    color: "#1e293b",
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
    backgroundColor: "#16a34a",
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
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
});
