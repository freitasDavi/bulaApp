import React from "react";
import * as Font from "expo-font";
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
      signIn: async (userName, password) => {
        let userToken;
        userToken = null;

        if (userName == "1@gmail.com" && password == 1) {
          // Match the api
          userToken = "JWT";
          try {
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {}
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (userName) => {
        let userToken;
        userToken = "JWT";

        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "REGISTER", id: userName, token: usertoken });
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
            <AuthStack.Navigator>
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
