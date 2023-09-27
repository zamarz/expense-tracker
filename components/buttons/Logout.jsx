import { View, Button, StyleSheet } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";

const Logout = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,

    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
});

export default Logout;
