import "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { authFire } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./pages/Profle";
import Settings from "./pages/Profle";
import ExpenseList from "./components/expenses/ExpenseList";
import Analysis from "./pages/Analysis";
import Receipts from "./pages/Receipts";
import Map from "./components/map/Map";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const login = true; //change this later to context

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authFire, (user) => {
      setUser(user);
    });
  });

  return (
    <NavigationContainer>
      {/* if user is not logged in, show login screeen */}
      <Drawer.Navigator initialRouteName="Home">
        {/* {!user ? (
          <LoginStack.Group>
            <LoginStack.Screen
              name="Login"
              component={Login}
              // options={{ headerShown: false }}
            />
            <LoginStack.Screen
              name="Register"
              component={Register}
              // options={{ headerShown: false }}
            />
          </LoginStack.Group>
        ) : ( */}
        {/* if user is logged in, show home screeen */}
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "My Home",
            //headerShown: false,
            // headerLeft: () => (
            //   <Image
            //     style={{ width: 50, height: 50 }}
            //     source={require("./assets/android-chrome-192x192.png")}
            //   />
            // ),
          }}
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
