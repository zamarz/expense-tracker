import { View, StyleSheet, Image, Alert, SafeAreaView } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { authFire, dbFire } from "../../firebaseConfig";
import ErrorHandler from "../error/ErrorHandler";
import { useContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "@firebase/firestore";
import {
  addCategory,
  addExpense,
  addMerchant,
  getCategories,
  getMerchants,
} from "../../firebase/firestore";
import CategoryList from "../categories/CategoryList";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import { ScrollView } from "react-native-gesture-handler";
import { DatePickerModal } from "react-native-paper-dates";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Loading } from "../loading/Loading";
import { FIREBASE_API } from "@env";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import AccountListDropDown from "../account/AccountListDropDown";

const ReceiptAdder = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [merchants, setMerchants] = useState("");

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState();

  const { imageURL, imageURI } = route.params;
  const [image, setImage] = useState(imageURI);
  const [categories, setCategories] = useState([]);

  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const { uid } = useContext(UserContext);
  const theme = useTheme();

  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [open, setOpen] = useState(false);

  const formData = {
    userId: uid,
    account: account,
    amount: amount,
    date: date,
    merchant: merchant,
    category: category,
    location: location,
    receipt: imageURL,
  };

  console.log(formData);

  useEffect(() => {
    downloadText();
  }, [image]);

  useEffect(() => {
    setLoading(true);
    getCategories(uid)
      .then((categories) => {
        setCategories(categories);
      })
      .then(() => {
        getMerchants(uid).then((merchants) => {
          setMerchants(merchants);
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  function handleAddMerchant(merchant) {
    if (!merchant.length) return;
    console.log("Merchant Adder");
    if (exists) {
      Alert.alert(`Error: this merchant already exists!`, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
    addMerchant(merchant)
      .then(() => {
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
        setMerchants((prev) => [...prev, { label: merchant, value: merchant }]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error: Unable to add merchant", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
    setToggleMerchantModal((prev) => !prev);
  }

  const handleAddCategory = (category) => {
    if (!category.length) return;
    const exists = categories.find((cat) => cat.label === category);
    if (exists) {
      Alert.alert("This category already exists!", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
    addCategory(category)
      .then(() => {
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
      })
      .catch((err) => {
        Alert.alert(`Error: Unable to add ${category} to your categories`, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
    setToggleCategoryModal((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);

    addExpense(formData)
      .then(() => {
        setLoading(false);
        alert(
          "Expense Added",
          `You have successfully added your expense for the amount of £${amount}`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        dispatch({ type: "ADD_EXPENSE", payload: formData });
        navigation.navigate("Expense List", { screen: "ExpenseList" });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        // TODO: Check
        setLoading(false);
        // TODO: CHECK
        // console.error("Error: Unable to add expense");
        alert("Error: Unable to add expense", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
  };

  function handleChange(type, payload) {
    console.log(type, "TYPE#########");
    console.log(payload, "PAYLOAD#########");
    switch (type) {
      case "account":
        {
          setAccount(payload);
        }
        break;
      case "category":
        {
          setCategory(payload);
        }
        break;
      case "merchant":
        {
          setMerchant(payload);
        }
        break;
      default:
        console.log("CHANGE");
    }
  }

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params) => {
    setOpen(false);
    setDate(params.date.toString());
  };

  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorHandler />;
  }

  const captureGroup = /(?<=images%2F)(.*)(?=\?)/g;
  const matchedURL = imageURL.match(captureGroup);
  const stringifiedMatch = matchedURL.toString();

  const searchTerm = "gs://test2-c87e5.appspot.com/images/" + stringifiedMatch;

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="headlineMedium">Add a new Expense</Text>
        <Text variant="titleMedium">Amount:</Text>
        <TextInput
          placeholder={amount}
          mode="outlined"
          value={amount}
          onChangeText={setAmount}
          // onSubmitEditing={() => handleChange("amount", amount)}
        />
        <Text variant="titleMedium">Merchant:</Text>
        <MerchantAutoComplete
          merchant={merchant}
          merchants={merchants}
          setMerchants={setMerchants}
          handleChange={handleChange}
        />
        <Button
          mode="outlined"
          onPress={() => setToggleMerchantModal((prev) => !prev)}
        >
          <Text>Add new Merchant</Text>
        </Button>
        <MerchantAdderModal
          isVisible={toggleMerchantModal}
          setIsVisible={setToggleMerchantModal}
          handleAddMerchant={handleAddMerchant}
        />
        <CategoryList
          category={"Default"}
          categories={categories}
          handleChange={handleChange}
        />
        <Button
          mode="contained"
          title="Add New Category"
          onPress={() => setToggleCategoryModal((prev) => !prev)}
        >
          Add New Category
        </Button>
        <CategoryAdderModal
          isVisible={toggleCategoryModal}
          setIsVisible={setToggleCategoryModal}
          handleAddCategory={handleAddCategory}
        />
        <AccountListDropDown accounts={accounts} handleChange={handleChange} />
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Select date for your expense
        </Button>
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
        <Text variant="titleMedium">Location:</Text>
        <GooglePlacesAutocomplete
          placeholder="Search location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocation(data.description);
            console.log(data, details);
          }}
          query={{
            key: FIREBASE_API,
            language: "en",
          }}
          textInputProps={{
            InputComp: TextInput,
          }}
          styles={{
            textInputContainer: {
              backgroundColor: theme.colors.primary,
            },
            container: {
              flex: 0,
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Submit" onPress={handleSubmit} mode="contained">
          Submit
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Home")}
          title="Go back home"
          accessibilityLabel="Go back home"
          style={styles.button}
        >
          Go back home{" "}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    maxWidth: "80%",
    marginHorizontal: "auto",
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  location: {
    borderBlockColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
  },
  dateText: {
    fontWeight: "700",
    justifyContent: "flex-start",
    fontSize: 16,
    alignSelf: "center",
  },
  subhead: {
    fontSize: 18,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    minWidth: 190,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default ReceiptAdder;
