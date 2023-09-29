import { ScrollView, StyleSheet, View } from "react-native";
import LineChartComponent from "../components/analysis/LineChartComponent";
import PieChartComponent from "../components/analysis/PieChartComponent";
import ProgressCircleComponent from "../components/analysis/ProgressChartComponent";
import { Text } from "react-native-paper";

const Analysis = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expenditure Analysis</Text>
      <LineChartComponent />
      <PieChartComponent />
      <ProgressCircleComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default Analysis;
