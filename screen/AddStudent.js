import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { colors, styles } from "../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomButton1 } from "../components/Buttons";
import FormAdd from "../components/forms/FormAdd";
import { useNavigation } from "@react-navigation/native";
import { createNewStudent } from "../database/controllers/student.controllers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_INSTITUTION } from "../components/Student/CardInstitution";
import Loading from "../components/loading/Loading";

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
  const [load, setLoad] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY_INSTITUTION).then((res) => {
      setData({ ...data, institution: res });
    });
  }, []);

  const handleSelect = (selectedItem) => {
    const genderSelect = selectedItem.toLowerCase();
    setIsGender(genderSelect);
    setData({ ...data, gender: genders[genderSelect] });
  };

  const handlePress = () => {
    setLoad(true);
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
          setLoad(false);
          navigation.navigate("Screen");
          console.log("created student");
        })
        .catch((err) => {
          console.log(err);
          setLoad(false);
        });
    } else {
      Alert.alert("Llene todos los campos requeridos");
      setLoad(false);
    }
  };

  return (
    <Loading loading={load}>
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

          <CustomButton1
            onPress={handlePress}
            title={"AÑADIR"}
            color={colors.red}
          />
        </View>
      </KeyboardAwareScrollView>
    </Loading>
  );
};

export default AddStudent;
