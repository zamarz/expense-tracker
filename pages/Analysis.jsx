import { ScrollView, View } from "react-native";
import LineChartComponent from "../components/analysis/LineChartComponent";
import PieChartComponent from "../components/analysis/PieChartComponent";
import ProgressCircleComponent from "../components/analysis/ProgressChartComponent";

const Analysis = () => {
    return (
        <View>
            <ScrollView>
                <LineChartComponent />
                <PieChartComponent />
                <ProgressCircleComponent />
            </ScrollView>
        </View>
    )

};

export default Analysis;
