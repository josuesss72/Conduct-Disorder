import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "../../styles/globalStyles";

const FormAdd = ({ setData, data }) => {
  const handleChangeText = (text, name) => {
    setData({ ...data, [name]: text });
  };

  return (
    <View style={{ gap: 20 }}>
      <TextInput
        onChangeText={(text) => handleChangeText(text, "name")}
        style={{ ...styles.text_input }}
        placeholder="Nombre"
      />
      <TextInput
        onChangeText={(text) => handleChangeText(text, "lastName")}
        style={{ ...styles.text_input }}
        placeholder="Apellido"
      />
      <TextInput
        onChangeText={(text) => handleChangeText(text, "age")}
        style={{ ...styles.text_input }}
        placeholder="Edad"
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={(text) => handleChangeText(text, "institution")}
        style={{ ...styles.text_input }}
        placeholder="Institucion"
      />
      <TextInput
        onChangeText={(text) => handleChangeText(text, "grade")}
        style={{ ...styles.text_input }}
        placeholder="Grado"
      />
      <TextInput
        onChangeText={(text) => handleChangeText(text, "note")}
        style={{ ...styles.text_input }}
        placeholder="Descripcion"
      />
    </View>
  );
};

export default FormAdd;
