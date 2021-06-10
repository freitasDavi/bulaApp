import React from "react";
import axios from "axios";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput as RNInput,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { Authentication } from "../../../services/context";
import Icon from "react-native-vector-icons/Feather";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Cadastro({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [inputs, setInputs] = React.useState([{ key: "", value: "" }]);
  const [medicamentos, setMedicamentos] = React.useState([
    { key: "", value: "" },
  ]);

  const { signUp } = React.useContext(Authentication);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", value: "" });
    setInputs(_inputs);
  };

  const addHandlerMed = () => {
    const _med = [...medicamentos];
    _med.push({ key: "", value: "" });
    setMedicamentos(_med);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const deleteHandlerMed = (key) => {
    const _med = medicamentos.filter((input, index) => index != key);
    setMedicamentos(_med);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

  const medHandler = (text, key) => {
    const _med = [...medicamentos];
    _med[key].value = text;
    _med[key].key = key;
    setMedicamentos(_med);
  };

  const onSubmit = async (data) => {
    console.log(inputs);
    let alergia_usuario = [],
      medicamentos_usuario = [];

    await inputs.forEach((alergia) => {
      alergia_usuario.push(alergia.value);
    });

    await medicamentos.forEach((medicamento) => {
      medicamentos_usuario.push(medicamento.value);
    });

    let payload = {
      nome_usuario: data.name + " " + data.sobrenome,
      email_usuario: data.email,
      tipo_usuario: 1,
      senha_usuario: data.senha,
      nascimento_usuario: data.nascimento,
      alergia_usuario: alergia_usuario,
      medicamentos_usuario: medicamentos_usuario,
    };

    console.log(payload);

    let results;

    axios
      .post("https://api-npab.herokuapp.com/api/usuarios", payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("tu é bom demais maluco");
          console.log(response);
          results = response.data._id;
          signUp(results);
        }
      })
      .catch((e) => {
        console.log(`Erro ${e}`);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dados pessoais:</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome: </Text>
          <Controller
            defaultValue=""
            name="name"
            control={control}
            rules={{
              required: { value: true, message: "Name is required" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={(text) => onChange(text)}
                value={value}
                error={errors.name}
                outlineColor="#bdbdbd"
                errorText={errors?.name?.message}
                placeholder="Digite aqui seu nome"
                mode="outlined"
                placeholderTextColor="#8B8B8B"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sobrenome: </Text>
          <Controller
            defaultValue=""
            name="sobrenome"
            control={control}
            rules={{
              required: { value: true, message: "Sobrenome é necessário" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={(text) => onChange(text)}
                value={value}
                error={errors.sobrenome}
                outlineColor="#bdbdbd"
                errorText={errors?.sobrenome?.message}
                placeholder="Digite aqui seu sobrenome"
                mode="outlined"
                placeholderTextColor="#8B8B8B"
              />
            )}
          />
        </View>
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
                outlineColor="#bdbdbd"
                errorText={errors?.email?.message}
                placeholder="exemplo@exemplo.com"
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
                outlineColor="#bdbdbd"
                errorText={errors?.senha?.message}
                placeholder="senha"
                mode="outlined"
                secureTextEntry
                placeholderTextColor="#8B8B8B"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirme sua senha: </Text>

          <Controller
            defaultValue=""
            name="senhaConfirm"
            control={control}
            rules={{
              required: { value: true, message: "As senhas devem ser iguais" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={(text) => onChange(text)}
                value={value}
                error={errors.senhaConfirm}
                outlineColor="#bdbdbd"
                errorText={errors?.senhaConfirm?.message}
                placeholder="Digite sua senha novamente"
                mode="outlined"
                secureTextEntry
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
                outlineColor="#bdbdbd"
                errorText={errors?.nascimento?.message}
                placeholder="00/00/0000"
                mode="outlined"
                placeholderTextColor="#8B8B8B"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Medicamentos que faz uso contínuo:</Text>
          {medicamentos.map((medicamento, key) => (
            <View key={key} style={{ flexDirection: "row" }}>
              <RNInput
                placeholder={"Digite aqui os medicamentos"}
                value={medicamento.value}
                onChangeText={(text) => medHandler(text, key)}
                mode="outlined"
                style={styles.multipleInput}
              />
              <View style={styles.actionButtons}>
                <TouchableOpacity color="transparent" onPress={addHandlerMed}>
                  <Icon name="plus" size={30} color="#8B8B8B" />
                </TouchableOpacity>
                <TouchableOpacity
                  color="transparent"
                  onPress={() => deleteHandlerMed(key)}
                >
                  <Icon name="trash-2" size={30} color="#8B8B8B" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Descreva suas alergias e intolerâncias:
          </Text>
          {inputs.map((input, key) => (
            <View key={key} style={{ flexDirection: "row" }}>
              <RNInput
                placeholder={"Exemplo: Lactose, Dipirona...."}
                value={input.value}
                onChangeText={(text) => inputHandler(text, key)}
                mode="outlined"
                style={styles.multipleInput}
              />
              <View style={styles.actionButtons}>
                <TouchableOpacity color="transparent" onPress={addHandler}>
                  <Icon name="plus" size={30} color="#8B8B8B" />
                </TouchableOpacity>
                <TouchableOpacity
                  color="transparent"
                  onPress={() => deleteHandler(key)}
                >
                  <Icon name="trash-2" size={30} color="#8B8B8B" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonBox}>
          <Text style={styles.legendaFinal}>
            Iremos avisar quando o medicamento oferecer risco a você.
          </Text>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.botaoCadastro}
          >
            Cadastrar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#005A3B",
    fontFamily: "Lato-Bold",
    fontSize: 25,
    marginLeft: 36,
  },

  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },

  label: {
    color: "#005A3B",
    fontSize: 17,
    fontFamily: "Lato-Bold",
  },

  actionButtons: {
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: 6,
    height: 58,
    borderColor: "#8B8B8B",
    backgroundColor: "#fff",
    borderLeftWidth: 0,
  },

  multipleInput: {
    backgroundColor: "#fff",
    height: 58,
    marginTop: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderColor: "#8B8B8B",
    borderWidth: 1,
    borderRightWidth: 0,
    flex: 3,
    paddingLeft: 12,
  },

  botaoCadastro: {
    width: 180,
    height: 50,
    justifyContent: "center",
  },

  buttonBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  legendaFinal: {
    color: "#8B8B8B",
    fontSize: 10,
    fontFamily: "Lato-Regular",
    marginBottom: 20,
  },
});
