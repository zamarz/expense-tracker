import { View } from "react-native-web";

const Receipts = ({ route, navigation }) => {
  const { imageRef } = route.params;

  //this is part of the image id... where file = "...images/imageRef"
  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  );
};

export default Receipts;
