import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";

const Budget = () => {
  const { budget } = useContext(AppTracker);

  return (
    <View>
      <Text>Budget: £{(+budget).toFixed(2)}</Text>
    </View>
  );
};

export default Budget;
