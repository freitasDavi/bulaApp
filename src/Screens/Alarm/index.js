import React from "react";
import { ScrollView, View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Text, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MiniLogo from "../../Logos/AlternateLogo";
import axios from "axios";

export default function Alarm({ navigation }) {
  const [alarms, setAlarms] = React.useState(null);
  const [alarmUserId, setAlarmUserId] = React.useState(null);

  React.useEffect(() => {
    try {
      async function fetchData() {
        alarmId = await AsyncStorage.getItem("alarmId");

        setAlarmUserId(alarmUserId);

        console.log(`Esse é o valor de alarme${alarmId}`);

        let payload = {
          _id: alarmId,
        };

        await axios
          .post("https://api-npab.herokuapp.com/api/alarmes/listar", payload)
          .then((response) => {
            x = response.data.alarmes;
            if (x !== null) {
              console.log(x);

              setAlarms(x);
            }
          });
      }

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const visualizarAlarme = async (item) => {
    navigation.navigate("Alarm", {
      screen: "ViewAlarm",
      params: {
        item: item,
      },
    });
  }

  if (alarms === null) {
    return (
      <View style={{ height: "100%" }}>
        <ScrollView>
          <View style={styles.container}>
            <MiniLogo />

            <View style={styles.alarmesAtivos}>
              <Text style={styles.tituloAlarme}>Lembretes ativos</Text>
              <Text
                style={{
                  color: "#005A3B",
                  fontFamily: "Lato-Regular",
                  fontSize: 17,
                  marginTop: 8,
                }}
              >
                Você não possui alarmes ativos
              </Text>
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("CreateAlarm")}
        />
      </View>
    );
  } else {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <MiniLogo />

            <View style={styles.alarmesAtivos}>
              <Text style={styles.tituloAlarme}>Lembretes ativos</Text>
              {/* Aqui que vai o loop */}
              {alarms.map((item) => (
                <TouchableOpacity key={item._id} onPress={() => visualizarAlarme(item)}>
                  <View style={{ marginBottom: 40 }} >
                    <View style={styles.horariosAlarme}>
                      <Text style={styles.horarios}>
                        {item.horario_inicial}h |{" "}
                        {parseInt(item.horario_inicial) + parseInt(item.intervalor_horas)}"h |{" "}
                        {parseInt(item.horario_inicial) + (parseInt(item.intervalor_horas)) * 2} 
                      </Text>
                      <Text style={styles.quantasHoras}>
                        {item.intervalor_horas} em {item.intervalor_horas} horas
                      </Text>
                    </View>
                    <View style={styles.infosRemedio}>
                      <View style={styles.infosRemedioLeft}>
                        <Text style={styles.infosRemedioLeftText}>
                          {item.nome_medicamento}
                        </Text>
                      </View>
                      <View style={styles.infosRemedioRight}>
                        <Text style={styles.infosRemedioRightText}>
                          Duração: {item.dias_tratamento} dias
                        </Text>
                        <Text style={styles.infosRemedioRightText}>
                          Quantidade: {Math.round(24 / parseInt(item.intervalor_horas))}x ao
                          dia
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              {/* Fim do loop */}
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("CreateAlarm")}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 29,
  },

  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  alarmesAtivos: {
    width: "80%",
    margin: 33,
    justifyContent: "flex-start",
  },

  tituloAlarme: {
    color: "#005A3B",
    fontSize: 25,
    fontFamily: "Lato-Bold",
    marginBottom: 34,
  },

  horariosAlarme: {
    backgroundColor: "#008E5E",
    borderRadius: 5,
    height: 63,
    justifyContent: "center",
    alignItems: "center",
  },

  horarios: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 17,
  },

  quantasHoras: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 13,
    marginTop: 3,
  },

  infosRemedio: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 5,
  },

  infosRemedioLeft: {
    paddingVertical: 22,
    paddingHorizontal: 12,
  },

  infosRemedioLeftText: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 21,
  },

  infosRemedioRight: {
    paddingVertical: 18,
    paddingHorizontal: 21,
  },

  infosRemedioRightText: {
    color: "#8B8B8B",
    fontFamily: "Lato-Regular",
    fontSize: 13,
  },
});
