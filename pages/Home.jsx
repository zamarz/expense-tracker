import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { UserContext } from "../context/UserContext";
import { AppTracker } from "../context/AppTracker";
import { Button, Divider, useTheme, Text } from "react-native-paper";
import { Loading } from "../components/loading/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbFire } from "../firebaseConfig";
import ErrorHandler from "../components/error/ErrorHandler";

export default function Home({ navigation }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [loadingAccounts, setALoading] = useState(true);
  const { uid } = useContext(UserContext);
  const { state, dispatch } = useContext(AppTracker);
  const { accounts, balance, budget } = state;
  // const {
  //   balance,
  //   budget,
  //   accounts,
  //   expenses,
  //   setAccounts,
  //   setBalance,
  //   setBudget,
  //   setExpenses,
  // } = useContext(AppTracker);
  // const [expenseList, setExpenses] = useState(expenses);
  // const [accountList, setAccounts] = useState(accounts);
  // const [newBudget, setBudget] = useState(budget);
  // const [newBalance, setBalance] = useState(balance);

  const theme = useTheme();

  useEffect(() => {
    fetchExpensesData(uid).then(({ expenses }) => {
      console.log(expenses);
      if (expenses) {
        dispatch({ type: "UPDATE_EXPENSES", payload: expenses });
      }
    }).then(() => {
      fetchAccountsData(uid).then(({ accounts, balance, budget }) => {
        console.log(accounts, balance, budget);
        if (accounts) {
          dispatch({ type: "UPDATE_ACCOUNTS", payload: accounts });
          setLoading(false);
        }
      })
    })
  }, []);

  console.log(state.expenses);

  // fetchExpensesData(uid);
  // .then(({ message }) => {
  //   if (message === "Success") {
  //     setELoading(false);
  //   }
  // })
  // .catch((err) => {
  //   setError(err);
  //   setELoading(false);
  //   setALoading(false);
  // });
  // fetchAccountsData(uid);
  // .then(({ message }) => {
  //   if (message === "Success") {
  //     setALoading(false);
  //   }
  // })
  // .catch((err) => {
  //   setError(err);
  //   setELoading(false);
  //   setALoading(false);
  // });

  // setALoading(false);

  const fetchExpensesData = async (userId) => {
    if (userId) {
      const expensesQuery = query(
        collection(dbFire, "expenses"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(expensesQuery);
      const expensesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (expensesData) {
        // setExpenses(expensesData);
        return { message: "Success", expenses: expensesData };
      }
    }
  };

  const fetchAccountsData = async (userId) => {
    const accountsQuery = query(
      collection(dbFire, "account"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(accountsQuery);
    const accountsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (accountsData) {
      const totalBalance = calculateTotalBalance();
      const totalBudget = calculateTotalBudget();
      if ((accountsData && totalBalance, totalBudget)) {
        return {
          message: "Success",
          accounts: accountsData,
          budget: totalBudget,
          balance: totalBalance,
        };
      }
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorHandler error={error} />;

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text variant="headlineLarge" style={styles.title}>
            Balance: £{(+state.balance).toFixed(2)}
          </Text>
          <Divider />

          <BudgetPlanner
            expenses={state.expenses}
            budget={state.budget}
            balance={state.balance}
          />
          <Divider />

          <ExpenseListHome expenses={state.expenses} />
          <Divider />
        </View>
        <ScrollView>
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
        </ScrollView>
      </View>
    </View>
  );
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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
