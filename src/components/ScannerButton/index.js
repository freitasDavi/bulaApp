import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Button, Searchbar as RNPSearchbar } from "react-native-paper";
import Scanner from "../Scanner";
import Icon from "react-native-vector-icons/Feather";

export default function ScannerButton() {
  const [modalVisibile, setModalVisible] = React.useState(false);

  const onCodeScanned = (type, data) => {
    setType(type);
    setData(data);
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        visible={modalVisibile}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Scanner onCodeScanned={onCodeScanned} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.buttonBox}
      >
        <Icon name="camera" size={100} color="#008E5E" />
        <Text style={styles.buttonText}>
          Leia o código de barras do medicamento para pesquisar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    width: 315,
    height: 198,
    marginTop: 15,
    borderWidth: 1.1,
    borderColor: "#005A3B",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  buttonText: {
    textAlign: "center",
    width: 180,
    color: "#8B8B8B",
    fontSize: 13,
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
  },
});
