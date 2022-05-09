import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useEffect } from "react";
import useRestaurant from "../hooks/useRestaurant";
import Map from "../components/Map";
import ImageCarousel from "../components/ImageCarousel";
import { convertTime, formatTime } from "../common/helper";
import Schedule from "../components/Schedule";
import { elevation } from "../common/styles";

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

  let openHours = data.hours[0].open;
  openHours = openHours.map((time) => formatTime(time));
  // console.log(openHours);
  return (
    <View style={styles.container}>
      <Text style={styles.header} numberOfLines={1}>
        {data.name}
      </Text>
      <ScrollView>
        <ImageCarousel images={data.photos} />
        <Map
          coordinates={data.coordinates}
          title={data.name}
          description={data.location.address1}
        />
        <Schedule openHours={openHours} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Restaurant", { id: restaurant.id });
          }}
        >
          <View style={[styles.btn, styles.elevation]}>
            <Text style={styles.btnTxt}>Add To Go</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00f9ff",
    // height: "100%",
  },
  elevation,
  header: {
    fontWeight: "bold",
    fontSize: 22,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "black",
    color: "white",
  },
  btn: {
    backgroundColor: "#99CC00",
    alignSelf: "center",
    padding: 12,
    // borderRadius: ""
  },
  btnTxt: {
    fontSize: 20,
  },
});
