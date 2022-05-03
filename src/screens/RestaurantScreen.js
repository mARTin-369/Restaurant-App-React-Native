import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { useEffect } from "react";
import useRestaurant from "../hooks/useRestaurant";
import Map from "../components/Map";
import ImageCarousel from "../components/ImageCarousel";

export default function RestaurantScreen({ navigation }) {
  const id = navigation.getParam("id");
  const [{ data, loading, error }, searchRestaurant] = useRestaurant();

  useEffect(() => {
    searchRestaurant(id);
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#99CC00"
        style={{ marginTop: 40 }}
      />
    );
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Some thing went wrong</Text>
      </View>
    );
  }

  // console.log(data, loading, error);

  // <FlatList
  //       data={data.photos}
  //       keyExtractor={(item) => item}
  //       renderItem={({ item }) => (
  //         <Image
  //           source={{ uri: item }}
  //           style={{ height: 200, width: imgWidth }}
  //         />
  //       )}
  //     />
  return (
    <View>
      <Text style={styles.header} numberOfLines={1}>
        {data.name}
      </Text>
      <ImageCarousel images={data.photos} />
      <Map
        coordinates={data.coordinates}
        title={data.name}
        description={data.location.address1}
      />
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
    fontWeight: "bold",
    fontSize: 22,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "black",
    color: "white",
  },
});
