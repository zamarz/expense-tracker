import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { UserContext } from "../context/UserContext";
import { AppTracker } from "../context/AppTracker";
import { Button, Divider, useTheme, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const user = useContext(UserContext);
  const { balance, expenses } = useContext(AppTracker);

  const theme = useTheme();

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View>
              <Text variant="headlineLarge" style={styles.title}>
                Balance: {balance}
              </Text>
              <Divider />
            </View>
            <View>
              <BudgetPlanner expenses={expenses} />
              <Divider />
            </View>
            <View>
              <ExpenseListHome expenses={expenses} />
              {/* <Divider /> */}
            </View>
            <View>
              <Button
                style={styles.appButtonContainer}
                mode="contained"
                onPress={() =>
                  navigation.navigate("Expense List", { screen: "ExpenseList" })
                }
                title="Expenses List"
                accessibilityLabel="Goes to the expenses page"
                icon="cash"
              >
                Expenses List{" "}
              </Button>
              {/* <Divider /> */}
              <Button
                style={styles.appButtonContainer}
                mode="contained"
                onPress={() => {}}
                title="Scan expense"
                accessibilityLabel="Add a new expense to an account by scanning a receipt"
              >
                Scan expense
              </Button>
              {/* <Divider /> */}

              {/* <Button
              onPress={handleAppDemo}
              title="App Demo"
              accessibilityLabel="Learn more about how to use the expense tracker app, through our app demo"
            /> */}
              <Button
                style={styles.appButtonContainer}
                mode="contained"
                onPress={() => navigation.navigate("Accounts List")}
                title="View / Add Account"
                accessibilityLabel="View a list of accounts or add a new account"
              >
                Add Account
              </Button>
              <Logout />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    padding: 5,
    margin: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
});
