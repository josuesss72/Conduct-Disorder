import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "../styles/globalStyles";
import { CustomButton1 } from "../components/Buttons";
import { registerNewUser } from "../database/controllers/user.controllers";

const FormUserInfoScreen = ({ setIsLogin, userCredent }) => {
  const [formData, setFormData] = useState({
    institution: "",
    grade: "",
    iphone: "",
    subject: "",
  });

  const handleChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };

  const handlePress = async () => {
    await registerNewUser({
      name: userCredent.displayName ? userCredent.displayName.toLowerCase() : null,
      uid: userCredent.uid,
      email: userCredent.email,
      iphone: formData.iphone,
      grade: formData.grade?.toLowerCase(),
      subject: formData.subject?.toLowerCase(),
      institution: formData.institution?.toLowerCase(),
      profilePicture: userCredent.photoURL,
    });
    setIsLogin({process: true, login: true})
  };

  return (
    <ScrollView style={{ ...styles.body, ...styles.container }}>
      <View
        style={{
          gap: 15,
          justifyContent: "center",
          ...styles.box,
          marginVertical: "25%",
        }}
      >
        <Text style={{ fontSize: 40 }}>Ingresa los Datos</Text>
        <View style={styles.boxInput}>
          <Text style={styles.text1}>🏫 Institucion</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "institution")}
            style={styles.text_input}
          ></TextInput>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.text1}>🚪 Grado</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "grade")}
            style={styles.text_input}
          ></TextInput>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.text1}>📱 Telefono</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "iphone")}
            style={styles.text_input}
          ></TextInput>
        </View>
        <View style={styles.boxInput}>
          <Text style={styles.text1}>📘 Asignatura</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "subject")}
            style={styles.text_input}
          ></TextInput>
        </View>

        <View style={{ ...styles.buttonGroup}}>
          <Button onPress={handlePress} title='Guardar' color={"white"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default FormUserInfoScreen;
