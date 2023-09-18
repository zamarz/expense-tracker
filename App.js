import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Stack = createNativeStackNavigator();

const login = true; //change this later to context

export default function App() {
  return (
    <NavigationContainer>
      {/* if user is not logged in, show login screeen */}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {!login ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {/* if user is logged in, show home screeen */}

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "My Home",
                headerLeft: () => (
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("./assets/android-chrome-192x192.png")}
                  />
                ),
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
