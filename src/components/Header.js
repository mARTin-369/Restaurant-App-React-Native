import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.lightHeader}>Grab your</Text>
      <Text style={styles.LargeHeader}>Delicious meal!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lightHeader: {
    fontSize: 28,
    marginTop: 20,
  },
  LargeHeader: {
    fontSize: 36,
    fontWeight: "bold",
  },
  headerWrapper: {
    marginHorizontal: 25,
  },
});
