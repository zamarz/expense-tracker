import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import React, { useState } from "react";

export default function ExpenseAdder() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [account, setAccount] = useState(null);
  const [location, setLocation] = useState(null);

  return (
    <View style={styles.container}>
      <Text>Add a new expense by filling in the fields below</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={(text) => setCategory(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Merchant"
          value={merchant}
          onChangeText={(text) => setMerchant(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Date"
          value={date}
          onChangeText={(text) => setDate(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Account"
          value={account}
          onChangeText={(text) => setAccount(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />
        <Button
          title="Add Receipt"
          onPress={() => {
            alert("Need to add navigation to ExpenseAdder");
            setReceipt(receipt); //make this do something
          }}
        />
        <Button
          title="Add New Expense"
          onPress={() => {
            alert("Link to Receipt Scanner");
            setReceipt(true);
            setDate(Date());
            navigator.geolocation.getCurrentPosition((position) => {
              setLocation(
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
              );
            });
          }}
        />
      </View>
      <Button
        onPress={() => navigation.navigate("Home")}
        title="Go back"
        accessibilityLabel="Go back to Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "20px",
    borderWidth: "2px",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
