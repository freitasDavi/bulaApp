import React from "react";
import MiniLogo from "../../Logos/AlternateLogo";
import axios from "axios";
import { Star } from 'react-native-feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function Favorites({ navigation }) {
  const [favorites, setFavorites] = React.useState(null);
  const [favoriteUserId, setFavoriteUserId] = React.useState(null);

  React.useEffect(() => {
    try {
      async function fetchData() {
        favoriteId = await AsyncStorage.getItem("favoriteId");

        setFavoriteUserId(favoriteId);

        let payload = {
          _id: favoriteId,
        };

        console.log(favoriteId);

        await axios
          .post("http://192.168.2.137:5000/api/favoritos/listar", payload)
          .then((response) => {
            x = response.data;
            setFavorites(x.bulas_favoritas);
          });
      }

      fetchData();
    } catch (e) {}
  }, []);

  async function navigateToBula(nome_bula) {
    let payload = {
      search: nome_bula,
    };

    await axios
      .post("https://api-npab.herokuapp.com/api/bulas/find", payload)
      .then((response) => {
        navigation.navigate("SearchResults", {
          screen: "HomeBula",
          params: {
            id: response.data[0]._id,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  async function removerFavoritos(id) {
    let payload = {
      _id: favoriteUserId,
      id_favorito: id
    };

    await axios.post("http://192.168.2.137:5000/api/favoritos/remove", payload)
    .then((response) => {
      setFavorites(response.data.bulas_favoritas);
    })

  }

  if (favorites === null) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />
          <View style={styles.favoritosContainer}>
            <Text style={styles.tituloFavoritos}>Favoritos</Text>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />
          <View style={styles.favoritosContainer}>
            <Text style={styles.tituloFavoritos}>Favoritos</Text>
            <View>
              {favorites.map((item) => (
                <View key={item._id+item.nome} elevation={5} style={styles.card}>
                  <View style={styles.leftCard}>
                    <Image
                      style={styles.leftCardImage}
                      source={{
                        uri: item.url_imagem,
                      }}
                    />
                  </View>
                  <View style={styles.rightCard}>
                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableOpacity onPress={() => removerFavoritos(item._id)} >
                        <Star width={20} fill="#ffdd03" stroke="#ffDD03" height={20} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.rightCardRemedio}>
                      {item.nome_bula}
                    </Text>
                    <Text style={styles.rightCardInfo}>
                      {item.composicao_bula}
                    </Text>
                    <Text style={styles.rightCardInfo2}>{item.generico}</Text>
                    <TouchableOpacity
                      style={styles.rightCardButton}
                      onPress={() => navigateToBula(item.nome_bula)}
                    >
                      <Text style={styles.rightCardButtonText}>VER BULA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
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
