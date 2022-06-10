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
  Linking,
} from "react-native";

import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useRestaurant from "../hooks/useRestaurant";
import Map from "../components/Map";
import ImageCarousel from "../components/ImageCarousel";
import { convertTime, formatTime } from "../common/helper";
import Schedule from "../components/Schedule";
import { elevation } from "../common/styles";
import { theme } from "../common/theme";

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
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${phone}`);
              }}
            >
              <View style={styles.callBtn}>
                <MaterialIcons name="phone" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Schedule openHours={openHours} />

        <TouchableOpacity
          onPress={async () => {
            let favourites = await AsyncStorage.getItem("favourites");
            if (favourites == null) {
              favourites = [];
            } else {
              favourites = JSON.parse(favourites);
            }

            // console.log(favourites);

            if (!favourites.some((item) => item.id == data.id)) {
              favourites.push({
                id: data.id,
                name: data.name,
                image_url: data.image_url,
              });
            }

            await AsyncStorage.setItem(
              "favourites",
              JSON.stringify(favourites)
            );

            Toast.show({
              type: "success",
              text1: "Added to Favourites",
              position: "top",
              topOffset: 20,
            });
          }}
        >
          <View style={[styles.btn, styles.elevation]}>
            <Text style={styles.btnTxt}>Add to Favourites</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
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
    width: "100%",
    marginBottom: 1,
  },
  sectionText: {
    marginLeft: 20,
  },
  callBtn: {
    borderRadius: 50,
    backgroundColor: "green",
    padding: 8,
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
