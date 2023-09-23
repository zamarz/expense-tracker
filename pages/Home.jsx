import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components/loading/Loading";
import Logout from "../components/buttons/Logout";
import ExpenseListHome from "../components/expenses/ExpenseListHome";
import BudgetPlanner from "../components/budget/BudgetPlanner";
import { collection, getDocs, query, doc } from "@firebase/firestore";
import { authFire, dbFire } from "../firebaseConfig";
import { ExpensesContext } from "../context/ExpensesContext";
import { BudgetContext } from "../context/BudgetContext";
import { BalanceContext } from "../context/BalanceContext";
import { UserContext } from "../context/UserContext";
import ErrorHandler from "../components/error/ErrorHandler";
import { Tracker } from "../utils/Tracker";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState("");
  const { state, dispatch } = useContext(Tracker);
  const { balance } = state;
  const auth = authFire;
  // console.log(state);
  // const [expenseList, setExpenseList] = useContext(ExpensesContext);
  // const [budget, setBudget] = useContext(BudgetContext);
  // const [balance, setBalance] = useState(0);

  function clickAddBalance() {
    dispatch({ type: "ADD_BALANCE", payload: { ...balance, increase: 100 } });
    // setBalance(balance + 100);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (uid) {
        setUserId(uid);
      }
    }
  });

  dispatch({ type: "FETCH_EXPENSES", payload: userId });

  console.log(state.expenses);

  // useEffect(() => {
  //   if (!isLoading) {
  //     setIsLoading(true);
  //     fetchExpensesData().then((data) => {
  //       if (data) {
  //         console.log(data);
  //         setExpenseList(data);
  //         setIsLoading(false);
  //       }
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await fetchExpensesData();
  //       if (data) {
  //         console.log(data);
  //         setExpenseList(data);
  //         setIsLoading(false); // Set isLoading to false when data is fetched
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setIsError(true); // Set isError to true in case of an error
  //       setIsLoading(false); // Ensure isLoading is set to false in case of an error
  //     }
  //   }

  //   fetchData();
  // }, []);

  // console.log(expenseList);

  // async function fetchExpensesData() {
  //   const expensesQuery = query(collection(dbFire, "expenses"));
  //   const querySnapshot = await getDocs(expensesQuery);
  //   const expensesData = querySnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   return expensesData;
  // }

  if (isLoading) return <Loading />;
  if (isError) () => navigation.navigate("Error", { error: isError });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Balance: {balance.toFixed(2)}</Text>
        <Button title="Add Balance" onPress={clickAddBalance} />

        {/* <BudgetPlanner expenses={expenseList} /> */}
        {/* <ExpenseListHome expenses={expenseList} /> */}
        <Button
          onPress={() =>
            navigation.navigate("Expense List", { screen: "Expense List" })
          }
          title="Expenses List"
          accessibilityLabel="Add a new expense to an account manually"
        />
        <Button
          onPress={() => {}}
          title="Scan expense"
          accessibilityLabel="Add a new expense to an account by scanning a receipt"
        />

        <Button
          onPress={() => navigation.navigate("Accounts List")}
          title="View / Add Account"
          accessibilityLabel="View a list of accounts or add a new account"
        />
        <Logout />
      </View>
    </SafeAreaView>
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
});
