import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";
import { Authentication } from "../../../services/context";

export default function Profile() {
  const { signOut } = React.useContext(Authentication);

  function handleLogOut() {
    signOut();
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.userContainer}>
        <Avatar.Text
          size={78}
          label="DF"
          color="#005A3B"
          style={{ backgroundColor: "#008E5E" }}
        />
        <Text style={styles.userContainerLabel}>Davi Freitas</Text>
      </View>
      <Button onPress={() => handleLogOut()} mode="contained">
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
  },

  userContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 100,
    alignItems: "center",
  },

  userContainerLabel: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 25,
    marginLeft: 15,
  },
});
