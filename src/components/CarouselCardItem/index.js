import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CurrentPage } from "../../../services/otherContext";

export const CarouselCardItem = ({ item, index }) => {
  const [paginaAtual, setPaginaAtual] = React.useContext(CurrentPage);

  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle}>{item.body}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008E5E",
    borderRadius: 5,
    width: 146,
    height: 138,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: "space-around",
    margin: 10,
    paddingRight: 10,
  },

  title: {
    color: "#FFFFFF",
    fontFamily: "Lato-Regular",
    fontSize: 18,
    paddingTop: 24,
    paddingLeft: 9,
  },

  subTitle: {
    color: "#FFFFFF",
    fontFamily: "Lato-Regular",
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 21,
    paddingLeft: 9,
  },
});
