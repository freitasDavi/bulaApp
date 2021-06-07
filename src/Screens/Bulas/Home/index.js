import axios from "axios";
import React from "react";
import MiniLogo from "../../../Logos/AlternateLogo";
import Icon from "react-native-vector-icons/Feather";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

export default function HomeBula({ route, navigation }) {
  const [infos, setInfos] = React.useState(null);

  React.useEffect(() => {
    if (route.params.id !== null) {
      console.log(route.params.id);
      axios
        .get(
          `https://api-npab.herokuapp.com/api/bulas/details/${route.params.id}`
        )
        .then((response) => {
          console.log(response.data);
          setInfos(response.data);
          console.log(infos);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  if (infos === null) {
    return (
      <View>
        <Text>Carregando</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />
          <Text>Barra de pesquisa</Text>
          <View style={styles.card}>
            <View style={styles.leftCard}>
              <Image
                style={styles.leftCardImage}
                source={{
                  uri: "https://uploads.consultaremedios.com.br/product_variation_images/full/becc4de4188cc5aaa759931dd0f8fef4811d1012.jpg?1606493189",
                }}
              />
            </View>
            <View style={styles.rightCard}>
              <Text style={styles.rightCardRemedio}>{infos.nome_bula}</Text>
              <Text style={styles.rightCardInfo}>{infos.composicao_bula}</Text>
              <TouchableOpacity style={styles.rightCardButton}>
                <Text style={styles.rightCardButtonText}>FAVORITAR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.atencaoContainer}>
            <Text style={styles.atencaoTitulo2}>ATENÇÃO!</Text>
            <Text style={styles.atencaoTitulo}>
              O dicloridrato de hidroxizina contém lactose na composição e pode
              oferecer riscos a você.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 29,
    flexDirection: "column",
    backgroundColor: "#FFF",
  },

  atencaoContainer: {
    width: "80%",
    backgroundColor: "#FF0000",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  atencaoTitulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Lato-Regular",
  },

  atencaoTitulo2: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Lato-Regular",
    marginBottom: 5,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 159,
    borderRadius: 7,
    marginTop: 8,
  },

  rightCard: {
    paddingRight: 11,
    paddingTop: 10,
    paddingBottom: 30,
  },

  leftCard: {
    paddingVertical: 34,
    justifyContent: "center",
    alignItems: "center",
  },

  rightCardRemedio: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 25,
    marginTop: 8,
  },

  rightCardInfo: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 15,
    marginTop: 2,
    width: 102,
  },

  rightCardInfo2: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 10,
    marginBottom: 15,
  },

  rightCardButton: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#005A3B",
    width: 147,
    height: 36,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  rightCardButtonText: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
  },

  leftCardImage: {
    height: 167,
    width: 169,
  },
});
