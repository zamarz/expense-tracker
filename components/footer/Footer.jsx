import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../../pages/Home";
import Analysis from "../../pages/Analysis";
import ReceiptScanner from "../receipts/ReceiptScanner";
import Map from "../map/Map";
import Profile from "../../pages/Profle";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

const Tab = createMaterialBottomTabNavigator();

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
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analysis}
        options={{
          tabBarLabel: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Receipt Scanner"
        component={ReceiptScanner}
        options={{
          tabBarLabel: "Receipt Scanning",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses Map"
        component={Map}
        options={{
          tabBarLabel: "Expenses Map",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="google-maps"
              color={color}
              size={size}
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
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
