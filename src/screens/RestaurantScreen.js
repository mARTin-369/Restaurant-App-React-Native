import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
// import MapView from "react-native-maps";
import { useEffect } from "react";
import useRestaurant from "../hooks/useRestaurant";

export default function RestaurantScreen({ navigation }) {
  const id = navigation.getParam("id");
  const [{ data, loading, error }, searchRestaurant] = useRestaurant();

  useEffect(() => {
    searchRestaurant(id);
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#99CC00" />;
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Some thing went wrong</Text>
      </View>
    );
  }

  // console.log(data, loading, error);
  const dimensions = Dimensions.get("window");
  const imgWidth = dimensions.width;

  return (
    <View>
      <FlatList
        data={data.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ height: 200, width: imgWidth }}
          />
        )}
      />
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    // marginVertical: 10,
    // flex: 1,
  },
  header: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
  // image: {
  //   height: 200,
  //   width: imgWidth,
  // },
});
