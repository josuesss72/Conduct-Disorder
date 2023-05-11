import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomButton1 } from "../components/Buttons";
import FormAdd from "../components/forms/FormAdd";
import { useNavigation } from "@react-navigation/native";
import { createNewStudent } from "../database/controllers/student.controllers";

const options = ["hombre", "mujer"];
const genders = {
  hombre: "👨‍🎓",
  mujer: "👩‍🎓",
};

const AddStudent = ({ userCredent, setIsAddStudent, isAddStudent }) => {
  const navigation = useNavigation();
  const [isGender, setIsGender] = useState("hombre");
  const [data, setData] = useState({
    name: "",
    lastName: "",
    age: "",
    institution: "",
    grade: "",
    note: "",
    gender: "",
    userUid: userCredent.uid,
    createdAt: new Date(),
  });

  const handleSelect = (selectedItem) => {
    const genderSelect = selectedItem.toLowerCase();
    setIsGender(genderSelect);
    setData({ ...data, gender: genders[genderSelect] });
  };

  const handlePress = () => {
    let isRequired = false;
    for (const key in data) {
      if (data[key] === "") {
        isRequired = true;
        break;
      } else {
        isRequired = false;
      }
    }
    if (!isRequired) {
      createNewStudent(data)
        .then(() => {
          setIsAddStudent(!isAddStudent);
          navigation.navigate("Screen");
          console.log("created student");
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Llene todos los campos requeridos");
    }
  };

  return (
    <KeyboardAwareScrollView style={{ ...styles.container }}>
      <View style={{ gap: 30, paddingBottom: 50 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.emoji }}>{genders[isGender]}</Text>
          <SelectDropdown
            data={options}
            onSelect={handleSelect}
            selectedRowStyle={{ backgroundColor: "blue" }}
            buttonStyle={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#9BA4B5",
            }}
          />
        </View>

        <FormAdd data={data} setData={setData} />

        <CustomButton1 onPress={handlePress} title={"Add"} color="#F7A4A4" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddStudent;
