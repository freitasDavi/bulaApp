import React from "react";
import MiniLogo from "../../Logos/AlternateLogo";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Favorites() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <MiniLogo />
        <View style={styles.favoritosContainer}>
          <Text style={styles.tituloFavoritos}>Favoritos</Text>
          <View>
            <View elevation={5} style={styles.card}>
              <View style={styles.leftCard}>
                <Image
                  style={styles.leftCardImage}
                  source={{
                    uri: "https://uploads.consultaremedios.com.br/product_variation_images/full/becc4de4188cc5aaa759931dd0f8fef4811d1012.jpg?1606493189",
                  }}
                />
              </View>
              <View style={styles.rightCard}>
                <View style={{ alignItems: "flex-end" }}>
                  <Icon name="star" size={15} color="#FFDD03" />
                </View>
                <Text style={styles.rightCardRemedio}>Paracetamol</Text>
                <Text style={styles.rightCardInfo}>750mg</Text>
                <Text style={styles.rightCardInfo2}>Medicamento genérico</Text>
                <TouchableOpacity style={styles.rightCardButton}>
                  <Text style={styles.rightCardButtonText}>VER BULA</Text>
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
  },

  favoritosContainer: {
    width: "80%",
    marginTop: 33,
    marginBottom: 25,
    justifyContent: "flex-start",
  },

  tituloFavoritos: {
    color: "#005A3B",
    fontSize: 25,
    fontFamily: "Lato-Bold",
    marginBottom: 25,
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
    fontFamily: "Lato-Regular",
    fontSize: 17,
    marginTop: 8,
  },

  rightCardInfo: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 10,
    marginTop: 2,
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
    justifyContent: "center",
    alignItems: "center",
  },

  rightCardButtonText: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
  },

  leftCardImage: {
    height: 150,
    width: 150,
  },
});
