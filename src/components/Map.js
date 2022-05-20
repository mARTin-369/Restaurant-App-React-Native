import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function Map({ coordinates, title, description }) {
  return (
    // <MapView style={styles.map} />
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        // key={index}
        coordinate={coordinates}
        title={title}
        description={description}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  lightHeader: {
    fontSize: 28,
    marginTop: 20,
  },
  LargeHeader: {
    fontSize: 36,
    fontWeight: "bold",
  },
  headerWrapper: {
    marginHorizontal: 25,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    marginVertical: 1,
  },
});
