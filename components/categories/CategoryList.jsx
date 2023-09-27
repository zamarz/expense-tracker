import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

function CategoryList({ category, categories, handleChange, handleBlur }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(category);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (category !== value) {
      handleChange("category")(value);
    }
    setItems(categories);
  }, [value, categories]);

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
