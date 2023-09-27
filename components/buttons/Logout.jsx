import { StyleSheet, View } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";
import { Button, Text, useTheme } from "react-native-paper";

const Logout = () => {
  const theme = useTheme();
  return (
    <View style={styles.appButtonContainer}>
      <Button
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      >
        <Text style={styles.text}>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "orange",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default Logout;