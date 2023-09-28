import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text, useTheme } from "react-native-paper";

const ExpenseTotal = () => {
  const { state } = useContext(AppTracker);
  const { expenses } = state;
  const theme = useTheme();

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += +item.amount);
  }, 0);
  return (
    <View style={styles.container}>
      <Card
        style={{
          backgroundColor: theme.colors.onTertiaryContainer,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            paddingTop: 12,
            paddingBottom: 8,
          }}
        >
          Total Spent
        </Text>
        <Card.Content>
          <Text
            style={{
              color: theme.colors.error,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            £{(+totalExpenses).toFixed(2)}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
  },
  amount: {
    color: "red",
  },
  container: {
    flex: 1,
  },
  card: {
    width: "80%",
    marginBottom: 20,
  },
});

export default ExpenseTotal;
