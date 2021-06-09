import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Searchbar as RNPSearchbar } from "react-native-paper";

import Icon from "react-native-vector-icons/FontAwesome5";

export default function Searchbar({ partialSearch, isLoading, setIsLoading }) {
  const [input, setInput] = useState("");

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
