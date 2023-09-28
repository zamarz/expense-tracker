import React from "react";
import { View, StyleSheet } from "react-native";

import { Card, Text, Button, useTheme } from "react-native-paper";

export default function AccountsCard({ item, onDelete, navigation }) {
  const theme = useTheme();
  return (
    <Card
      style={{
        marginBottom: 12,
        backgroundColor: theme.colors.surfaceVariant,
        marginLeft: 40,
        width: 280,
      }}
    >
      <View>
        <Text style={styles.item}>
          {item.bank}:{" "}
          <Text style={{ color: "green", fontWeight: "bold" }}>
            £{item.balance}
          </Text>
          {"\n"}Budget:{" "}
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            £{item.budget}
          </Text>
          {"\n"}Card type:{" "}
          <Text style={{ color: "rgb(163, 61, 35)", fontWeight: "bold" }}>
            {item.type}
          </Text>
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit budget"
            aria-label="Edit budget for the account"
            style={{
              backgroundColor: theme.colors.primary,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                color: theme.colors.onPrimary,
                fontWeight: "bold",
              }}
            >
              Edit Budget
            </Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Add income"
            aria-label="Add an income for the account"
            style={{
              backgroundColor: theme.colors.secondary,
            }}
            onPress={() => navigation.navigate("Income Adder", { item: item })}
          >
            <Text
              style={{
                color: theme.colors.onSecondary,
                fontWeight: "bold",
              }}
            >
              Add Income
            </Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Delete account"
            aria-label="Delete this account from the list"
            style={{ backgroundColor: theme.colors.onErrorContainer }}
            onPress={() => onDelete(item.id)}
          >
            {" "}
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Delete Account
            </Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 10,
  },
  buttonContainer: {
    marginBottom: 15,
    width: "80%",

    marginLeft: 15,
  },
});
