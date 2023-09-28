import { useEffect, useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

function MerchantList({ merchant, merchants, handleChange, setMerchants }) {
  const [value, setValue] = useState(merchant);

  useEffect(() => {
    if (merchant !== value) {
      handleChange("merchant", value);
    }
    setMerchants(merchants);
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