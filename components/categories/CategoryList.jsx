import { useEffect, useState } from "react";
import { getCategories } from "../../firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

function CategoryList({ values, handleChange, handleBlur }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(values.category);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (values.category !== value) {
      handleChange("category")(value);
    }
  }, [value]);

//   useEffect(() => {
//     getCategories().then((categories) => {
//       setItems(
//         categories.map((category, index) => {
//           label: category;
//           value: category;
//           key: index;
//         })
//       );
//     });
//   }, []);

  useEffect(() => {
    getCategories().then((categories) => {
      setItems(
        categories.map((category, index) => ({
          label: category,
          value: category,
          key: index,
        }))
      );
    });
  }, []);

  

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={"Choose a category"}
    />
  );
}

export default CategoryList;
