import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { authFire, dbFire } from "../../firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import ErrorHandler from "../error/ErrorHandler";
import { Loading } from "../loading/Loading";
import { Formik } from "formik";

export default function ExpenseAdder({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [account, setAccount] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const regAmount = /^[0-9]*\.[0-9]{2}$/;

  const auth = authFire;

  const expenses = {
    amount,
    category,
    merchant,
    date,
    receipt,
    account,
    location,
    userId,
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     setDate("Today");
  //     setLocation("Here");
  //     const res = await addDoc(collection(dbFire, "expenses"), expenses);
  //     console.log(res, "#####response#####");
  //     setLoading(false);
  //     console.log("here!!");
  //   } catch {
  //     setError(error);
  //     setLoading(false);
  //   }
  // };

  if (error) return <ErrorHandler error={error} />;

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <Text>Add a new Expense</Text>
              <TextInput
                aria-label="Amount"
                style={styles.input}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={values.amount}
                placeholder="Amount"
              />
            </View>
            <TextInput
              aria-label="Merchant"
              style={styles.input}
              onChangeText={handleChange("merchant")}
              onBlur={handleBlur("merchant")}
              value={values.merchant}
              placeholder="Merchant"
            />
            <TextInput
              aria-label="Category"
              placeholder="Category"
              style={styles.input}
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
            />
            <TextInput
              aria-label="Account"
              placeholder="Account"
              style={styles.input}
              onChangeText={handleChange("account")}
              onBlur={handleBlur("account")}
              value={values.account}
            />
            <TextInput
              aria-label="Date"
              placeholder="Date"
              style={styles.input}
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              value={values.date}
            />
            <TextInput
              aria-label="Location"
              placeholder="Location"
              style={styles.input}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "20px",
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
