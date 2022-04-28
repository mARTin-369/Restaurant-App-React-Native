import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantItem from "./RestaurantItem";

export default function Restaurants({ term }) {
  const [{ data, loading, error }, searchRestaurants] = useRestaurants();

  useEffect(() => {
    searchRestaurants(term);
  }, [term]);

  // console.log(data, loading, error);

  if (loading) return <ActivityIndicator size="large" color="#99CC00" />;
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Some thing went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top Restaurants</Text>
      <FlatList
        data={data}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 25,
    height: 100,
    // marginVertical: 10,
    flexGrow: 1,
  },
  header: {
    marginHorizontal: 25,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
});
