import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { UserContext } from "../context/UserContext";
import { AppTracker } from "../context/AppTracker";
import { Button, Divider, useTheme, Text } from "react-native-paper";
import { Loading } from "../components/loading/Loading";
import ErrorHandler from "../components/error/ErrorHandler";
import { fetchAccountsData, fetchExpensesData } from "../firebase/firestore";

export default function Home({ navigation }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { uid } = useContext(UserContext);
  const { state, dispatch } = useContext(AppTracker);
  const { balance } = state;

  const theme = useTheme();

  useEffect(() => {
    fetchExpensesData(uid)
      .then(({ message, expenses }) => {
        if ((message = "Success")) {
          dispatch({ type: "UPDATE_EXPENSES", payload: expenses });
        }
        return { message };
      })
      .then(({ message }) => {
        if ((message = "Success")) {
          fetchAccountsData(uid).then(({ message, accounts }) => {
            if (message === "Success") {
              if (accounts) {
                dispatch({ type: "UPDATE_ACCOUNTS", payload: accounts });
                setLoading(false);
              }
            }
          });
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorHandler error={error} />;

  const remainingBalance = (+balance).toFixed(2);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Balance: <Text>£{remainingBalance}</Text>
      </Text>
      <BudgetPlanner />
      <ExpenseListHome />
      <Divider />
      <ScrollView style={styles.wrapper}>
        <Button
          style={[
            styles.appButtonContainer,
            { marginBottom: 2, marginTop: 5, width: 300, alignSelf: "center" },
          ]}
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
        <Button
          style={[
            styles.appButtonContainer,
            { marginBottom: 2, marginTop: 5, width: 300, alignSelf: "center" },
          ]}
          mode="contained"
          onPress={() =>
            navigation.navigate("Expense List", { screen: "Expense Adder" })
          }
          title="Add new expense"
          accessibilityLabel="Add a new expense by filling in a form"
        >
          Add new expense
        </Button>
        <Button
          style={[
            styles.appButtonContainer,
            { marginBottom: 2, marginTop: 5, width: 300, alignSelf: "center" },
          ]}
          mode="contained"
          onPress={() => navigation.navigate("Accounts List")}
          title="View Accounts"
          accessibilityLabel="View a list of accounts or add a new account"
        >
          View Accounts
        </Button>
        <Button
          style={[
            styles.appButtonContainer,
            { marginBottom: 10, marginTop: 5, width: 300, alignSelf: "center" },
          ]}
          mode="contained"
          onPress={() =>
            navigation.navigate("Accounts List", { screen: "Accounts Adder" })
          }
          title="Add Account"
          accessibilityLabel="Navigate here to add a new account"
        >
          Add an Account
        </Button>
        <Logout />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    maxWidth: "100%",
    paddingHorizontal: 30,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 6,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 30,
    padding: 5,
    margin: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
});
