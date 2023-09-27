import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"

export default function MerchantAutoComplete({ merchant, merchants, handleChange, handleBlur }) {
  const merchantAsId = (merchant) => {
    if (!merchant || !merchant.length) return;
    const merchantObject = merchants.find((m) => m.title === merchant);
    return merchantObject.id;
  }
  const [value, setValue] = useState(merchantAsId(merchant));

  useEffect(() => {
    if (value && merchant !== value.title) {
      handleChange("merchant")(value.title);
    }
  }, [value]);

  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      initialValue={value}
      onSelectItem={setValue}
      dataSet={merchants}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});