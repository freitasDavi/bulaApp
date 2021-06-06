import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Searchbar as RNPSearchbar } from "react-native-paper";
import axios from "axios";

import Icon from "react-native-vector-icons/FontAwesome5";

export default function Searchbar() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function partialSearch(text) {
    setIsLoading(true);
    // const payload = {
    //     search: text,
    //   },
    //   uriFinal = "https://api-npab.herokuapp.com/api/bulas/find";

    // await axios
    //   .post(uriFinal, payload)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => console.log(err));
    console.log(text);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <View>
      <RNPSearchbar
        placeholder="Digite sua pesquisa"
        onChangeText={(text) => {
          setInput(text);
        }}
        value={input}
        style={styles.searchBar}
        onIconPress={() => partialSearch(input)}
        onSubmitEditing={() => partialSearch(input)}
        icon={() =>
          isLoading ? (
            <ActivityIndicator size="large" color="#005A3B" />
          ) : (
            <Icon name="search" size={20} color="#C2C2C2" />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    backgroundColor: "#fff",
  },
});
