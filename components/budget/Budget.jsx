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
    // style={{
    //   backgroundColor: theme.colors.primary,
    //   width: 150,
    //   height: 80,
    //   margin: 10,
    // }}
    >
      <Card.Title
        title="Your Budget"
        // titleStyle={{
        //   color: theme.colors.onPrimary,
        //   fontSize: 12,
        // }}
      />
      <Card.Content>
        <Text
          variant="titleLarge"
          // style={{
          //   color: theme.colors.onPrimary,
          //   fontSize: 18,
          //   fontWeight: "bold",
          // }}
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

export default Budget;
