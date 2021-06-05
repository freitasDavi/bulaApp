import React from "react";
import * as Font from "expo-font";
import Login from "./src/Screens/Login";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./src/Screens/navigation/tab";

let customFonts = {
  "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
  "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),
};

const fontConfig = {
  default: {
    regular: {
      fontFamily: "Lato-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Lato-Bold",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "Lato-Black",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Lato-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Lato-Thin",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: "#005A3B",
    accent: "#008E5E",
    background: "#FFFFFF",
    surface: "#008E5E",
    text: "#005A3B",
    backdrop: "#FF0000",
  },
};

const AuthStack = createStackNavigator();

export default function App() {
  const [loaded] = Font.useFonts(customFonts);
  const [userToken, setUserToken] = React.useState("sdag");

  if (!loaded) {
    return <Text>Carregando...</Text>;
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        {userToken ? (
          <AuthStack.Navigator>
            <AuthStack.Screen name="HomePage" component={Tabs} />
          </AuthStack.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
          </AuthStack.Navigator>
        )}
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 150,
  },
});
