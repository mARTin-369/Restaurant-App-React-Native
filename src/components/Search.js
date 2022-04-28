import { StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { elevation } from "../common/styles";
import { useState } from "react";

export default function Search({ setTerm }) {
  const [input, setInput] = useState("");
  return (
    <View style={[styles.container, styles.elevation]}>
      <FontAwesome name="search" size={25} />
      <TextInput
        placeholder="Restaurants, foods"
        style={styles.searchText}
        value={input}
        onChangeText={(text) => {
          setInput(text);
        }}
        onEndEditing={() => {
          input ? setTerm(input) : "";
          setInput("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    borderRadius: 30,
    marginHorizontal: 25,
  },
  elevation,
  searchText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
