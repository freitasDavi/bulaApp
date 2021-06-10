import axios from "axios";
import React from "react";
import MiniLogo from "../../../Logos/AlternateLogo";
import Icon from "react-native-vector-icons/Feather";
import Accordion from "react-native-collapsible/Accordion";
import { ArrowLeft } from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CurrentPage,
  CurrentPageProvider,
} from "../../../../services/otherContext";
import { FAB, Searchbar } from "react-native-paper";
import { CarouselCardItem } from "../../../components/CarouselCardItem";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";

const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;

const dataFock = [
  {
    title: "Para que serve?",
    body: "Indicações de uso do medicamento.",
    menu: "ParaQue",
  },
  {
    title: "Como funciona?",
    body: "Ações do medicamento e tempo médio para ter efeito.",
    menu: "Funciona",
  },
  {
    title: "Quando não usar?",
    body: "Informações sobre as contraindicações do medicamento.",
    menu: "NaoUsar",
  },
  {
    title: "O que saber antes de tomar?",
    body: "Advertências e precauções que se deve saber antes de tomar o medicamento.",
    menu: "OQueSaber",
  },
  {
    title: "Como deve ser armazenado?",
    body: "Onde, como e por quanto tempo o medicamento pode ser guardado.",
    menu: "Armazenado",
  },
  {
    title: "Como devo usar?",
    body: "Indicações como usar, manusear e aplicar o medicamento.",
    menu: "ComoUsar",
  },
  {
    title: "O que fazer quando esquecer?",
    body: "Indicações do que fazer quando esquecer de tomar o medicamento.",
    menu: "Esquecer",
  },
  {
    title: "Quais os malefícios?",
    body: "Apresentação dos males com reações adversas e sintomas.",
    menu: "Maleficios",
  },
  {
    title: "O que fazer ao ter superdose?",
    body: "Indicações do que fazer ao ter ingerido uma dose maior do que a indicada.",
    menu: "Superdose",
  },
];

