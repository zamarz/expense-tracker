import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const MapPermission = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [mapLat, setMapLat] = useState();
  const [mapLong, setMapLong] = useState();
  
  Location.setGoogleApiKey("AIzaSyALphYgQ7bQGRoDIfWj73r_K9Ll8jEAJyA");
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapLat(currentLocation.coords.latitude);
      setMapLong(currentLocation.coords.longitude);
      console.log(mapLat);
      console.log(mapLong);
    };
    getPermissions();
  }, []);
  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
  };
  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
      <Button title="Geocode Address" onPress={geocode} />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapPermission;