import { Alert, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import CategoryList from "../categories/CategoryList";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import {
  addCategory,
  addExpense,
  addMerchant,
  getCategories,
  getMerchants,
} from "../../firebase/firestore";
import AccountListDropDown from "../account/AccountListDropDown";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";
import { DatePickerModal } from "react-native-paper-dates";
import { Loading } from "../loading/Loading";
import ErrorHandler from "../error/ErrorHandler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FIREBASE_API } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import { fetchGeoLocation } from "../../utils/helpers";

const ExpenseAdder = () => {
  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState();
  const [geolocation, setGeolocation] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const { uid } = useContext(UserContext);

  const theme = useTheme();

  const formData = {
    userId: uid,
    account: account,
    amount: amount,
    date: date,
    merchant: merchant,
    category: category,
    location: location,
    geolocation: geolocation,
  };

  // console.log(formData);

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
        setMerchants((prev) => [...prev, merchant]);
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
      case "geolocation":
        {
          setGeolocation(payload);
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log(formData);

    // console.log("HERE");
    // setLoading(false);

    // addExpense(formData)
    //   .then(() => {
    //     setLoading(false);
    //     Alert.alert(
    //       "Expense Added",
    //       `You have successfully added your expense for the amount of £${amount}`,
    //       [
    //         {
    //           text: "OK",
    //           style: "cancel",
    //         },
    //       ]
    //     );
    //     dispatch({ type: "ADD_EXPENSE", payload: formData });
    //     setAccount("");
    //     setAmount("");
    //     setDate("");
    //     setMerchant("");
    //     setCategory("");
    //     setLocation("");
    //     setGeolocation("");
    //     navigation.navigate("Expenses List");
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setLoading(false);
    //     Alert.alert("Error: Unable to add expense", [
    //       {
    //         text: "OK",
    //         style: "cancel",
    //       },
    //     ]);
    //   });

    // .then(() => {
    //   addExpense(formData)
    //     .then(() => {
    //       setLoading(false);
    //       alert(
    //         "Expense Added",
    //         `You have successfully added your expense for the amount of £${amount}`,
    //         [
    //           {
    //             text: "OK",
    //             style: "cancel",
    //           },
    //         ]
    //       );
    //       dispatch({ type: "ADD_EXPENSE", payload: formData });
    //       navigation.navigate("Expenses List");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setError(err);
    //       // TODO: Check
    //       setLoading(false);
    //       // TODO: CHECK
    //       // console.error("Error: Unable to add expense");
    //       alert("Error: Unable to add expense", [
    //         {
    //           text: "OK",
    //           style: "cancel",
    //         },
    //       ]);
    //     });
    // });
  };

  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorHandler />;
  }

  // console.log(formData);

  return (
    <View
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={styles.container}
      // style={styles.container}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>Add a new Expense</Text>
        <TextInput
          mode="outlined"
          value={amount}
          onChangeText={setAmount}
          // onSubmitEditing={() => handleChange("amount", amount)}
        />
        <MerchantAutoComplete
          merchant={merchant}
          merchants={merchants}
          setMerchant={setMerchant}
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
        <GooglePlacesAutocomplete
          placeholder="Search location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocation(data.description);
            fetchGeoLocation(data.description).then((res) => {
              console.log("HERE");
            });

            // console.log(data, details);
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
        <Button title="Submit" onPress={handleSubmit} mode="contained">
          Submit
        </Button>
        {/* <Button mode="contained" onPress={handleChange}>
            Hit me
          </Button> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "80%",
    height: "100%",
    marginHorizontal: "auto",
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ExpenseAdder;
