import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Loading } from "../loading/Loading";
import { addDoc, collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { dbFire, authFire } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";

export default function IncomeAdder({ navigation, item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [userId, setUserId] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [income, setIncome] = useState("");
  const [incomeDate, setIncomeDate] = useState(new Date());
  const [source, setSource] = useState("");
  // const [formData, setFormData] = useState({});

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong!</p>;

  const auth = authFire;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  const incomeSchema = yup.object().shape({
    income: yup.number().required().typeError("Income should be a number"),
    source: yup.string().required(),
    incomeDate: yup.string().required(),
  });

  const fetchAccounts = async () => {
    try {
      const q = query(collection(dbFire, "account").where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const accountData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccounts(accountData);
      console.log(accountData);
    } catch (error) {
      console.console.log(error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const incomeDocRef = await addDoc(collection(dbFire, "income"), {
        income: values.income,
        source: values.source,
        incomeDate: values.incomeDate,
        userId: userId,
        accountId: selectedAccount,
      })

      const accountRef = doc(dbFire, "account", selectedAccount);
      const accountSnapshot = await getDoc(accountRef);
      if (accountSnapshot.exists()) {
        const currentBalance = accountSnapshot.data().balance || 0;
        const newBalance = currentBalance + parseFloat(values.income);
        await updateDoc(accountRef, { balance: newBalance });
      }

      setIsLoading(false);
      navigation.navigate("Account List");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        income: "",
        source: "",
        incomeDate: incomeDate,
      }}
      validationSchema={incomeSchema}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <TextInput
                aria-label="Income amount"
                style={styles.input}
                placeholder="Income amount"
                value={values.income}
                onChangeText={handleChange("income")}
                inputMode="numeric"
                onBlur={handleBlur("income")}
              />
              {errors.income && <Text>{errors.income}</Text>}
            </View>
            <View style={styles.inputRow}>
              <TextInput
                aria-label="Source of income"
                placeholder="Source of income"
                value={values.source}
                onChangeText={handleChange("source")}
                handleBlur={handleBlur("source")}
                style={styles.input}
              />
              {errors.source && <Text>{errors.source}</Text>}
            </View>

            <Button
              // Add functionality for account adder button
              onPress={handleSubmit}
              title="Add income"
              accessibilityLabel="Add a new income to update your balance"
            ></Button>
            <Button
              onPress={() => navigation.navigate("Account List")}
              title="Go back to your accounts"
              accessibilityLabel="Button to navigate to Accounts page"
            ></Button>
          </View>
        );
      }}
    </Formik>
  )
}

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
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff"
  }
});
