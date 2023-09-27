import { StyleSheet, View } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";
import { Button, Text, useTheme } from "react-native-paper";
import { deleteUser } from "firebase/auth";

const DeleteAccount = () => {
  const user = authFire.currentUser;
  const theme = useTheme();

  const handleDeleteUser = (user) => {
    if (user) {
      if (confirm("Are you sure you want to delete your account?")) {
        deleteUser(user).then(() => {
          alert(
            "Your account has been successfully deleted. We are sorry to see you go!"
          );

          navigation.navigate("Login");
        });
      } else {
        return;
      }
    }
  };

  return (
    <View style={styles.appButtonContainer}>
      <Button
        title="Delete account"
        onPress={() => {
          console.log("Run delete function");
          handleDeleteUser(user);
        }}
      >
        <Text style={styles.text}>Delete your account</Text>
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
    backgroundColor: "red",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default DeleteAccount;
