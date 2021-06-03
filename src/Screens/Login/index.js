import React from "react";
import axios from "axios";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Logo from "../../Logos/LogoHome";
import { useForm, Controller } from "react-hook-form";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let payload = {
      email: data.email,
      senha: data.senha,
    };

    axios
      .post("https://api-npab.herokuapp.com/api/usuarios/login", payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Alert.alert("Atenção", "Você está logado");
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Logo style={{ flex: 1 }} />
        <View style={{ flex: 4 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Insira um email para fazer login",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  mode="outlined"
                  onChangeText={(text) => onChange(text)}
                  style={{ height: 50 }}
                  value={value}
                  error={errors.email}
                  errorText={errors?.email?.message}
                  placeholder="Email"
                />
              )}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Text style={styles.label}>Senha</Text>
            <Controller
              defaultValue=""
              name="senha"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Insira sua senha para fazer login",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  mode="outlined"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  style={{ height: 50 }}
                  error={errors.senha}
                  errorText={errors?.senha?.message}
                  placeholder="Senha"
                />
              )}
            />
          </View>
          <View style={styles.buttonBox}>
            {/* <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.buttonLogin}
          > */}
            <Button onPress={handleSubmit(onSubmit)} mode="contained">
              <Text style={styles.buttonLoginText}>ENTRAR</Text>
            </Button>
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.buttonBox}>
          <Text style={{ fontSize: 16 }}>Não possui uma conta?</Text>
          <Button
            style={{ marginTop: 10, fontFamily: "Lato_700Bold" }}
            label="Cadastre-se"
            onPress={() => navigation.navigate("Cadastro")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },

  inputContainer: {
    marginTop: 77,
    width: 320,
  },

  inputContainer2: {
    marginTop: 33,
    width: 320,
    // paddingHorizontal: 20,
  },

  label: {
    color: "#005A3B",
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },

  buttonBox: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
