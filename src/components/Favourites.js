import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FavouriteItem from "./FavouriteItem";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFavourites = async () => {
    try {
      let data = await AsyncStorage.getItem("favourites");
      console.log(data);
      data = JSON.parse(data);
      setFavourites(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const removefavourite = async (id) => {
    let data = [...favourites].filter((item) => id.localeCompare(item.id) != 0);
    setFavourites(data);
    // console.log(data);
    await AsyncStorage.setItem("favourites", JSON.stringify(data));
  };

  useEffect(() => {
    setLoading(true);
    getFavourites();
    setLoading(false);
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#99CC00" />;
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Some thing went wrong</Text>
      </View>
    );
  }

  if (favourites == null || favourites.length < 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No favourites added</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {favourites.map((restaurant) => (
        <FavouriteItem
          restaurant={restaurant}
          removefavourite={removefavourite}
          key={restaurant.id}
        />
      ))} */}
      <FlatList
        data={favourites}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={({ item }) => (
          <FavouriteItem restaurant={item} removefavourite={removefavourite} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    marginLeft: 25,
    fontWeight: "bold",
    fontSize: 22,
  },
});
