import React from "react";
import axios from "axios";
import MiniLogo from "../../Logos/AlternateLogo";
import { TextInput, Button } from "react-native-paper";
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const HOURREGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export default function CreateAlarm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let payload = {
      email_usuario: data.email,
      nascimento_usuario: data.nascimento_usuario,
      senha_usuario: data.senha,
      alergia_usuario: data.alergia,
    };

    axios
      .put("https://api-npab.herokuapp.com/api/usuarios", payload)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          setValue("email", data.email_usuario);
          setValue("senha", data.senha_usuario);
          setValue("alergias", data.alergia_usuario);
          setValue("nascimento", data.nascimento_usuario);
        }
      })
      .catch((e) => {
        console.log(`Erro ${e}`);
      });
  };

  const handleDelete = () => {
    console.log("Deletou");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <MiniLogo />
        <View style={styles.alarmesAtivos}>
          <Text style={styles.tituloAlarme}>Novo lembrete</Text>

          <View style={styles.formsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do medicamento: </Text>
              <Controller
                defaultValue=""
                name="medicamento"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Nome do medicamento é obrigatório",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    error={errors.medicamento}
                    errorText={errors?.medicamento?.message}
                    placeholder="Digite aqui o medicamento"
                    mode="outlined"
                    placeholderTextColor="#8B8B8B"
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantos dias de tratamento: </Text>
              <Controller
                defaultValue=""
                name="dias"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "O número de dias é obrigatório",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    error={errors.dias}
                    errorText={errors?.dias?.message}
                    placeholder="Número de dias"
                    mode="outlined"
                    placeholderTextColor="#8B8B8B"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantos horas de intervalo : </Text>
              <Controller
                defaultValue=""
                name="intervalo"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "O intervalo de horas é necessário",
                  },
                  pattern: {
                    value: HOURREGEX,
                    message: "Not a valid email",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    error={errors.intervalo}
                    errorText={errors?.intervalo?.message}
                    placeholder="08 horas"
                    mode="outlined"
                    placeholderTextColor="#8B8B8B"
                    keyboardType="number-pad"
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Horário inicial: </Text>
              <Controller
                defaultValue=""
                name="horarioInicial"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "É necessário definir um horário inicial",
                  },
                  pattern: {
                    value: HOURREGEX,
                    message: "Hora inválida",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    error={errors.horarioInicial}
                    errorText={errors?.horarioInicial?.message}
                    placeholder="08:00"
                    mode="outlined"
                    placeholderTextColor="#8B8B8B"
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número de comprimidos diários: </Text>
              <Controller
                defaultValue=""
                name="horarioInicial"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "É necessário informar um número de comprimidos",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    error={errors.horarioInicial}
                    errorText={errors?.horarioInicial?.message}
                    placeholder="Número de comprimidos"
                    mode="outlined"
                    placeholderTextColor="#8B8B8B"
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => handleDelete()}
              mode="contained"
              style={styles.botaoCadastro2}
            >
              <Text style={styles.buttonLabel}>EXCLUIR</Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.botaoCadastro}
            >
              <Text style={styles.buttonLabel}>SALVAR</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 29,
  },

  alarmesAtivos: {
    width: "80%",
    margin: 33,
    justifyContent: "flex-start",
  },

  tituloAlarme: {
    color: "#005A3B",
    fontSize: 25,
    fontFamily: "Lato-Bold",
  },

  inputContainer: {
    marginTop: 20,
  },

  label: {
    color: "#005A3B",
    fontSize: 17,
    fontFamily: "Lato-Bold",
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  botaoCadastro: {
    width: 147,
    height: 36,
    justifyContent: "center",
  },

  botaoCadastro2: {
    width: 147,
    height: 36,
    justifyContent: "center",
    backgroundColor: "#F37F7F",
  },

  buttonLabel: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Lato-Regular",
  },
});
