import { View, StyleSheet, TextInput, Image, Alert } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

import { authFire, dbFire } from "../../firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorHandler from "../error/ErrorHandler";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "@firebase/firestore";
import { addCategory, getCategories } from "../../firebase/firestore";
import CategoryList from "../categories/CategoryList";
import CategoryAdderModal from "../categories/CategoryAdderModal";

const ReceiptAdder = ({ route, navigation }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [account, setAccount] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const { imageURL, imageURI } = route.params;
  const [image, setImage] = useState(imageURI);
  const [categories, setCategories] = useState([]);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);

  const auth = authFire;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  const expenses = {
    category,
    userId,
  };

  useEffect(() => {
    downloadText();
  }, [image]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleSubmit = async (values) => {
    values.userId = expenses.userId;
    //preventDefault();
    console.log(values, "values");
    setLoading(true);
    try {
      const res = await addDoc(collection(dbFire, "expenses"), values);
      setLoading(false);
      Alert.alert(
        "Expense Added",
        `You have successfully added your expense for the amount of £${values.amount}`,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      // TODO: Redirect to home?
    } catch (error) {
      setError(error);
      setLoading(false);
      Alert.alert("Error: Your expense couldn't be added.", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  };

  const captureGroup = /(?<=images%2F)(.*)(?=\?)/g;
  const matchedURL = imageURL.match(captureGroup);
  const stringifiedMatch = matchedURL.toString();

  const searchTerm = "gs://test2-c87e5.appspot.com/images/" + stringifiedMatch;

  const receiptExpenseSchema = yup.object().shape({
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
        // Optimistic update
        setCategories((prev) => [
          ...prev,
          { label: category, value: category },
        ]);
      },
      (error) => {
        // TODO: Handle error
        console.error("Error: Unable to add category");
      }
    );
    setToggleCategoryModal((prev) => !prev);
  };

  const downloadText = async () => {
    const q = query(
      collection(dbFire, "extractedText"),
      where("file", "==", searchTerm)
    );

    const querySnapshot = await getDocs(q);

    const expenseData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const expenseText = expenseData[0].text;
    const captureAmount = expenseText
      .match(/(?<=\bTOTAL\b).\w..\d..../g)
      .toString();
    setAmount(captureAmount);

    const captureMerchant = expenseText.match(/^.SDA/g).toString();
    setMerchant(captureMerchant);

    const captureAccount = expenseText.match(/AMERICAN.EXPRESS/g).toString();
    setAccount(captureAccount);
  };

  // will eventually need to re-render the image in expenses cards so be aware of how it is stored
  //Need to set some kind of loading screeen of around 10 seconds before this page is rendered
  //might need to include URI in fields in the collection to see if the receipt image can be generated easily
  //may need to update Yup fields once date picker etc are implemented

  return (
    <Formik
      enableReinitialize
      initialValues={{
        amount: amount,
        category: "",
        merchant: merchant,
        date: "",
        receipt: imageURL,
        account: account,
        location: "",
      }}
      validationSchema={receiptExpenseSchema}
      onSubmit={(values) => {
        console.log(values, "in onsubmit");
        setFormData(
          (formData.amount = values.amount),
          (formData.category = values.category),
          (formData.account = values.account),
          (formData.date = values.date),
          (formData.merchant = values.merchant),
          (formData.receipt = values.receipt),
          (formData.location = values.location)
        );
        console.log(formData, "formdata");
        handleSubmit(formData);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <Text variant="headlineMedium">Add a new Expense</Text>
              <Text variant="titleMedium">Amount:</Text>
              <TextInput
                aria-label="Amount"
                style={styles.input}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={values.amount}
                placeholder={amount}
              />
              {errors.amount && <Text>{errors.amount}</Text>}
            </View>
            <Text variant="titleMedium">Merchant:</Text>
            <TextInput
              aria-label="Merchant"
              style={styles.input}
              onChangeText={handleChange("merchant")}
              onBlur={handleBlur("merchant")}
              value={values.merchant}
              placeholder={merchant}
            />
            {errors.merchant && <Text>{errors.merchant}</Text>}
            <CategoryList
              category={values.category}
              categories={categories}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors.category && <Text>{errors.category} </Text>}
            <Button
              mode="contained"
              title="Add a new category"
              onPress={() => setToggleCategoryModal((prev) => !prev)}
            >
              Add a new category
            </Button>
            <CategoryAdderModal
              isVisible={toggleCategoryModal}
              setIsVisible={setToggleCategoryModal}
              handleAddCategory={handleAddCategory}
            />
            <TextInput
              aria-label="Account"
              placeholder={account}
              style={styles.input}
              onChangeText={handleChange("account")}
              onBlur={handleBlur("account")}
              value={values.account}
            />
            {errors.account && <Text>{errors.account}</Text>}
            <Text variant="titleMedium">Date:</Text>
            <TextInput
              aria-label="Date"
              placeholder="Date"
              style={styles.input}
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              value={values.date}
            />
            {errors.date && <Text>{errors.date}</Text>}
            <Text variant="titleMedium">Location:</Text>
            <TextInput
              aria-label="Location"
              placeholder="Location"
              style={styles.input}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
            />
            {errors.location && <Text>{errors.location}</Text>}
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Button mode="contained" title="Submit" onPress={handleSubmit}>
              {" "}
              Submit{" "}
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};

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

export default ReceiptAdder;
