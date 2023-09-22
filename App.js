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

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name={`Home - Welcome ${user.displayName}`}
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
        <Drawer.Screen
          name="ExpenseList"
          component={ExpenseList}
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
