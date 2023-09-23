import { View, Text } from "react-native";

const ReceiptAdder = ({ route, navigation }) => {
  const { imageRef } = route.params;
  console.log(imageRef, "in adder");

  //this is part of the image id... where file = "...images/imageRef"
  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  );
};

export default ReceiptAdder;
