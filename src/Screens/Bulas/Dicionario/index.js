import React from "react";
import MiniLogo from "../../../Logos/AlternateLogo";
import { ScrollView, View, Text, StyleSheet, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { ArrowLeft } from "react-native-feather";
import axios from "axios";

export default function Dicionario({ navigation: { goBack } }) {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState("");

  const partialSearch = async (searchQ) => {
    console.log("salve");

    if (searchQ.length >= 4) {
      await axios
        .get(`https://significado.herokuapp.com/meanings/${searchQ}`)
        .then((response) => {
          if (response.data.length > 0) {
            console.log(response.data[0].meanings);
            setResults(response.data[0].meanings);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  if (results === "") {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />
          <Searchbar
            placeholder="Digite sua pesquisa"
            onChangeText={(text) => {
              setInput(text);
            }}
            value={input}
            style={styles.searchbar}
            onIconPress={() => goBack()}
            onSubmitEditing={() => partialSearch(input)}
            icon={() => <ArrowLeft width={21} height={21} color="#8B8B8B" />}
          />
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoContainerTitle}>
              Digite um termo para iniciar a pesquisa
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />
          <Searchbar
            placeholder="Digite sua pesquisa"
            onChangeText={(text) => {
              setInput(text);
            }}
            value={input}
            style={styles.searchbar}
            onIconPress={() => goBack()}
            onSubmitEditing={() => partialSearch(input)}
            icon={() => <ArrowLeft width={21} height={21} color="#8B8B8B" />}
          />
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoContainerTitle}>{results[0]}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 29,
  },

  resultadoContainer: {
    width: "80%",
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 35,
    alignItems: "center",
  },

  resultadoContainerTitle: {
    fontFamily: "Lato-Bold",
    color: "#005A3B",
    fontSize: 25,
  },

  searchbar: {
    backgroundColor: "#fff",
    marginTop: 21,
    height: 51,
  },
});
