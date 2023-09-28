import { UserContext } from "./context/UserContext";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import { useState } from "react";
import { authFire } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "./pages/Settings";
import ExpenseList from "./components/expenses/ExpenseList";
import Analysis from "./pages/Analysis";
import Map from "./pages/Map";
import Footer from "./components/footer/Footer";
import ErrorHandler from "./components/error/ErrorHandler";
import AccountsAdder from "./components/account/AccountsAdder";
import AccountList from "./components/account/AccountsList";
import ExpenseAdder from "./components/expenses/ExpenseAdder";
import IncomeAdder from "./components/account/IncomeAdder";
import { AppTrackerProvider } from "./context/AppTracker";
import {
  MD3LightTheme as DefaultTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { enGB, registerTranslation } from "react-native-paper-dates";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
registerTranslation("en-GB", enGB);

export default function App() {
  const [user, setUser] = useState({ name: "", email: "", uid: "" });

  onAuthStateChanged(authFire, (user) => {
    setUser(user);
  });

  const LoginNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Error"
          component={ErrorHandler}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const AccountsNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="AccountList">
        <Stack.Screen
          name="Account List"
          component={AccountList}
          options={{ title: "Your accounts", headerShown: false }}
        />
        <Stack.Screen
          name="Accounts Adder"
          component={AccountsAdder}
          options={{ title: "Add a new account", headerShown: false }}
        />
        <Stack.Screen
          name="Income Adder"
          component={IncomeAdder}
          options={{ title: "Add a new income", headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const ExpensesNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Expenses List"
          component={ExpenseList}
          options={{ title: "Your expenses", headerShown: false }}
        />
        <Stack.Screen
          name="Expense Adder"
          component={ExpenseAdder}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "black",
          itemStyle: { marginVertical: 5 },
          labelStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen
          name={`Home`}
          component={Footer}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Expense List"
          component={ExpensesNavigator}
          options={{
            title: "Expenses",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Accounts List"
          component={AccountsNavigator}
          options={{
            title: "Accounts",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list-circle" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Analysis"
          component={Analysis}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="analytics" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Map"
          component={Map}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={() => (
            <Button
              onPress={() => {
                authFire.signOut();
              }}
              title="Logout"
            />
          )}
        />
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
    <UserContext.Provider value={user}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={LightTheme}>
          {!user ? (
            <LoginNavigator />
          ) : (
            <AppTrackerProvider>
              <AutocompleteDropdownContextProvider>
                <DrawerNavigator />
              </AutocompleteDropdownContextProvider>
            </AppTrackerProvider>
          )}
        </NavigationContainer>
      </PaperProvider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
