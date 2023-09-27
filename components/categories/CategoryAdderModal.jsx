import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Text, Modal, Portal } from "react-native-paper";

const CategoryAdderModal = ({ isVisible, setIsVisible, handleAddCategory }) => {
  const [catTitle, setCatTitle] = useState("");

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCatAdd = () => {
    const newCategory = catTitle;
    handleAddCategory(newCategory);
    setCatTitle("");
  };

  return (
    <Portal>
      <Modal
        animationType="slide" // You can change the animation type if needed
        transparent={true} // Set to true for a transparent background
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            <TextInput
              onChangeText={setCatTitle}
              value={catTitle}
              placeholder="Category Title"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleCatAdd()}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
            <Pressable onPress={() => setIsVisible((prev) => !prev)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "90%",
    height: "70%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CategoryAdderModal;
