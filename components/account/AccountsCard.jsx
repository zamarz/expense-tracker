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
        width: 375,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.item}>
          {item.bank}:{" "}
          <Text style={{ color: "green", fontWeight: "bold" }}>
            £{item.balance}
          </Text>
          {"\n"}Budget:{" "}
          <Text style={{ color: "black", fontWeight: "bold" }}>
            {" "}
            £{item.budget}
          </Text>
          {"\n"}Card type:{" "}
          <Text style={{ color: "rgb(163, 61, 35)", fontWeight: "bold" }}>
            {item.type}
          </Text>
        </Text>
        {/* <View style={styles.buttonContainer}>
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
        </View> */}
        <View style={styles.row}>
          <Button
            title="Add income"
            aria-label="Add an income for the account"
            style={{
              backgroundColor: theme.colors.secondary,
              minWidth: 150,
              elevation: 8,
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 12,
              alignSelf: "center",
              marginTop: 0,
              marginBottom: 10,
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

          <Button
            title="Delete account"
            aria-label="Delete this account from the list"
            style={{
              backgroundColor: theme.colors.onErrorContainer,
              minWidth: 150,
              elevation: 8,
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 12,
              alignSelf: "center",
              marginTop: 0,
              marginBottom: 10,
            }}
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
    textAlign: "center",
  },
  title: {
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
});
