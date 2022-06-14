import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { elevation } from "../common/styles";
import { withNavigation } from "react-navigation";
import Animated, { Layout, FadeOut } from "react-native-reanimated";

function FavouriteItem({ restaurant, removefavourite, navigation }) {
  const screenWidth = Dimensions.get("screen").width;
  const boxLength = (screenWidth - 40) / 2;

  return (
    <Animated.View exiting={FadeOut} layout={Layout.easing()}>
      <Pressable
        style={({ pressed }) => [
          { width: boxLength, height: boxLength },
          styles.container,
          styles.elevation,
          { backgroundColor: pressed ? "#99CC00" : "white" },
        ]}
        onPress={() => {
          navigation.navigate("Restaurant", { id: restaurant.id });
        }}
      >
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />

        <Text style={styles.header} numberOfLines={1}>
          {restaurant.name}
        </Text>

        <Pressable
          onPress={() => {
            removefavourite(restaurant.id);
          }}
          style={styles.closeIcon}
        >
          <AntDesign name="closecircle" size={24} color="black" />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  elevation,
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "65%",
    height: "65%",
    borderRadius: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default withNavigation(FavouriteItem);
