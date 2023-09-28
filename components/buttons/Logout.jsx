import { StyleSheet, View } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";
import { Button, Text, useTheme } from "react-native-paper";

const Logout = () => {
  const theme = useTheme();
  return (
    <View style={styles.button}>
      <Button
        mode="contained"
        style={[
          styles.appButtonContainer,
          { backgroundColor: theme.colors.onSecondaryContainer },
        ]}
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    minWidth: 190,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default Logout;
