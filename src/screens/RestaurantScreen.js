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
import { theme } from "../common/theme";
import { MaterialIcons } from "@expo/vector-icons";

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

  const address = data.location.display_address;
  const phone = data.phone;

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
        <View style={styles.sectionContainer}>
          <MaterialIcons name="location-pin" size={32} color="black" />
          <View style={styles.sectionText}>
            {address.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <MaterialIcons name="phone" size={32} color="black" />
          <View style={styles.sectionText}>
            <Text>{phone}</Text>
          </View>
        </View>
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
    backgroundColor: "#000",
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
  sectionContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 25,
    // borderWidth: 1,
    // borderColor: "black",
    marginBottom: 1,
  },
  sectionText: {
    marginLeft: 20,
  },
  btn: {
    backgroundColor: theme.primaryColor,
    alignSelf: "center",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginVertical: 25,
  },
  btnTxt: {
    fontSize: 18,
  },
});
