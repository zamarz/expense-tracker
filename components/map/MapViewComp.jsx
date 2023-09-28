import { StyleSheet, View } from "react-native";
import { AppTracker } from "../../context/AppTracker";
import MapView, { Marker } from "react-native-maps";
import React, { useContext } from "react";

const MapViewComp = () => {
  const { state, dispatch } = useContext(AppTracker);
  const { expenses } = state;

  let markerData = [];
  expenses.forEach((exp) => {
    if (exp.geolocation.geoLocation) {
      markerData.push({ lat: exp.geolocation.geoLocation.lat });
      markerData.push({ lng: exp.geolocation.geoLocation.lng });
    }
  });

  const geoViewBox = expenses[1].geolocation.viewBox;

  return (
    <View>
      {expenses && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: geoViewBox.northeast.lat
              ? geoViewBox.northeast.lat
              : 51.5072,
            longitude: geoViewBox.northeast.lng
              ? geoViewBox.northeast.lng
              : 0.1276,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {markerData.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: data.lat ? data.lat : 0,
                longitude: data.lng ? data.lng : 0,
              }}
              title={`Marker ${index + 1}`}
              description={`Weight: ${data.weight}`}
            />
          ))}
        </MapView>
      )}
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
