import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, useTheme } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const Remaining = () => {
  const { state } = useContext(AppTracker);
  const { expenses, budget } = state;
  const theme = useTheme();
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + +item.amount);
  }, 0);

  const remainingBalance = (+budget - +totalExpenses).toFixed(2);

  const textStyle = {
    color: remainingBalance > 0 ? "green" : "red",
  };

  return (
    <View style={styles.container}>
      <Card
        style={{
          backgroundColor: theme.colors.primaryContainer,
          width: 150,
          height: 80,
          margin: 10,
        }}
      >
        <Card.Title
          title="Remaining Budget"
          titleStyle={{
            color: theme.colors.onPrimaryContainer,
            fontSize: 12,
          }}
        />
        <Card.Content>
          <Text
            variant="titleLarge"
            style={{ textStyle, fontSize: 18, fontWeight: "bold" }}
          >
            <Text style={textStyle}>£{remainingBalance}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  card: {
    width: '80%',
    marginBottom: 20,
  },

});

export default Remaining;
