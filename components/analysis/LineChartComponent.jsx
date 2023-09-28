import React from "react";
import { useContext } from "react";
import { Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AppTracker } from "../../context/AppTracker";

export default function LineChartComponent() {
  const { state } = useContext(AppTracker);
  const { expenses } = state;

  const data = expenses.map((expense) => +expense.amount);
  const labels = expenses.map((expense) => expense.merchant.title);
  console.log(data);
  console.log(labels);

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [{ data: data }],
      }}
      width={300}
      height={200}
      yAxisSuffix=" £"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        paddingLeft: 25,
      }}
    />
  );
}
