import { UserContext } from "./context/UserContext";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
import { authFire } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./pages/Profle";
import Settings from "./pages/Settings";
import ExpenseList from "./components/expenses/ExpenseList";
import Analysis from "./pages/Analysis";
import Receipts from "./components/receipts/Receipts";
import Map from "./components/map/Map";
import Footer from "./components/footer/Footer";
import ErrorHandler from "./components/error/ErrorHandler";
import { BudgetProvider } from "./context/BudgetContext";
import AccountsList from "./components/account/AccountsList";
import AccountsAdder from "./components/account/AccountsAdder";
import AccountList from "./components/account/AccountsList";
import ExpenseAdder from "./components/expenses/ExpenseAdder";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState({ name: "", email: "", uid: "" });

  useEffect(() => {
    onAuthStateChanged(authFire, (user) => {
      setUser(user);
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
      <Stack.Navigator>
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
        <Drawer.Screen
          name={`Home`}
          component={Footer}
          // options={
          //   {
          //     // title: "My Home",
          //     //headerShown: false,
          //     // headerLeft: () => (
          //     //   <Image
          //     //     style={{ width: 50, height: 50 }}
          //     //     source={require("./assets/android-chrome-192x192.png")}
          //     //   />
          //     // ),
          //   }
          // }
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="ExpenseAdder" component={ExpenseAdder} />
        <Drawer.Screen
          name="Expense List"
          component={ExpensesNavigator}
          options={{
            title: "See all expenses",
            // headerShown: false,
            // headerLeft: () => (
            //   <Image
            //     style={{ width: 50, height: 50 }}
            //     source={require("./assets/android-chrome-192x192.png")}
            //   />
            // ),
          }}
        />
        <Drawer.Screen name="Accounts List" component={AccountsNavigator} />
        <Drawer.Screen name="Analysis" component={Analysis} />
        <Drawer.Screen name="Receipts" component={Receipts} />
        <Drawer.Screen name="Map" component={Map} />
        {/* )} */}
      </Drawer.Navigator>
    );
  };

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        {!user ? (
          <LoginNavigator />
        ) : (
          <BudgetProvider>
            <DrawerNavigator />
          </BudgetProvider>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
