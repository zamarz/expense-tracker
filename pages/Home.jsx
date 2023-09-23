import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import { Loading } from "../components/loading/Loading";
import Logout from "../components/buttons/Logout";
import ExpenseList from "../components/expenses/ExpenseList";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { UserContext } from "../context/UserContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Divider, Text } from "react-native-paper";

import { useTheme } from "react-native-paper";

// const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState(0);
  const user = useContext(UserContext);

  const theme = useTheme();

  {
    /* Handle onPress App Demo */
  }
  // const handleAppDemo = () => {}

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          {/* Viewing current accounts balance */}
          <Text variant="headlineLarge" style={styles.title}>
            Balance: {balance}
          </Text>
          <Divider />
        </View>
        <View>
          {/* Viewing current budget, remaning budget and total spent */}
          <BudgetPlanner />
          <Divider />
        </View>
        <View>
          <ExpenseList />
          <Divider />
        </View>
        <View>
          <Button
            style={styles.appButtonContainer}
            mode="contained"
            onPress={() =>
              navigation.navigate("Expense List", { screen: "Expense Adder" })
            }
            title="Add expense"
            accessibilityLabel="Add a new expense to an account manually"
            icon="cash"
          >
            Add expense
          </Button>
          <Divider />
          <Button
            style={styles.appButtonContainer}
            mode="contained"
            onPress={() => {}}
            title="Scan expense"
            accessibilityLabel="Add a new expense to an account by scanning a receipt"
          >
            Scan expense
          </Button>
          <Divider />
        </View>
        {/* Button to navigate to the app demo */}
        {/* <View>
          <Button onPress={handleAppDemo} title="App Demo" accessibilityLabel="Learn more about how to use the expense tracker app, through our app demo"></Button>

        </View> */}
        <View>
          {/* Button to navigate to viewing/adding account(s) */}
          <Button
            style={styles.appButtonContainer}
            mode="contained"
            onPress={() => navigation.navigate("Accounts List")}
            title="View / Add Account"
            accessibilityLabel="View a list of accounts or add a new account"
          >
            View / Add Account
          </Button>
          <Divider />
          <Logout />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
