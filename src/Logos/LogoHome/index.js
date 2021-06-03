import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoTop}>NÃO PULE</Text>
      <View style={styles.horizontalContainer}>
        <Text style={styles.logoBottomA}>A</Text>
        <Text style={styles.logoBottom}>BULA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoTop: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontWeight: "900",
    fontSize: 39,
  },

  logoBottom: {
    color: "#008E5E",
    fontFamily: "Lato-Light",
    fontWeight: "300",
    fontSize: 57,
  },

  logoBottomA: {
    color: "#008E5E",
    fontFamily: "Lato-Light",
    fontWeight: "300",
    fontSize: 57,
    marginRight: 15,
  },
});
