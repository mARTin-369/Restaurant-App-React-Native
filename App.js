import { Pressable } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";

import FavouritesScreen from "./src/screens/FavouritesScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Restaurant: RestaurantScreen,
    Favourite: FavouritesScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      title: "OneBite",
      headerTitleStyle: {
        fontWeight: "bold",
        // marginLeft: 10,
        // alignSelf: "center",
      },
      headerRight: () => (
        <Pressable
          style={{ marginRight: 30 }}
          onPress={() => navigation.navigate("Favourite")}
        >
          <MaterialIcons name="favorite" size={32} color="#99CC00" />
        </Pressable>
      ),
    }),
  }
);

export default createAppContainer(navigator);
