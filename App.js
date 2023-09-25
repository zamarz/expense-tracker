import { UserContext } from "./context/UserContext";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { useEffect, useMemo, useState } from "react";
import { authFire, dbFire } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./pages/Profle";
import Settings from "./pages/Settings";
import ExpenseList from "./components/expenses/ExpenseList";
import Analysis from "./pages/Analysis";
import Receipts from "./components/receipts/ReceiptAdder";
import Map from "./components/map/Map";
import Footer from "./components/footer/Footer";
import ErrorHandler from "./components/error/ErrorHandler";
import AccountsAdder from "./components/account/AccountsAdder";
import AccountList from "./components/account/AccountsList";
import ExpenseAdder from "./components/expenses/ExpenseAdder";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { AppTracker } from "./context/AppTracker";
import {
  MD3LightTheme as DefaultTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState({ name: "", email: "", uid: "" });
  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [accountList, setAccountList] = useState([]);

  const initialValues = {
    balance: balance,
    budget: budget,
    expenses: expenseList,
    accounts: accountList,
  };

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
      setExpenseList(expensesData);
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
    setAccountList(accountsData);
    if (accountsData) {
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
      setBudget(budgetTotal);
      setBalance(balanceTotal);
    }
  };

  useEffect(() => {
    onAuthStateChanged(authFire, (user) => {
      setUser(user);
      if (user) {
        fetchExpensesData(user.uid);
        fetchAccountsData(user.uid);
      }
    });
  }, [user]);

  const LoginNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Error" component={ErrorHandler} />
      </Stack.Navigator>
    );
  };

  const AccountsNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="AccountList">
        <Stack.Screen name="Account List" component={AccountList} />
        <Stack.Screen name="Accounts Adder" component={AccountsAdder} />
      </Stack.Navigator>
    );
  };

  const ExpensesNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Expense List Page" component={ExpenseList} />
        <Stack.Screen name="Expense Adder" component={ExpenseAdder} />
      </Stack.Navigator>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name={`Home`} component={Footer} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen
          name="Expense List"
          component={ExpensesNavigator}
          options={{
            title: "Expenses List",
          }}
        />
        <Drawer.Screen name="Accounts List" component={AccountsNavigator} />
        <Drawer.Screen name="Analysis" component={Analysis} />
        <Drawer.Screen name="Receipts" component={Receipts} />
        <Drawer.Screen name="Map" component={Map} />
        {/* <Drawer.Screen
          name="Logout"
          component={() => (
            <Button
              onPress={() => {
                authFire.signOut();
              }}
              title="Logout"
            />
          )}
        /> */}
      </Drawer.Navigator>
    );
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      colors: {
        primary: "rgb(104, 71, 192)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(232, 221, 255)",
        onPrimaryContainer: "rgb(33, 0, 93)",
        secondary: "rgb(0, 104, 116)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(151, 240, 255)",
        onSecondaryContainer: "rgb(0, 31, 36)",
        tertiary: "rgb(185, 12, 85)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(255, 217, 223)",
        onTertiaryContainer: "rgb(63, 0, 24)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "rgb(255, 251, 255)",
        onBackground: "rgb(28, 27, 30)",
        surface: "rgb(255, 251, 255)",
        onSurface: "rgb(28, 27, 30)",
        surfaceVariant: "rgb(230, 224, 236)",
        onSurfaceVariant: "rgb(72, 69, 78)",
        outline: "rgb(121, 117, 127)",
        outlineVariant: "rgb(202, 196, 207)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(49, 48, 51)",
        inverseOnSurface: "rgb(244, 239, 244)",
        inversePrimary: "rgb(206, 189, 255)",
        elevation: {
          level0: "transparent",
          level1: "rgb(247, 242, 252)",
          level2: "rgb(243, 237, 250)",
          level3: "rgb(238, 231, 248)",
          level4: "rgb(237, 229, 247)",
          level5: "rgb(234, 226, 246)",
        },
        surfaceDisabled: "rgba(28, 27, 30, 0.12)",
        onSurfaceDisabled: "rgba(28, 27, 30, 0.38)",
        backdrop: "rgba(50, 47, 56, 0.4)",
      },
    }.colors,
  };

  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });

  return (
    <PaperProvider theme={theme}>
      <UserContext.Provider value={user}>
        <NavigationContainer theme={LightTheme}>
          {!user ? (
            <LoginNavigator />
          ) : (
            <AppTracker.Provider value={initialValues}>
              <DrawerNavigator />
            </AppTracker.Provider>
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
