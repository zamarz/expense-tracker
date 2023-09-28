import React from "react";
import { useContext } from "react";
import { PieChart } from "react-native-chart-kit";
import { AppTracker } from "../../context/AppTracker";

export default function PieChartComponent() {
  const { state } = useContext(AppTracker);
  const { expenses } = state;

  const data = expenses.map((expense) => ({
    name: expense.category,
    population: +expense.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));

  return (
    <PieChart
      data={data}
      width={400}
      height={250}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      style={{ paddingLeft: 20 }}
    />
  );
}
