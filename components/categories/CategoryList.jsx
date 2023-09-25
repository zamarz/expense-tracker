import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// import { ScrollView } from "react-native-gesture-handler";

function CategoryList({ category, categories, handleChange, handleBlur }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(category);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (category !== value) {
      handleChange("category")(value);
    }
  }, [value]);

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={"Choose a category"}
      scrollViewProps={{
        decelerationRate: "fast",
      }}
    />
  );
}

export default CategoryList;
