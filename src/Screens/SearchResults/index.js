import React from "react";
import axios from "axios";
import MiniLogo from "../../Logos/AlternateLogo";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

export default function SearchResults({ route, navigation }) {
  const [results, setResults] = React.useState([{ nome: "", composicao: "" }]);

  React.useEffect(() => {
    const { payload } = route.params;

    async function getResults(payload) {
      setResults({ nome: "", composicao: "" });

      await axios
        .post("https://api-npab.herokuapp.com/api/bulas/find", payload)
        .then((response) => {
          let _results = results;
          _results = {
            nome: response.data[0].nome_bula,
            composicao: response.data[0].composicao_bula,
          };
          setResults(_results);
        })
        .catch((err) => console.log(err));
    }
    if (payload) {
      getResults(payload);
    }
  }, []);

  return (
    <View style={styles.container}>
      <MiniLogo />
      <Text>Resultados</Text>
      <FlatList
        data={results}
        renderItem={lista}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
}

const lista = (resultado) => (
  <View key={resultado.nome}>
    <Text>{resultado.nome}</Text>
    <Text>{resultado.composicao}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 29,
    flexDirection: "column",
  },
});
