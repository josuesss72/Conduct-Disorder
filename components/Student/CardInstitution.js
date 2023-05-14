import React from "react";
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { styles } from "../../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteInstitution } from "../../database/controllers/intitution.controllers";

export const KEY_INSTITUTION = "@intitution";

const CardInstitution = ({
  institution,
  navigation,
  setIsDelete,
  isDelete,
}) => {
  const handlePress = async () => {
    await AsyncStorage.setItem(KEY_INSTITUTION, institution?.name);
    navigation.navigate("StudentView");
  };

  const onDelete = () => {
    deleteInstitution(institution.id);
    setIsDelete(!isDelete);
  };

  return (
    <View style={{ ...stylesInstitution.box }}>
      <Text onPress={onDelete}>➖</Text>
      <Text style={{ ...styles.text1 }}>{institution?.name}</Text>
      <Text onPress={handlePress} style={{ ...stylesInstitution.emoji }}>
        ➡
      </Text>
    </View>
  );
};

const stylesInstitution = StyleSheet.create({
  box: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emoji: {
    fontSize: 20,
  },
});

export default CardInstitution;
