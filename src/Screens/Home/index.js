import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MiniLogo from "../../Logos/AlternateLogo";
import axios from "axios";
import { Text, Card } from "react-native-paper";
import SearchBar from "../../components/Searchbar";
import ScannerButton from "../../components/ScannerButton";

export default function Home({ navigation }) {
  const [modalVisibile, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [buscaRecente, setBuscaRecente] = React.useState(null);
  const [type, setType] = React.useState();
  const [data, setData] = React.useState();

  const onCodeScanned = (type, data) => {
    setType(type);
    setData(data);
    setModalVisible(false);
  };

  async function partialSearch(text) {
    setIsLoading(true);
    const payload = {
      search: text,
    };

    navigation.navigate("SearchResults", {
      screen: "Resultados",
      params: { payload: payload },
    });
    setIsLoading(false);
  }

  React.useEffect(() => {
    async function fetchListAccordingToBarCode() {
      if (data !== undefined && data !== null) {
        let payload = {
          barCode: data,
        };
        axios
          .post("https://api-npab.herokuapp.com/api/bulas/codigoBarras", payload)
          .then((response) => {
            setBuscaRecente(response.data[0]);
            navigation.navigate("SearchResults", {
              screen: "HomeBula",
              params: {
                id: response.data[0]._id,
              },
            });
          });
      }
    }

    fetchListAccordingToBarCode();
  }, [data]);

  async function verBula(id) {
    navigation.navigate("SearchResults", {
      screen: "HomeBula",
      params: {
        id,
      },
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ marginBottom: 27 }}>
          <MiniLogo />
        </View>
        <SearchBar
          partialSearch={partialSearch}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <ScannerButton onCode={onCodeScanned} />
        <View style={styles.buscasRecentes}>
          <Text style={styles.tituloBuscas}>Buscas recentes</Text>
          <View>
            {buscaRecente !== null ? (
              <View elevation={5} style={styles.card}>
                <View style={styles.leftCard}>
                  <Text style={styles.leftCardRemedio}>
                    {buscaRecente.nome_bula}
                  </Text>
                  <Text style={styles.leftCardInfo}>
                    {buscaRecente.composicao_bula}
                  </Text>
                  <Text style={styles.leftCardInfo}>
                    {buscaRecente.generico}
                  </Text>
                </View>
                <View style={styles.rightCard}>
                  <TouchableOpacity
                    style={styles.rightCardButton}
                    onPress={() => verBula(buscaRecente._id)}
                  >
                    <Text>VER BULA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text>Você não possui buscas recentes</Text>
              </View>
            )}
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
