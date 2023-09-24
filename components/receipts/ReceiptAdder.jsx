import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { authFire, dbFire } from "../../firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorHandler from "../error/ErrorHandler";
import { useEffect, useState } from "react";
import { doc, collection, query, where, getDocs } from "@firebase/firestore";

const ReceiptAdder = ({ route, navigation }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [account, setAccount] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const { imageURL, imageURI } = route.params;
  const [image, setImage] = useState(imageURI);

  const auth = authFire;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  const expenses = {
    userId,
  };

  const handleSubmit = async (values) => {
    values.userId = expenses.userId;
    //preventDefault();
    console.log(values, "values");
    setLoading(true);
    try {
      const res = await addDoc(collection(dbFire, "expenses"), values);
      setLoading(false);
      //To add submission message state
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const captureGroup = /(?<=images%2F)(.*)(?=\?)/g;
  const matchedURL = imageURL.match(captureGroup);
  const stringifiedMatch = matchedURL.toString();

  const searchTerm = "gs://test2-c87e5.appspot.com/images/" + stringifiedMatch;

  useEffect(() => {
    downloadText();
  }, [image]);

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
  // const accountData = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   id: doc.id,
  // }));
  // setAccounts(accountData);

  //this is part of the image id... where file = "...images/imageRef"
  // need to input the data from the receipt as a placeholder in the form - make call to cloud API
  // need to work out what to store the image as in the database with user ID
  // will eventually need to re-render the image in expenses cards so be aware of how it is stored
  //Need to set some kind of loading screeen of around 10 seconds before this page is rendered
  // values aren't being inputted from the placeholders - need to look into this

  // if (error) return <ErrorHandler error={error} />;

  return (
    <Formik
      initialValues={{
        amount: amount,
        category: "",
        merchant: merchant,
        date: "",
        receipt: imageURL,
        account: account,
        location: "",
      }}
      // validationSchema={expenseSchema}
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
              <Text>Add a new Expense</Text>
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
            <TextInput
              aria-label="Merchant"
              style={styles.input}
              onChangeText={handleChange("merchant")}
              onBlur={handleBlur("merchant")}
              value={values.merchant}
              placeholder={merchant}
            />
            {errors.merchant && <Text>{errors.merchant}</Text>}
            <TextInput
              aria-label="Category"
              placeholder="Category"
              style={styles.input}
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
            />
            {errors.category && <Text>{errors.category}</Text>}
            <TextInput
              aria-label="Account"
              placeholder={account}
              style={styles.input}
              onChangeText={handleChange("account")}
              onBlur={handleBlur("account")}
              value={values.account}
            />
            {errors.account && <Text>{errors.account}</Text>}
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
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Button title="Submit" onPress={handleSubmit} />
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
