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
      <Card>
        <Card.Title
          title="Total Spent"
          titleStyle={{
            color: theme.colors.onPrimaryContainer,
            fontSize: 12,
            textAlign: "auto",
          }}
        />
        <Card.Content>
          <Text
            style={
              (styles.text,
              {
                color: theme.colors.custom0,
                fontWeight: "bold",
              })
            }
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
