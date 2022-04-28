import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { elevation } from "../common/styles";

export default function CategoryItem({
  name,
  url,
  index,
  active,
  handleClick,
}) {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View
        style={[
          styles.container,
          styles.elevation,
          index === 0 ? { marginLeft: 25 } : { marginLeft: 15 },
          index === 5 ? { marginRight: 25 } : {},
          active
            ? { backgroundColor: "#99CC00" }
            : { backgroundColor: "white" },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={url} style={styles.image} />
        </View>
        <Text style={styles.imageCaption}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 70,
    height: 100,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  elevation,
  image: {
    width: 35,
    height: 35,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCaption: {
    fontWeight: "bold",
  },
});
