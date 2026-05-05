import { StyleSheet, Text, View } from 'react-native';

export default function BlankScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Burası boş bir ekran. Navigasyon yapısını çözmek için kullanılabilir.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});