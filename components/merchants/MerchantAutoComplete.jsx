import { useEffect, useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

function MerchantAutoComplete({ merchant, merchants, handleChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(merchant);
  const [items, setItems] = useState([]);
  const [finalValue, setFinalValue] = useState("");

  useEffect(() => {
    console.log(value, "value!");
    console.log(merchants);
    if (merchant !== value && value !== null) {
      let arrayvalues = Object.values(value);
      console.log(arrayvalues, "array");
      if (arrayvalues.length === 2) {
        const desiredMerchant = arrayvalues[0];
        setValue(desiredMerchant);
      }

      handleChange("merchant", value);
    }
    setItems(merchants);
  }, [value, merchants]);

  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      initialValue={value}
      onSelectItem={setValue}
      dataSet={merchants}
      onChangeText={setValue}
    />
  );
}

export default MerchantAutoComplete;
