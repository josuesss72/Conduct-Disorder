import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { CustomButton1 } from "../components/Buttons";
import { postNewInstition } from "../database/controllers/intitution.controllers";
import { colors, styles } from "../styles/globalStyles";

const AddIntitution = ({
  userCredent,
  setIsAddInstitution,
  isAddIntitution,
}) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");

  const handlePress = () => {
    postNewInstition({
      name,
      userUid: userCredent.uid,
      createdAt: new Date(),
    })
      .then(() => {
        setIsAddInstitution(!isAddIntitution);
        navigation.navigate("Screen");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ ...stylesAddIntitution.container }}>
      <View style={{ ...stylesAddIntitution.shadow }}>
        <View style={{ ...stylesAddIntitution.box }}>
          <View style={{ ...stylesAddIntitution.header }}>
            <Text style={{ ...styles.subtitle }}>Nueva Intitucion</Text>
            <Button title="✖" onPress={() => navigation.navigate("Screen")} />
          </View>
          <View style={{ marginTop: "auto", marginBottom: "auto" }}>
            <TextInput
              onChangeText={(text) => setName(text)}
              style={{ ...styles.text_input }}
              placeholder="nombre"
            />
          </View>
          <CustomButton1
            onPress={handlePress}
            title={"Guardar"}
            color={colors.red}
          />
        </View>
      </View>
    </View>
  );
};

const stylesAddIntitution = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    height: "100%",
  },
  box: {
    backgroundColor: colors.white,
    height: "97%",
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shadow: {
    backgroundColor: colors.red,
    borderRadius: 10,
    height: 210,
  },
});

export default AddIntitution;
