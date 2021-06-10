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
  const [dados, setDados] = React.useState(null);
  const [iniciais, setIniciais] = React.useState("");
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
        .get(`https://api-npab.herokuapp.com/api/usuarios/details/${userId}`)
        .then((response) => {
          setValue("email", response.data.email_usuario);
          setValue("senha", "password");
          setValue("alergias", response.data.alergia_usuario.join());
          setValue("nascimento", response.data.nascimento_usuario);
          console.log(response.data.nome_usuario);
          let splitWords = response.data.nome_usuario.split(' '),
              letIniciais = splitWords[0][0]+splitWords[1][0];

          setIniciais(letIniciais);
          setDados(response.data);
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
      .put("https://api-npab.herokuapp.com/api/usuarios", payload)
      .then((response) => {
        if (response.status === 200) {
          let dataItem = response.data;

          console.log(dataItem);
          setDados(dataItem);
        }
      })
      .catch((e) => {
        console.log(`Erro ${e}`);
      });
  };

  if(dados === null) {
    return (
      <ScrollView>
      <View style={styles.outerContainer}>
        <View style={{ marginTop: 29 }}>
          <MiniLogo />
        </View>
        </View>
        </ScrollView>
    )
  } else {
    return (
      <ScrollView>
        <View style={styles.outerContainer}>
          <View style={{ marginTop: 29 }}>
            <MiniLogo />
          </View>
          <View style={styles.userContainer}>
            <Avatar.Text
              size={78}
              label={iniciais}
              color="#005A3B"
              style={{ backgroundColor: "#008E5E" }}
            />
            <Text style={styles.userContainerLabel}>{dados.nome_usuario}</Text>
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
                    outlineColor="#bdbdbd"
                    style={styles.textInput}
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
                    outlineColor="#bdbdbd"
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
                    outlineColor="#bdbdbd"
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
                    outlineColor="#bdbdbd"
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
              <Text style={{ color: "#005A3B", fontSize: 13 }}>SAIR DA CONTA</Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.botaoCadastro}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>SALVAR</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    flexDirection: "column",
  },

  textInput: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
    width: 147,
    height: 36,
    justifyContent: "center",
    backgroundColor: "#008E5E",
    borderColor: "#005A3B"
  },

  botaoCadastro2: {
    width: 147,
    height: 36,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#005A3B"
  },
});
