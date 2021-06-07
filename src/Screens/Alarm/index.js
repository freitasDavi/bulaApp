import React from "react";
import { ScrollView, View, StatusBar, StyleSheet } from "react-native";
import { Text, FAB } from "react-native-paper";
import MiniLogo from "../../Logos/AlternateLogo";

export default function Alarm({ navigation }) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <MiniLogo />

          <View style={styles.alarmesAtivos}>
            <Text style={styles.tituloAlarme}>Lembretes ativos</Text>
            {/* Aqui que vai o loop */}
            <View style={{ marginBottom: 40 }}>
              <View style={styles.horariosAlarme}>
                <Text style={styles.horarios}>9:00h | 17:00h | 1:00h</Text>
                <Text style={styles.quantasHoras}>8 em 8 horas</Text>
              </View>
              <View style={styles.infosRemedio}>
                <View style={styles.infosRemedioLeft}>
                  <Text style={styles.infosRemedioLeftText}>Amoxicilina</Text>
                </View>
                <View style={styles.infosRemedioRight}>
                  <Text style={styles.infosRemedioRightText}>
                    Duração: 7 dias
                  </Text>
                  <Text style={styles.infosRemedioRightText}>
                    Quantidade: 3x ao dia
                  </Text>
                </View>
              </View>
            </View>
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
