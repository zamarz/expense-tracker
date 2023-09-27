import { useEffect, useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

function MerchantList({ merchant, merchants, handleChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(merchant);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (merchant !== value) {
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

export default MerchantList;
