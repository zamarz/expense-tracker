import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/loading/Loading";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { collection, getDocs, query, doc } from "@firebase/firestore";
import { dbFire } from "../firebaseConfig";
import { ExpensesContext } from "../context/ExpensesContext";
import { BudgetContext } from "../context/BudgetContext";
import { BalanceContext } from "../context/BalanceContext";
import { UserContext } from "../context/UserContext";
import { AppTracker } from "../context/AppTracker";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = useContext(UserContext);
  const { balance, expenses } = useContext(AppTracker);

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong!</p>;

  if (!user || balance === 0 || expenses === 0) {
    return <Loading />;
  } else if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {/* <Layout> */}
          <View>
            {/* Viewing current accounts balance */}
            <Text style={styles.title}>Balance: {balance}</Text>
          </View>
          <View>
            {/* Viewing current budget, remaning budget and total spent */}
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

            {/* Button to navigate to the app demo */}
            {/* 
            <Button onPress={handleAppDemo} title="App Demo" accessibilityLabel="Learn more about how to use the expense tracker app, through our app demo"/>
          */}

            {/* Button to navigate to viewing/adding account(s) */}
            <Button
              onPress={() => navigation.navigate("Accounts List")}
              title="View / Add Account"
              accessibilityLabel="View a list of accounts or add a new account"
            />
            <Logout />
          </View>
          {/* </Layout> */}
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
