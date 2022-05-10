import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Categories from "../components/Categories";
import Header from "../components/Header";
import Restaurants from "../components/Restaurants";
import Search from "../components/Search";

export default function HomeScreen() {
  const [term, setTerm] = useState("indian");
  const categories = [
    {
      name: "Burger",
      url: require("../assets/images/burger.png"),
    },
    {
      name: "Dessert",
      url: require("../assets/images/cake.png"),
    },
    {
      name: "Pasta",
      url: require("../assets/images/pasta.png"),
    },
    {
      name: "Pizza",
      url: require("../assets/images/pizza.png"),
    },
    {
      name: "Drinks",
      url: require("../assets/images/smoothies.png"),
    },
    {
      name: "Steak",
      url: require("../assets/images/steak.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />
      <Search setTerm={setTerm} />
      <Categories categories={categories} term={term} setTerm={setTerm} />
      <Restaurants term={term} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00f9ff",
    // height: "100%",
  },
});
