import { View, Button } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";

const Logout = () => {
  return (
    <View>
      <Button
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      />
    </View>
  );
};

export default Logout;
