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
import IncomeAdder from "./components/account/IncomeAdder";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { AppTracker } from "./context/AppTracker";
import {
  MD3LightTheme as DefaultTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { enGB, registerTranslation } from "react-native-paper-dates";

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

registerTranslation("en-GB", enGB);

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
        <Stack.Screen name="Income Adder" component={IncomeAdder} />
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
        primary: "rgb(0, 103, 130)",
        onPrimary: "rgb(255, 255, 255)",
        primaryContainer: "rgb(187, 233, 255)",
        onPrimaryContainer: "rgb(0, 31, 41)",
        secondary: "rgb(0, 106, 96)",
        onSecondary: "rgb(255, 255, 255)",
        secondaryContainer: "rgb(116, 248, 229)",
        onSecondaryContainer: "rgb(0, 32, 28)",
        tertiary: "rgb(118, 90, 0)",
        onTertiary: "rgb(255, 255, 255)",
        tertiaryContainer: "rgb(255, 223, 150)",
        onTertiaryContainer: "rgb(37, 26, 0)",
        error: "rgb(186, 26, 26)",
        onError: "rgb(255, 255, 255)",
        errorContainer: "rgb(255, 218, 214)",
        onErrorContainer: "rgb(65, 0, 2)",
        background: "rgb(251, 252, 254)",
        onBackground: "rgb(25, 28, 30)",
        surface: "rgb(251, 252, 254)",
        onSurface: "rgb(25, 28, 30)",
        surfaceVariant: "rgb(220, 228, 233)",
        onSurfaceVariant: "rgb(64, 72, 76)",
        outline: "rgb(112, 120, 125)",
        outlineVariant: "rgb(192, 200, 204)",
        shadow: "rgb(0, 0, 0)",
        scrim: "rgb(0, 0, 0)",
        inverseSurface: "rgb(46, 49, 50)",
        inverseOnSurface: "rgb(239, 241, 243)",
        inversePrimary: "rgb(97, 212, 255)",
        elevation: {
          level0: "transparent",
          level1: "rgb(238, 245, 248)",
          level2: "rgb(231, 240, 244)",
          level3: "rgb(223, 236, 240)",
          level4: "rgb(221, 234, 239)",
          level5: "rgb(216, 231, 237)",
        },
        surfaceDisabled: "rgba(25, 28, 30, 0.12)",
        onSurfaceDisabled: "rgba(25, 28, 30, 0.38)",
        backdrop: "rgba(42, 50, 53, 0.4)",
        custom0: "rgb(146, 76, 0)",
        onCustom0: "rgb(255, 255, 255)",
        custom0Container: "rgb(255, 220, 196)",
        onCustom0Container: "rgb(47, 20, 0)",
        custom1: "rgb(163, 61, 35)",
        onCustom1: "rgb(255, 255, 255)",
        custom1Container: "rgb(255, 218, 210)",
        onCustom1Container: "rgb(60, 7, 0)",
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
              <AutocompleteDropdownContextProvider>
              <DrawerNavigator />
              </AutocompleteDropdownContextProvider>
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
