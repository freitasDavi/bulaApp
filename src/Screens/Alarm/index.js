import React from "react";
import { ScrollView, View, StatusBar, StyleSheet } from "react-native";
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
          .post("http://192.168.1.5:5000/api/alarmes/listar", payload)
          .then((response) => {
            x = response.data;
            if (x !== null) {
              // let intervaloHoras = parseInt(x.alarmes[0].intervalor_horas);
              // let numeroDeVezes = Math.round(24 / intervaloHoras);
              // let horarios = [];

              // console.log();
              // for (let y = numeroDeVezes; y >= 1; y--) {
              //   let hora = Math.round(24 / y);
              //   horarios.push(hora);
              // }

              // setTimeout(() => {
              // console.log(horarios);

              setAlarms(x);
              // }, 1000);
            }
          });
      }

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (alarms === null || alarms.length !== 0) {
    return (
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
                <View style={{ marginBottom: 40 }} key={item.id_alarme}>
                  <View style={styles.horariosAlarme}>
                    <Text style={styles.horarios}>
                      {Math.round(24 / item.intervalor_horas)}h |{" "}
                      {Math.round(24 / item.intervalor_horas) +
                        item.intervalor_horas +
                        "h |"}{" "}
                      1:00h
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
                        Quantidade: {Math.round(24 / item.intervalor_horas)}x ao
                        dia
                      </Text>
                    </View>
                  </View>
                </View>
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
