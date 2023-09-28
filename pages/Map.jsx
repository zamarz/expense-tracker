import { View, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import MapViewComp from "../components/map/MapViewComp";
import { DataTable } from "react-native-paper";
import { AppTracker } from "../context/AppTracker";
import { FlatList } from "react-native-gesture-handler";

const Map = () => {
  return (
    <>
      <View style={styles.mapContainer}>
        <MapViewComp />
      </View>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 3,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
});
