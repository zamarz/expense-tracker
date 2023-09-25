import { View, StyleSheet, SafeAreaView } from "react-native";
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
  const [loadingExpenses, setELoading] = useState(true);
  const [loadingAccounts, setALoading] = useState(true);
  const { uid } = useContext(UserContext);
  const { balance, budget, accounts, expenses } = useContext(AppTracker);
  const [expenseList, setExpenses] = useState(expenses);
  const [accontList, setAccounts] = useState(accounts);
  const [newBudget, setBudget] = useState(budget);
  const [newBalance, setBalance] = useState(balance);

  const theme = useTheme();

  useEffect(() => {
    if (uid) {
      fetchExpensesData(uid)
        .then(({ message, expenses }) => {
          if (message === "Success") {
            setExpenses(expenses);
            setELoading(false);
          }
        })
        .catch((err) => {
          setError(err);
          setELoading(false);
          setALoading(false);
        });
      fetchAccountsData(uid)
        .then(({ message, accounts, budget, balance }) => {
          if (message === "Success") {
            setAccounts(accounts);
            setBudget(budget);
            setBalance(balance);
            setALoading(false);
          }
        })
        .catch((err) => {
          setError(err);
          setELoading(false);
          setALoading(false);
        });
    }
  }, [expenses]);

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
      return { message: "Success", expenses: expensesData };
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
      try {
        const calculateBudget = () => {
          const data = accountsData.reduce((total, item) => {
            return (total += +item.budget);
          }, +budget);
          return data.toFixed(2);
        };

        const calculateBalance = () => {
          const data = accountsData.reduce((total, item) => {
            return (total += +item.balance);
          }, +balance);
          return data.toFixed(2);
        };

        const budgetTotal = calculateBudget();
        const balanceTotal = calculateBalance();
        if ((accountsData, budgetTotal, balanceTotal)) {
          return {
            message: "Success",
            accounts: accountsData,
            budget: budgetTotal,
            balance: balanceTotal,
          };
        }
      } catch (err) {
        setError(err);
      }
    }
  };

  console.log(balance);

  if ((loadingAccounts, loadingExpenses)) return <Loading />;

  if (error) return <ErrorHandler error={error} />;

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text variant="headlineLarge" style={styles.title}>
            Balance: {+balance}
          </Text>
          <Divider />
        </View>
        {/* <View>
          <BudgetPlanner expenses={expenseList} />
          <Divider />
        </View> */}
        <View>
          <ExpenseListHome expenses={expenseList} />
          <Divider />
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
        </View>
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
