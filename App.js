import React from "react";
import * as Font from "expo-font";
import axios from "axios";
import Login from "./src/Screens/Login";
import { ActivityIndicator, View } from "react-native";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Authentication } from "./services/context";
import Tabs from "./src/Screens/navigation/tab";
import Cadastro from "./src/Screens/Cadastro";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const initialLoginState = {
    isLoading: true,
    userName: null,
    usertoken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password, userId) => {
        let userToken;
        userToken = null;

        let favoritesId,
          firstPair = [],
          secondPair = ["userToken", userId],
          thirdPair = [];
        // Match the api
        userToken = "JWT";

        let payload = {
          id_usuario: userId,
        };

        await axios
          .post("https://api-npab.herokuapp.com/api/favoritos/login", payload)
          .then((response) => {
            firstPair = ["favoriteId", response.data._id];
          })
          .catch((e) => {
            console.log(e);
          });

        await axios
          .post("https://api-npab.herokuapp.com/api/alarmes/login", payload)
          .then((response) => {
            thirdPair = ["alarmId", response.data._id];
          })
          .catch((e) => {
            console.log(e);
          });

        try {
          console.log(firstPair);
          console.log(secondPair);
          console.log(thirdPair);

          await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {}
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (userId) => {
        let userToken;
        userToken = "JWT";
        let payload = {
          id_usuario: userId,
        };
        let firstPair = [],
          fourthPair = [];

        await axios
          .post("https://api-npab.herokuapp.com/api/favoritos", payload)
          .then((response) => {
            if (response.status === 200) {
              firstPair = ["favoriteId", response.data._id];
            }
          });

        await axios
          .post("https://api-npab.herokuapp.com/api/alarmes", payload)
          .then((response) => {
            if (response.status === 200) {
              fourthPair = ["alarmId", response.data._id];
            }
          });

        let secondPair = ["userToken", userToken];
        let thirdPair = ["userId", userId];

        try {
          await AsyncStorage.multiSet([
            firstPair,
            secondPair,
            thirdPair,
            fourthPair,
          ]);
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "REGISTER", id: userId, token: userToken });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (!loaded || loginState.isLoading === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <Authentication.Provider value={authContext}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          {loginState.userToken !== null ? (
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="HomePage" component={Tabs} />
            </AuthStack.Navigator>
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen name="Login" component={Login} />
              <AuthStack.Screen name="Cadastro" component={Cadastro} />
            </AuthStack.Navigator>
          )}
        </PaperProvider>
      </NavigationContainer>
    </Authentication.Provider>
  );
}
