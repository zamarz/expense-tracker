import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DeleteAccount from "../components/buttons/Delete";

const Settings = () => {
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Pound £", value: "pounds" },
  //   { label: "Euro €", value: "euros" },
  //   { label: "Dollar $", value: "dollars" },
  // ]);

  // going to need to change the currency in state or context

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>
            View account list
          </Text>
          <Button
            title="view accounts"
            onPress={() => navigation.navigate("Accounts List")}
          />
        </View>
        <View>
          <Text style={styles.title}>Take a look at your spending map</Text>
          <Button
            title="View map"
            onPress={() => navigation.navigate("Map")}
          />
        </View>
        {/* <View>
          <Text style={styles.title}>Set your currency</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Choose a currency"}
          />
        </View> */}
        <View>
          <DeleteAccount />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Settings;
