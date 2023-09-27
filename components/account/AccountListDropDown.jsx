import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AppTracker } from "../../context/AppTracker";
// import { ScrollView } from "react-native-gesture-handler";

function AccountListDropDown({ account, handleChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const accountNames = accounts.map((acc) => {
    return { label: acc.bank, value: acc.bank, accountId: acc.id };
  });

  // console.log(accountNames);

  // console.log(value);
  // console.log(items);

  useEffect(() => {
    if (account !== value) {
      handleChange("account", value);
    }
    setItems(accountNames);
  }, [value, accounts]);

  return (
    <DropDownPicker
      schema={{ label: "label", value: "value" }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={"Select your account"}
      scrollViewProps={{
        decelerationRate: "fast",
      }}
    />
  );
}

export default AccountListDropDown;
