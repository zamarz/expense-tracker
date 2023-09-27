import { View } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";
import { IconButton } from "react-native-paper";

const Logout = () => {
  return (
    <View>
      <IconButton
        color="orange"
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      />
    </View>
  );
};

export default Logout;
