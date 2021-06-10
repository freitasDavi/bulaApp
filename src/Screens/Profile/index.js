import React from "react";
import MiniLogo from "../../Logos/AlternateLogo";
import { useForm, Controller } from "react-hook-form";
import { Text, Button, Avatar, TextInput } from "react-native-paper";
import { Authentication } from "../../../services/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import axios from "axios";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(Authentication);
  const [data, setData] = React.useState();
  const [userId, setUserId] = React.useState();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function handleLogOut() {
    signOut();
  }

  React.useEffect(() => {
    try {
      async function fetchData() {
        teste = await AsyncStorage.getItem("userId");

        if (teste !== undefined) {
          setUserId(teste);
        }
      }

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    if (userId) {
      axios
        .get(`http://192.168.1.5:5000/api/usuarios/details/${userId}`)
        .then((response) => {
          console.log(response.data);
          setValue("email", response.data.email_usuario);
          setValue("senha", "password");
          console.log(response.data.alergia_usuario);
          setValue("alergias", response.data.alergia_usuario.join());
          setValue("nascimento", response.data.nascimento_usuario);
          setData(response.data);
        });
    }
  }, [userId]);

  const onSubmit = async (data) => {
    let payload = {
      _id: userId,
      email_usuario: data.email,
      nascimento_usuario: data.nascimento_usuario,
      senha_usuario: data.senha,
      alergia_usuario: data.alergias.split(),
    };

    axios
      .put("http://192.168.1.5:5000/api/usuarios", payload)
      .then((response) => {
        if (response.status === 200) {
          let dataItem = response.data;

          console.log(dataItem);
          setData(dataItem);
        }
      })
      .catch((e) => {
        console.log(`Erro ${e}`);
      });
  };

  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <View style={{ marginTop: 29 }}>
          <MiniLogo />
        </View>
        <View style={styles.userContainer}>
          <Avatar.Text
            size={78}
            label="DF"
            color="#005A3B"
            style={{ backgroundColor: "#008E5E" }}
          />
          <Text style={styles.userContainerLabel}>Davi Freitas</Text>
        </View>

        <View style={styles.formsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail: </Text>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                required: { value: true, message: "Email é obrigatório" },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Not a valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  error={errors.email}
                  errorText={errors?.email?.message}
                  // disabled={true}
                  placeholder="exemplo@exemplo.com"
                  mode="outlined"
                  placeholderTextColor="#8B8B8B"
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de nascimento:</Text>

            <Controller
              defaultValue=""
              name="nascimento"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  error={errors.nascimento}
                  errorText={errors?.nascimento?.message}
                  placeholder="00/00/0000"
                  mode="outlined"
                  placeholderTextColor="#8B8B8B"
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha: </Text>

            <Controller
              defaultValue=""
              name="senha"
              control={control}
              rules={{
                required: { value: true, message: "Password is required" },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  error={errors.senha}
                  errorText={errors?.senha?.message}
                  placeholder="senha"
                  disabled={true}
                  mode="outlined"
                  placeholderTextColor="#8B8B8B"
                  secureTextEntry
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Alergias e intolerâncias:</Text>

            <Controller
              defaultValue=""
              name="alergias"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  error={errors.alergias}
                  errorText={errors?.alergias?.message}
                  placeholder="Penicilina, Ibuprofeno, Aspirina, lactose."
                  mode="outlined"
                  placeholderTextColor="#8B8B8B"
                />
              )}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => handleLogOut()}
            mode="contained"
            style={styles.botaoCadastro2}
          >
            <Text style={{ color: "#fff" }}>Logout</Text>
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.botaoCadastro}
          >
            <Text style={{ color: "#fff" }}>Salvar</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    flexDirection: "column",
  },

  userContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 49,
    alignItems: "center",
    flex: 1,
  },

  userContainerLabel: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 30,
    marginLeft: 15,
  },

  inputContainer: {
    marginTop: 20,
  },

  label: {
    color: "#005A3B",
    fontSize: 17,
    fontFamily: "Lato-Bold",
  },

  formsContainer: {
    marginTop: 30,
    width: "80%",
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  botaoCadastro: {
    width: 90,
    height: 30,
    justifyContent: "center",
  },

  botaoCadastro2: {
    width: 100,
    height: 30,
    justifyContent: "center",
  },
});
