import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { Authentication } from "../../../services/context";

export default function Profile() {
  const { signOut } = React.useContext(Authentication);

  function handleLogOut() {
    signOut();
  }

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={() => handleLogOut()} mode="contained">
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
