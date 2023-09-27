import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// import { ScrollView } from "react-native-gesture-handler";

function AccountListDropDown({ account, accounts, handleChange, handleBlur }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(account);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (account !== value) {
      handleChange("account")(value);
    }
    setItems(accounts);
  }, [value, accounts]);

  return (
    <DropDownPicker
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
