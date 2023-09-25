import { View, StyleSheet, Text } from "react-native";
import React from "react";
import MapViewComp from "../components/map/MapViewComp";

const Map = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
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
