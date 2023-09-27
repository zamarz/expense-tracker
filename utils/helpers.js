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

export const geolocation = (location) => {
  Geocoder.init(FIREBASE_API, { language: "en" });

  Geocoder.from(location)
    .then((json) => {
      let geolocation = json.results[0].geometry.location;
      return geolocation;
    })
    .catch((err) => console.log(err));
};

// Object { lat: 51.5072178, lng: -0.1275862 }
// ​
// lat: 51.5072178
// ​
// lng: -0.1275862
