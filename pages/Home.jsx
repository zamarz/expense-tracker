import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { UserContext } from "../context/UserContext";
import { AppTracker } from "../context/AppTracker";

export default function Home({ navigation }) {
  const user = useContext(UserContext);
  const { balance, expenses } = useContext(AppTracker);

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>Balance: {balance}</Text>
          </View>
          <View>
            <BudgetPlanner expenses={expenses} />
          </View>
          <View>
            <ExpenseListHome expenses={expenses} />
          </View>
          <View>
            <Button
              onPress={() =>
                navigation.navigate("Expense List", { screen: "ExpenseList" })
              }
              title="Expenses List"
              accessibilityLabel="Goes to the expenses page"
            />
            <Button
              onPress={() => {}}
              title="Scan expense"
              accessibilityLabel="Add a new expense to an account by scanning a receipt"
            />
            {/* <Button
              onPress={handleAppDemo}
              title="App Demo"
              accessibilityLabel="Learn more about how to use the expense tracker app, through our app demo"
            /> */}
            <Button
              onPress={() => navigation.navigate("Accounts List")}
              title="View / Add Account"
              accessibilityLabel="View a list of accounts or add a new account"
            />
            <Logout />
          </View>
        </View>
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
});
