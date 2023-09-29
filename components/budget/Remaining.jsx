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
        style={
          {
            // backgroundColor: theme.colors.backdrop,
          }
        }
      >
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            paddingTop: 12,
          }}
        >
          Remainder
        </Text>
        <Card.Content>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 700,
            }}
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
    textAlign: "center",
    backgroundColor: "#F2F2F2",
  },
  card: {
    width: "80%",
    marginBottom: 20,
  },
});

export default Remaining;
