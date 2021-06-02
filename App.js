import React from 'react';
import * as Font from 'expo-font';
import Logo from './src/Logos/LogoHome';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

let customFonts = {
  "Lato-Black": require('./assets/fonts/Lato Black.ttf'),
  "Lato-Regular": require('./assets/fonts/Lato Regular.ttf'),
  "Lato-Bold": require('./assets/fonts/Lato-Bold.ttf'),
  "Lato-Light": require('./assets/fonts/Lato-Light.ttf'),
  "Lato-Thin": require('./assets/fonts/Lato-Thin.ttf'),
};

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'Lato-Black',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Lato-Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Lato-Thin',
      fontWeight: 'normal'
    }
  }
};

const theme = {
  ...DefaultTheme,
  roundness: 30,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#0d80d6',
    accent: '#e68fae',
    background: '#c6e1f2'
  }
};

export default async function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    Font.loadAsync(customFonts);
    // cara, tens que setar o estado de algum jeito, da teus pulo
  }, [])

  if(fontsLoaded === false){
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={{ fontFamily: "Lato-Black" }} >Salve</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
