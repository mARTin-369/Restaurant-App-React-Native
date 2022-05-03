import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { elevation } from "../common/styles";
import { withNavigation } from "react-navigation";

function RestaurantItem({ restaurant, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", { id: restaurant.id });
      }}
    >
      <View style={[styles.container, styles.elevation]}>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{restaurant.name}</Text>
          <View style={styles.info}>
            <FontAwesome
              name="star"
              size={14}
              color="black"
              style={styles.star}
            />
            <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
            <Text style={styles.money}>${restaurant.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  elevation,
  container: {
    backgroundColor: "white",
    // alignSelf: "stretch",
    height: 100,
    marginHorizontal: 25,
    borderRadius: 50,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  infoContainer: {
    // marginLeft: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    flexDirection: "row",
  },
  star: {
    marginTop: 3,
  },
  rating: {
    marginRight: 40,
    color: "black",
    marginLeft: 4,
  },
  money: {
    color: "#D1B000",
  },
});

export default withNavigation(RestaurantItem);
