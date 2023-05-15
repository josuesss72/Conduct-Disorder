import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "../styles/globalStyles";
import { registerNewUser } from "../database/controllers/user.controllers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../components/loading/Loading";

const FormUserInfoScreen = ({ setIsLogin, userCredent }) => {
  const [formData, setFormData] = useState({
    iphone: "",
    subject: "",
    name: "",
  });
  const [load, setLoad] = useState(false);

  const handleChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };

  const handlePress = async () => {
    setLoad(true);
    await registerNewUser({
      name: formData.name.toLowerCase().trim(),
      uid: userCredent?.uid,
      email: userCredent.email.toLowerCase().trim(),
      iphone: formData.iphone.trim(),
      subject: formData.subject.toLowerCase().trim(),
      profilePicture: userCredent.photoURL,
      createdAt: new Date(),
    })
      .then(() => setLoad(false))
      .catch((err) => Alert.alert(err));
    setIsLogin({ process: true, login: true });
  };

  return (
    <Loading loading={load}>
      <KeyboardAwareScrollView
        style={{
          ...styles.body,
          ...styles.container,
          backgroundColor: "#6DA9E4",
        }}
      >
        <View
          style={{
            gap: 15,
            justifyContent: "center",
            ...styles.box,
            marginVertical: "30%",
          }}
        >
          <Text style={{ fontSize: 40 }}>Ingresa los Datos</Text>
          <View style={styles.boxInput}>
            <Text style={styles.text1}>
              🖊 Nombre Completo (Nombre, Apellido)
            </Text>
            <TextInput
              onChangeText={(text) => handleChange(text, "name")}
              style={styles.text_input}
            ></TextInput>
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.text1}>📱 Telefono</Text>
            <TextInput
              onChangeText={(text) => handleChange(text, "iphone")}
              style={styles.text_input}
              keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.text1}>📘 Asignatura</Text>
            <TextInput
              onChangeText={(text) => handleChange(text, "subject")}
              style={styles.text_input}
            ></TextInput>
          </View>

          <View style={{ ...styles.buttonGroup }}>
            <Button onPress={handlePress} title="Guardar" color={"white"} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Loading>
  );
};

export default FormUserInfoScreen;
