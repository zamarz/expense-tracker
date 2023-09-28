import { View } from "react-native";
import LineChartComponent from "../components/analysis/LineChartComponent";
import PieChartComponent from "../components/analysis/PieChartComponent";

const Analysis = () => {
    return (
        <View>
        <LineChartComponent />
        <PieChartComponent />
        </View>
    )
    
};

export default Analysis;
