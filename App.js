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
import ExpenseAdder from "./components/expenses/ExpenseAdder";
import NavMenu from "./components/navigation/NavMenu";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
        <Drawer.Screen
          name="ExpenseAdder"
          component={ExpenseAdder}
          options={{
            title: "Add a new Expense",
            // headerShown: false,
            // headerLeft: () => (
            //   <Image
            //     style={{ width: 50, height: 50 }}
            //     source={require("./assets/android-chrome-192x192.png")}
            //   />
            // ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
