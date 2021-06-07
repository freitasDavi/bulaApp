import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MiniLogo from "../../Logos/AlternateLogo";
import { Text, Card } from "react-native-paper";
import SearchBar from "../../components/Searchbar";
import ScannerButton from "../../components/ScannerButton";

export default function Home({ navigation }) {
  const [modalVisibile, setModalVisible] = React.useState(false);
  const [type, setType] = React.useState();
  const [data, setData] = React.useState();

  const onCodeScanned = (type, data) => {
    setType(type);
    setData(data);
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ marginBottom: 27 }}>
          <MiniLogo />
        </View>
        <SearchBar />
        <ScannerButton />
        <View style={styles.buscasRecentes}>
          <Text style={styles.tituloBuscas}>Buscas recentes</Text>
          <View>
            <View elevation={5} style={styles.card}>
              <View style={styles.leftCard}>
                <Text style={styles.leftCardRemedio}>Paracetamol</Text>
                <Text style={styles.leftCardInfo}>750mg</Text>
                <Text style={styles.leftCardInfo}>Medicamento genérico</Text>
              </View>
              <View style={styles.rightCard}>
                <TouchableOpacity style={styles.rightCardButton}>
                  <Text>VER BULA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 29,
    flexDirection: "column",
  },

  buscasRecentes: {
    width: "80%",
    margin: 33,
    justifyContent: "flex-start",
  },

  tituloBuscas: {
    color: "#005A3B",
    fontSize: 25,
    fontFamily: "Lato-Bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 7,
    marginTop: 8,
  },

  leftCard: {
    paddingHorizontal: 11,
    paddingVertical: 30,
  },

  rightCard: {
    paddingVertical: 34,
    paddingRight: 3,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  leftCardRemedio: {
    color: "#005A3B",
    fontFamily: "Lato-Regular",
    fontSize: 17,
  },

  leftCardInfo: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 10,
  },

  rightCardButton: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#005A3B",
    width: 147,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
