import { View } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { Divider, Text } from "react-native-paper";

const BudgetPlanner = () => {
  const spacingStyle = { marginBottom: 8 };
  return (
    <View>
      {/* <Text variant="titleLarge">BudgetPlanner</Text> */}
      <View style={{ ...spacingStyle, marginTop: 5 }}>
        <Budget />
      </View>
      <View style={spacingStyle}>
        <ExpenseTotal />
      </View>
      <View style={spacingStyle}>
        <Remaining />
      </View>
    </View>
  );
};

export default BudgetPlanner;
