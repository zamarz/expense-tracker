import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Modal, Portal, Text } from "react-native-paper";

const ErrorHandlerModal = ({ error, navigation, visible, setVisible }) => {
  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Portal>
      <Modal
        animationType="slide" // You can change the animation type if needed
        transparent={true} // Set to true for a transparent background
        visible={visible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleTextStyle}>
              An error has occurred, please try again
            </Text>
            {error && <Text style={styles.textStyle}>{error.message}</Text>}
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <Text style={styles.buttonTextStyle}>Close</Text>
            </Button>
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
  input: {
    width: "100%",
    height: 42,
    marginVertical: 10,
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
  buttonClose: {
    backgroundColor: "red",
    marginBottom: 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  titleTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ErrorHandlerModal;
