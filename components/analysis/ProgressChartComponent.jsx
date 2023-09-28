import React from "react";
import { ProgressChart } from "react-native-chart-kit";
import { AppTracker } from "../../context/AppTracker";
import { useContext } from "react";

export default function ProgressCircleComponent() {
    const { state } = useContext(AppTracker);
    const { expenses, budget, balance } = state;

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += +item.amount);
      }, 0);

    const usedPercentage = (totalExpenses / budget) * 100;
    // const remainingPercentage = 100 - usedPercentage;

    const remainingAmount = (budget / balance) * 100;
    // const budgetPercentage = 100 - remainingAmount;

    const data = {
        labels: [`Exp`, `Budget`],
        data: [usedPercentage / 100, remainingAmount / 100],
        colors: ['#297AB1', '#FFA726'],
    };
    return (
        <ProgressChart
            data={data}
            width={340}
            height={200}
            chartConfig={{
                backgroundColor: "#e26a00",
                paddingRight: 0,
                paddingLeft: 0,
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            strokeWidth={16}
            style={{
                borderRadius: 16,
                marginVertical: 8,
                paddingLeft: 10,

            }}
        />
    );
}
