import { FIREBASE_API } from "@env";

import Geocoder from "react-native-geocoding";

export const calculateTotalBalance = (accountsData) => {
  let totalBalance = 0;
  for (const account of accountsData) {
    const amount = parseFloat(account.balance);
    totalBalance += amount;
  }
  return totalBalance;
};

export const calculateTotalBudget = (accountsData) => {
  let totalBudget = 0;
  for (const account of accountsData) {
    if (
      account.budget !== null &&
      account.budget !== undefined &&
      account.budget !== ""
    ) {
      const amount = parseFloat(account.budget);
      totalBudget += amount;
    }
  }
  return totalBudget;
};

export const fetchGeoLocation = async (location) => {
  Geocoder.init(FIREBASE_API, { language: "en" });

  if (location) {
    return Geocoder.from(location)
      .then((res) => {
        const result = {};
        res.results.forEach((res) => {
          result.geoLocation = res.geometry.location;
          result.viewBox = res.geometry.bounds;
        });
        if (result.geoLocation && result.viewBox) {
          return result;
        }
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
  } else {
    return { message: "Location not coded correctly" };
  }
};

// Object { lat: 51.5072178, lng: -0.1275862 }
// ​
// lat: 51.5072178
// ​
// lng: -0.1275862

// .then(({ results }) => {

//   const result = results[0];
//   const { geometry } = result;
//   const { location, bounds } = geometry;

//   const geolocation = location;

//   const geoboundingBox = bounds;
//   console.log(geoboundingBox, geolocation);
//   if (
//     geolocation &&
//     geoboundingBox.contains("northwest") &&
//     geoboundingBox.contains("southeast")
//   ) {
//     return { coordinates: { location: geolocation, box: geoboundingBox } };
