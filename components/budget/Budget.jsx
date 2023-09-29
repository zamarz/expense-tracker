import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, useTheme } from "react-native-paper";

const Budget = () => {
  const { state } = useContext(AppTracker);

  const theme = useTheme();
  const { budget } = state;
  return (
    <View style={styles.container}>
      <Card
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            textAlign: "center",
            paddingTop: 12,
          }}
        >
          Your Budget
        </Text>
        <Card.Content>
          <Text
            style={{
              color: "orange",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            £{(+budget).toFixed(2)}
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

  container: {
    flex: 1,
  },
  card: {
    marginBottom: 0,
  },
});

export default Budget;
