import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../../pages/Home";
import Analysis from "../../pages/Analysis";
import ReceiptScanner from "../receipts/ReceiptScanner";
import ReceiptAdder from "../receipts/ReceiptAdder";

import Map from "../map/Map";
import Profile from "../../pages/Profle";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const ReceiptsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receipt ScannerS" component={ReceiptScanner} />
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
        name="Analytics"
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
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
