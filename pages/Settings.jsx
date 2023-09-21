import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Pounds", value: "pounds" },
    { label: "Euros", value: "euros" },
    { label: "Dollars", value: "dollars" },
  ]);

  // going to need to change the currency in state or context

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>
            Monitor how much you can spend each month
          </Text>
          <Button
            title="Set Budget"
            onPress={() => navigation.navigate("Budget")}
          />
        </View>
        <View>
          <Text style={styles.title}>Stay on top of upcoming bills</Text>
          <Button
            title="Set your reminders"
            onPress={() => navigation.navigate("Reminders")}
          />
        </View>
        <View>
          <Text style={styles.title}>Take a look at your spending map</Text>
          <Button
            title="View here"
            onPress={() => navigation.navigate("Map")}
          />
        </View>
        <View>
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
        </View>
        <View>
          <Text style={styles.title}>Delete your account</Text>
          <Button
            title="Delete account"
            color="red"
            onPress={() => navigation.navigate("Delete Account")}
          />
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
