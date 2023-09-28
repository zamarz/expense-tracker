// import { StyleSheet, View } from "react-native";
// import React, { useState } from "react";
// import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

// const ErrorHandlerModal = ({ error, navigation, visible, setVisible }) => {
//   const toggleModal = () => {
//     setVisible(!visible);
//   };

//   const theme = useTheme();

//   return (
//     import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const ErrorHandlerModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

// export default MyComponent;


    // <Portal>
    //   <Modal
    //     animationType
    //     transparent={true} // Set to true for a transparent background
    //     visible={visible}
    //     onRequestClose={toggleModal}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.titleTextStyle}>
    //           An error has occurred, please try again
    //         </Text>
    //         {error && <Text style={styles.textStyle}>{error.message}</Text>}
    //         <Button
    //           style={[styles.button, styles.buttonClose]}
    //           onPress={toggleModal}
    //         >
    //           <Text style={styles.buttonTextStyle}>Close</Text>
    //         </Button>
    //       </View>
    //     </View>
    //   </Modal>
    // </Portal>
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
