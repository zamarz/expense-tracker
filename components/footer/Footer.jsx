import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../../pages/Home";
import Analysis from "../../pages/Analysis";
import ReceiptScanner from "../receipts/ReceiptScanner";
import ReceiptAdder from "../receipts/ReceiptAdder";

import Map from "../../pages/Map";
import Profile from "../../pages/Profle";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { useTheme } from "react-native-paper";
import Settings from "../../pages/Settings";

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const ReceiptsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Receipt Scanners"
        component={ReceiptScanner}
        options={{ title: "Scan your receipt" }}
      />
      <Stack.Screen name="Receipt Adder" component={ReceiptAdder} />
    </Stack.Navigator>
  );
};

export default function Footer() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#1e63e9",
      }}
    >
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarLabel: "Analysis",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Receipt Navigator"
        component={ReceiptsNavigator}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-maps"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