export default function HomeBula({ route, navigation }) {
  const [infos, setInfos] = React.useState(null);
  const [activeSections, setActiveSections] = React.useState([]);
  const [favoriteUserId, setFavoriteUserId] = React.useState();
  const [favorites, setFavorites] = React.useState();
  const [input, setInput] = React.useState("");
  const [estaFavoritado, setEstaFavoritado] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [content, setContent] = React.useState(null);
  const isCarousel = React.useRef(null);
  const [paginaAtual, setPaginaAtual] = React.useState("Home");

  accordionHeader = (section, _, isActive) => {
    return (
      <View
        elevation={5}
        style={[
          styles.header,
          isActive ? styles.headerActive : styles.headerInactive,
        ]}
      >
        <View>
          <Text
            style={[isActive ? styles.headerTitleActive : styles.headerTitle]}
          >
            {section.title}
          </Text>
          {!isActive ? (
            <Text style={styles.headerSubTitle}>{section.subTitle}</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        {isActive ? (
          <Icon name="chevron-down" size={40} color="#fff" />
        ) : (
          <Icon name="chevron-right" size={40} color="#8B8B8B" />
        )}
      </View>
    );
  };

  accordionContent = (section, _, isActive) => {
    return (
      <View style={styles.accordionContent}>
        <Text style={styles.accordionContentText}>{section.content1}</Text>
        <Text style={styles.accordionContentText}>{section.content12}</Text>
        <Text style={styles.accordionContentText}>{section.content2}</Text>
        <Text style={styles.accordionContentText}>{section.content3}</Text>
      </View>
    );
  };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  function setCurrentMenu(state) {
    console.log(`Estamos setando o estado ${state}`);
    setPaginaAtual(state);
  }

  React.useEffect(() => {
    if (route.params.id !== null) {
      console.log(route.params.id);

      async function fetchData() {
        let favoriteId = await AsyncStorage.getItem("favoriteId");

        setFavoriteUserId(favoriteId);

        let payload = {
          _id: favoriteId,
        };

        await axios
          .post("http://192.168.1.5:5000/api/favoritos/listar", payload)
          .then((response) => {
            x = response.data;
            if (x !== null) {
              setFavorites(x.bulas_favoritas);
            }
          });

        await axios
          .get(
            `https://api-npab.herokuapp.com/api/bulas/details/${route.params.id}`
          )
          .then((response) => {
            setInfos(response.data);

            const conteudo = [
              {
                title: "Identificação do medicamento",
                subTitle: "Nome comercial, genérico e similar",
                content1: "Solução oral 2mg/ml: ",
                content12:
                  "Embalagem contendo 1 frasco com 120mL + copo dosador",
                content2: "USO ORAL",
                content3: "USO PEDIÁTRICO",
              },
              {
                title: "Apresentação",
                subTitle: "Peso, volume, via de administração e público",
                content1: response.data.apresentacao
                  ? response.data.apresentacao
                  : "",
                content12: "",
                content2: response.data.apresentacaoBold[0]
                  ? response.data.apresentacaoBold[0]
                  : "",
                content3: response.data.apresentacaoBold[1]
                  ? response.data.apresentacaoBold[1]
                  : "",
              },
              {
                title: "Composição",
                subTitle: "Princípios ativos que contém no medicamento",
                content1: response.data.composicao[0]
                  ? response.data.composicao[0]
                  : "",
                content12: response.data.composicao[1]
                  ? response.data.composicao[1]
                  : "",
                content2: response.data.composicao[2]
                  ? response.data.composicao[2]
                  : "",
                content3: "",
              },
              {
                title: "Fabricante",
                subTitle: "Informações de validade e sobre o fabricante",
                content1: response.data.fabricante[0]
                  ? response.data.fabricante[0]
                  : "",
                content12: response.data.fabricante[1]
                  ? response.data.fabricante[1]
                  : "",
                content2: response.data.fabricante[2]
                  ? response.data.fabricante[2]
                  : "",
                content3: response.data.fabricante[3]
                  ? response.data.fabricante[3]
                  : "",
              },
            ];
            setContent(conteudo);
          })
          .catch((e) => {
            console.log(e);
          });
      }

      fetchData();
    }
  }, []);

  React.useEffect(() => {
    if (
      favorites !== null &&
      favorites !== undefined &&
      infos !== null &&
      infos !== null
    ) {
      console.log(favorites);
      let isFavorito = favorites.filter((item) => {
        console.log("este é um item");
        console.log(item._id);
        console.log(infos._id);
        console.log("fim do um item");
        return item._id == infos._id;
      });
      console.log("este é array de fav");
      console.log(isFavorito);
      console.log("fim do array de fav");

      if (isFavorito.length !== 0) {
        setEstaFavoritado(true);
      }
    }
  }, [favorites, infos]);

  async function adicionarAoFav(id, nome, generico, composicao_bula, url) {
    let payload = {
      _id: favoriteUserId,
      bulas_favoritas: {
        _id: id,
        nome_bula: nome,
        generico,
        composicao_bula,
        url_imagem: url,
      },
    };

    await axios
      .post("http://192.168.1.5:5000/api/favoritos/add", payload)
      .then((response) => {
        setFavorites(response.data.bulas_favoritas);
        setEstaFavoritado(true);
      });
  }

  async function removerFavoritos(id) {
    let payload = {
      _id: favoriteUserId,
      id_favorito: id,
    };

    console.log("tentando desfavoritar");

    await axios
      .post("http://192.168.1.5:5000/api/favoritos/remove", payload)
      .then((response) => {
        setFavorites(response.data.bulas_favoritas);
        setEstaFavoritado(false);
      });
  }

  if (infos === null && content === null) {
    return (
      <View style={styles.container}>
        <MiniLogo />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else if (content !== null) {
    switch (paginaAtual) {
      case "Home":
        return (
          <CurrentPageProvider>
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
                  onSubmitEditing={() => console.log(input)}
                  icon={() => (
                    <ArrowLeft width={21} height={21} color="#8B8B8B" />
                  )}
                />
                {/* Card */}
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
                    <Text style={styles.rightCardRemedio}>
                      {infos.nome_bula}
                    </Text>
                    <Text style={styles.rightCardInfo}>
                      {infos.composicao_bula}
                    </Text>
                    {estaFavoritado ? (
                      <TouchableOpacity
                        onPress={() => removerFavoritos(infos._id)}
                        style={styles.rightCardButton}
                      >
                        <Text style={styles.rightCardButtonText}>
                          DESFAVORITAR
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          adicionarAoFav(
                            infos._id,
                            infos.nome_bula,
                            infos.generico,
                            infos.composicao_bula,
                            infos.url_imagem
                          )
                        }
                        style={styles.rightCardButton}
                      >
                        <Text style={styles.rightCardButtonText}>
                          FAVORITAR
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/* Atenção */}
                <View style={styles.atencaoContainer}>
                  <Text style={styles.atencaoTitulo2}>ATENÇÃO!</Text>
                  <Text style={styles.atencaoTitulo}>
                    O dicloridrato de hidroxizina contém lactose na composição e
                    pode oferecer riscos a você.
                  </Text>
                </View>

                <View style={{ height: 180 }}>
                  <FlatList
                    data={dataFock}
                    keyExtractor={(item) => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentMenu(item.menu);
                          }}
                          style={styles.carouselContainer}
                        >
                          <Text style={styles.carouselTitle}>{item.title}</Text>
                          <Text style={styles.carouselSubTitle}>
                            {item.body}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    style={{ width: 325 }}
                  />
                </View>
                <View style={styles.sobreContainer}>
                  <Text style={styles.sobreTitulo}>Sobre o medicamento</Text>
                  <Accordion
                    activeSections={activeSections} // Seções ativas
                    sections={content} // Conteúdos
                    touchableComponent={TouchableOpacity} // Jeito do clique
                    renderHeader={accordionHeader} // Header
                    renderContent={accordionContent} // Conteúdo
                    duration={400} // Duração em milisegundos
                    onChange={setSections} // Set acordeon ativo
                  />
                </View>

                {/* Acordeon */}
              </View>
            </ScrollView>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </CurrentPageProvider>
        );
        break;

      case "ParaQue":
        return (
          <View style={styles.container}>
            <MiniLogo />
            <View style={styles.infosContainer}>
              <Text style={styles.infosTitle}>Para que serve?</Text>
              <Text style={styles.paraQueServeTexto}>
                {infos.mecanismo_bula}
              </Text>
            </View>
            <View style={{ height: 225 }}>
              <Text style={styles.carouselContainerTitle}>
                Mais informações
              </Text>
              <FlatList
                data={dataFock}
                keyExtractor={(item) => item.title}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentMenu(item.menu);
                      }}
                      style={styles.carouselContainer}
                    >
                      <Text style={styles.carouselTitle}>{item.title}</Text>
                      <Text style={styles.carouselSubTitle}>{item.body}</Text>
                    </TouchableOpacity>
                  );
                }}
                style={{ width: 325 }}
              />
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </View>
        );
        break;

      case "Funciona":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>Como funciona?</Text>
                {infos.como_usar_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "NaoUsar":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>Quando não usar?</Text>
                {infos.contraindicacoes_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "OQueSaber":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>
                  O que saber antes de tomar?
                </Text>
                {infos.cuidados_antes_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "Armazenado":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>Como deve ser armazenado?</Text>
                {infos.armazenamento_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "ComoUsar":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>Como devo usar?</Text>
                {infos.como_usar_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "Esquecer":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>
                  O que fazer quando esquecer?
                </Text>
                {infos.esqueceu_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      case "Maleficios":
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>Quais os malefícios?</Text>
                {infos.efeitos_colaterais_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;

      default:
        return (
          <ScrollView>
            <View style={styles.container}>
              <MiniLogo />
              <View style={styles.infosContainer}>
                <Text style={styles.infosTitle}>
                  O que fazer quando esquecer?
                </Text>
                {infos.superdose_bula.map((paragrafo, index) => (
                  <Text
                    key={index}
                    style={[styles.paraQueServeTexto, { marginBottom: 10 }]}
                  >
                    {paragrafo}
                  </Text>
                ))}
              </View>
              <View style={{ height: 225 }}>
                <Text style={styles.carouselContainerTitle}>
                  Mais informações
                </Text>
                <FlatList
                  data={dataFock}
                  keyExtractor={(item) => item.title}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentMenu(item.menu);
                        }}
                        style={styles.carouselContainer}
                      >
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubTitle}>{item.body}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  style={{ width: 325 }}
                />
              </View>
            </View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("Dicionario")}
            />
          </ScrollView>
        );
        break;
        break;
    }
  } else {
    return (
      <View style={styles.container}>
        <MiniLogo />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
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

  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  carouselContainerTitle: {
    marginTop: 43,
    fontSize: 21,
    fontFamily: "Lato-Bold",
    color: "#005A3B",
  },

  infosContainer: {
    width: "80%",
  },

  infosTitle: {
    fontSize: 25,
    fontFamily: "Lato-Bold",
    color: "#005A3B",
    marginTop: 28,
    marginBottom: 18,
  },

  paraQueServeTexto: {
    textAlign: "justify",
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 17,
  },

  carouselContainer: {
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

  carouselTitle: {
    color: "#FFFFFF",
    fontFamily: "Lato-Regular",
    fontSize: 18,
    paddingTop: 24,
    paddingLeft: 9,
  },

  carouselSubTitle: {
    color: "#FFFFFF",
    fontFamily: "Lato-Regular",
    fontSize: 10,
    paddingTop: 15,
    paddingBottom: 21,
    paddingLeft: 9,
  },

  header: {
    width: 303,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 5,
    marginBottom: 14,
  },

  headerActive: {
    backgroundColor: "#005A3B",
    marginBottom: 0,
  },

  headerTitle: {
    fontFamily: "Lato-Regular",
    color: "#005A3B",
    fontSize: 17,
  },

  headerTitleActive: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 19,
    paddingTop: 15,
  },

  headerSubTitle: {
    fontSize: 10,
    fontFamily: "Lato-Regular",
    color: "#8B8B8B",
  },

  headerInactive: {
    backgroundColor: "#fff",
  },

  accordionContent: {
    backgroundColor: "#008E5E",
    borderRadius: 5,
    width: 303,
    padding: 16,
    marginBottom: 14,
  },

  accordionContentText: {
    color: "#fff",
    fontFamily: "Lato-Regular",
  },

  sobreContainer: {
    width: "80%",
    elevation: 8,
  },

  sobreTitulo: {
    color: "#005A3B",
    fontSize: 21,
    fontFamily: "Lato-Regular",
    marginBottom: 11,
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

  searchbar: {
    backgroundColor: "#fff",
    marginTop: 21,
    height: 51,
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
