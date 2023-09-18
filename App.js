import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import react, { useContext } from "react";

const Stack = createNativeStackNavigator();

const login = true; //change this later to context

export default function App() {
  return (
    <NavigationContainer>
      {/* if user is not logged in, show login screeen */}
      <Stack.Navigator initialRouteName="Login">
        {!login ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {/* if user is logged in, show home screeen */}

            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
