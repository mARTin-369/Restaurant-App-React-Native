import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { elevation } from "../common/styles";

const OpenHours = ({ openHours }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="schedule" size={32} color="black" />
        <Text style={styles.title}>Hours</Text>
      </View>

      <View style={[styles.scheduleContainer, elevation]}>
        {openHours.map((item) => (
          <View style={styles.openHours} key={item.day}>
            <Text>{item.day}</Text>
            <View>
              <Text style={styles.time}>{`${item.start} - ${item.end}`}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OpenHours;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
  },
  scheduleContainer: {
    borderWidth: 1,
    borderColor: "#999999",
    marginBottom: 20,
  },
  openHours: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 40,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: "#999999",
  },
  time: {
    color: "black",
  },
});
