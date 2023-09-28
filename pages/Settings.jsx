import { View, SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import DeleteAccount from "../components/buttons/Delete";
import Logout from "../components/buttons/Logout";

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View padding="8%">
        <Button
          icon="camera"
          mode="contained"
          title="view expenses"
          style={styles.appButtonContainer}
          onPress={() =>
            navigation.navigate("Expense List", { screen: "ExpenseList" })
          }
        >
          <Text style={styles.buttonText}> See your expenses </Text>
        </Button>

        <Button
          icon="bank-check"
          mode="contained"
          title="view accounts"
          style={styles.appButtonContainer}
          onPress={() =>
            navigation.navigate("Accounts List", { screen: "Accounts List" })
          }
        >
          <Text style={styles.buttonText}> See your accounts </Text>
        </Button>

        <Button
          icon="map-marker-account-outline"
          mode="contained"
          title="View map"
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate("Expenses Map")}
        >
          <Text style={styles.buttonText}>Browse the map</Text>
        </Button>

        <Logout />
        <DeleteAccount />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // marginHorizontal: 16,
  },
  separator: {
    // marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
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

export default Settings;
