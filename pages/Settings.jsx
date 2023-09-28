import { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import DeleteAccount from "../components/buttons/Delete";

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View padding="8%">
          <Button
            icon="bank-check"
            mode="contained"
            title="view accounts"
            onPress={() => navigation.navigate("Accounts List")}
          >
            See all of your accounts
          </Button>
        </View>
        <View padding="8%">
          <Divider />
          <Button
            icon="map-marker-account-outline"
            mode="contained"
            title="View map"
            onPress={() => navigation.navigate("Map")}
          >
            Take a look at your spending map{" "}
          </Button>
        </View>

        <View>
          <DeleteAccount />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Settings;
