import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { elevation } from "../common/styles";
import { withNavigation } from "react-navigation";
import Animated from "react-native-reanimated";

function FavouriteItem({ restaurant, removefavourite, navigation }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          styles.elevation,
          { backgroundColor: pressed ? "#99CC00" : "white" },
        ]}
        onPress={() => {
          navigation.navigate("Restaurant", { id: restaurant.id });
        }}
      >
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{restaurant.name}</Text>
        </View>
        <Pressable
          onPress={() => {
            removefavourite(restaurant.id);
          }}
        >
          <AntDesign name="closecircle" size={28} color="black" />
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  elevation,
  container: {
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
});

export default withNavigation(FavouriteItem);
