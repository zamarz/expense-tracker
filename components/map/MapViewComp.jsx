import { StyleSheet, View } from "react-native";
import { AppTracker } from "../../context/AppTracker";
import MapView, { Marker } from "react-native-maps";
import React, { useContext, useState } from "react";

const MapViewComp = () => {
  const { expenses } = useContext(AppTracker);
  const [mapLat, setMapLat] = useState(6.841776681);
  const [mapLong, setMapLong] = useState(79.869319);
  const locationData = [
    { latitude: 6.841776681, longitude: 79.869319 },
    { latitude: 6.84076664, longitude: 79.871323 },
  ];

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locationData.map((data, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={`Marker ${index + 1}`}
            description={`Weight: ${data.weight}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
