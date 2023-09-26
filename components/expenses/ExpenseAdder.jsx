import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authFire, dbFire } from "../../firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import ErrorHandler from "../error/ErrorHandler";
import { Loading } from "../loading/Loading";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import { stringifyValueWithProperty } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";
import { object, string, number } from "yup";
import * as yup from "yup";
import {
  getCategories,
  getAccounts,
  getMerchants,
  addCategory,
  addMerchant,
  addExpense,
  addAccount
} from "../../firebase/firestore";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import CategoryList from "../categories/CategoryList";
import AccountAdderModal from "../account/AccountAdderModal";
import AccountListDropDown from "../account/AccountListDropDown";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import { DatePickerModal } from 'react-native-paper-dates';

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
  const [formData, setFormData] = useState({}); //change const initialC
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [toggleAccountModal, setToggleAccountModal] = useState(false);
  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const auth = authFire;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    getAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, []);

  useEffect(() => {
    getMerchants().then((merchants) => {
      setMerchants(merchants);
      console.log(merchants)
    });
  }, []);
  
  
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

  const expenseSchema = yup.object().shape({
    amount: yup
      .number("")
      .typeError("Amount should be a number")
      .required("Amount is required!")
      .positive()
      .test(
        "maxDigitsAfterDecimal",
        "number field must have 2 digits after decimal or less",
        (number) => /^\d+(.\d{1,2})?$/.test(number)
      ),
    merchant: yup.string().required(),
    account: yup.string().required(),
    location: yup.string().required(),
    category: yup.string().required(),
    date: yup.string().required(),
  });

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      userId: expenses.userId,
    };
    // TODO: Check this...
    setLoading(true);
    addExpense(data).then(
      () => {
        // TODO: Check this...
        setLoading(false);
        Alert.alert(
          "Expense Added",
          `You have successfully added your expense for the amount of £${data.amount}`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        // TODO: Redirect to home?
      },
      (error) => {
        // TODO: Check this...
        setError(error);
        // TODO: Check this...
        setLoading(false);
        // TODO: Handle error
        console.error("Error: Unable to add expense");
      }
    );
  };

  if (error) return <ErrorHandler error={error} />;

  const handleAddCategory = (category) => {
    if (!category.length) return;
    const exists = categories.find((cat) => cat.label === category);
    if (exists) {
      // TODO: Inform user in a modal maybe?
      console.error("Error: Category already exists");
      return;
    }

    addCategory(category).then(
      () => {
        Alert.alert(
          "Category Added",
          `You have successfully added ${category} to your categories`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
     
        setCategories((prev) => [
          ...prev,
          { label: category, value: category },
        ]);
      },
      (error) => {
  
        console.error("Error: Unable to add category");
      }
    );
    setToggleCategoryModal((prev) => !prev);
  };

  const handleAddMerchant = (merchant) => {
    if (!merchant.length) return;
    const exists = merchants.find((merch) => merch.label === merchant);
    if (exists) {
      console.error("Error: Merchant already exists");
      return;
    }
    
    addMerchant(merchant).then(
      () => {
        Alert.alert(
          "Merchant Added",
          `You have successfully added ${merchant} to your merchant list`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      
        setMerchants((prev) => [
          ...prev,
          { label: merchant, value: merchant },
        ]);
      },
      (error) => {
        // TODO: Handle error
        console.error("Error: Unable to add merchant");
      }
    );
    setToggleMerchantModal((prev) => !prev);
  };

  const handleAddAccount = (account) => {
    if (!account.length) return;
    const exists = accounts.find((acc) => acc.label === account);
    if (exists) {
    
      console.error("Error: Account already exists");
      return;
    }
    
    addAccount(account).then(
      () => {
        Alert.alert(
          "Payment Method Added",
          `You have successfully added ${account} to your accounts`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        // Optimistic update
        setAccounts((prev) => [
          ...prev,
          { label: account, value: account },
        ]);
      },
      (error) => {
        // TODO: Handle error
        console.error("Error: Unable to add account");
      }
    );
    setToggleAccountModal((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        category: "",
        merchant: "",
        date: "",
        receipt: "",
        account: "",
        location: "",
      }}
      validationSchema={expenseSchema}
      onSubmit={(values) => {
        setFormData(
          (formData.amount = values.amount),
          (formData.category = values.category),
          (formData.account = values.account),
          (formData.date = values.date),
          (formData.merchant = values.merchant),
          (formData.receipt = values.receipt),
          (formData.location = values.location)
        );
        handleSubmit(formData);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <AutocompleteDropdownContextProvider>
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
                {errors.amount && <Text>{errors.amount}</Text>}
              </View>
              <MerchantAutoComplete
                merchant={values.merchant}
                merchants={merchants}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />       
                <Button
                title="Add New Merchant"
                onPress={() => setToggleMerchantModal((prev) => !prev)}
              />
              <MerchantAdderModal
                isVisible={toggleMerchantModal}
                setIsVisible={setToggleMerchantModal}
                handleAddMerchant={handleAddMerchant}
              />    
              {errors.merchant && <Text>{errors.merchant}</Text>}
              <CategoryList
                category={values.category}
                categories={categories}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              {errors.category && <Text>{errors.category}</Text>}
              <Button
                title="Add New Category"
                onPress={() => setToggleCategoryModal((prev) => !prev)}
              />
              <CategoryAdderModal
                isVisible={toggleCategoryModal}
                setIsVisible={setToggleCategoryModal}
                handleAddCategory={handleAddCategory}
              />
              <AccountListDropDown
                account={values.account}
                accounts={accounts}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              {errors.account && <Text>{errors.account}</Text>}
              <Button
                title="Add New Account"
                onPress={() => setToggleAccountModal((prev) => !prev)}
              />
              <AccountAdderModal
                isVisible={toggleAccountModal}
                setIsVisible={setToggleAccountModal}
                handleAddAccount={handleAddAccount}
              />
              <DatePickerModal
                handleChange={handleChange}
                date={values.date}
              />
              <TextInput
                aria-label="Date"
                placeholder="Date"
                style={styles.input}
                onChangeText={handleChange("date")}
                onBlur={handleBlur("date")}
                value={values.date}
              />
              {errors.date && <Text>{errors.date}</Text>}
              <TextInput
                aria-label="Location"
                placeholder="Location"
                style={styles.input}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
              />
              {errors.location && <Text>{errors.location}</Text>}
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </AutocompleteDropdownContextProvider>
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




