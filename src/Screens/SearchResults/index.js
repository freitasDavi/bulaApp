import React from "react";
import axios from "axios";
import MiniLogo from "../../Logos/AlternateLogo";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SearchResults({ route, navigation }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [naoPossuiResultados, setNaoPossuiResultados] = React.useState(false);
  const [resultados, setResultados] = React.useState([
    {
      id: "",
      nome: "",
      composicao: "",
    },
  ]);

  React.useEffect(() => {
    const { payload } = route.params;

    async function getResults(payload) {
      await axios
        .post("https://api-npab.herokuapp.com/api/bulas/find", payload)
        .then((response) => {
          let _results = [...resultados];

          if (response.data[0] === undefined) {
            setNaoPossuiResultados(true);
            // setIsLoaded(true);
            console.log("Não foram encontrados resultados para sua pesquisa");
            return;
          }

          _results.push({
            id: response.data[0]._id,
            nome: response.data[0].nome_bula,
            composicao: response.data[0].composicao_bula,
          });

          setResultados(_results);
        })
        .catch((err) => console.log(err));
      setIsLoaded(true);
    }
    if (payload) {
      getResults(payload);
    }
  }, []);

  function navigateToBula(id) {
    navigation.navigate("SearchResults", {
      screen: "HomeBula",
      params: {
        id: id,
      },
    });
  }

  if (!isLoaded) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    if (!naoPossuiResultados) {
      return (
        <View style={styles.container}>
          <MiniLogo />
          <Text>Resultados</Text>
          {resultados.map((item) => {
            if (item.nome.length === 0) {
              return <View key={item.nome}></View>;
            } else {
              return (
                <TouchableOpacity
                  key={item.nome}
                  style={styles.listItem}
                  onPress={() => navigateToBula(item.id)}
                >
                  <Text style={styles.titulo}>{item.nome}</Text>
                  <Text style={styles.composicao}>{item.composicao}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MiniLogo />
          <Text>Não foram encontrados resultados para sua pesquisa</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 29,
    flexDirection: "column",
  },

  listItem: {
    width: "80%",
    marginTop: 21,
  },

  titulo: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 21,
  },

  composicao: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 13,
  },
});
