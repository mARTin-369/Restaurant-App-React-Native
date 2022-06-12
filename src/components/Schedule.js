import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { elevation } from "../common/styles";

const OpenHours = ({ openHours }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="schedule" size={32} color="black" />
        <View style={[styles.scheduleContainer, elevation]}>
          {openHours.map((item, index) => (
            <View style={styles.openHours} key={index}>
              <Text>{item.day}</Text>
              <View>
                <Text style={styles.time}>{`${item.start} - ${item.end}`}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default OpenHours;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 25,
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
    // borderWidth: 1,
    // borderColor: "#999999",
    // width: "100%",
    marginLeft: 10,
    marginRight: 0,
  },
  openHours: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#e8eaed",
  },
  time: {
    marginLeft: 20,
    color: "black",
  },
});
