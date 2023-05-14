import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { KEY_INSTITUTION } from "../components/Student/CardInstitution";
import CardStudent from "../components/Student/CardStudent";
import { getStudents } from "../database/controllers/student.controllers";
import { styles } from "../styles/globalStyles";

const StudentView = ({ userCredent }) => {
  const [students, setStudents] = useState([]);
  const [render, setRender] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="➕" onPress={() => navigation.navigate("Add")} />
      ),
    });
  }, []);

  useEffect(() => {
    getAllStudent();
  }, [render]);

  const getAllStudent = async () => {
    const value = await AsyncStorage.getItem(KEY_INSTITUTION);
    getStudents(userCredent.uid, value)
      .then((res) => {
        setStudents(res.filter((item) => item !== undefined));
      })
      .catch((err) => console.error(err));
  };

  return (
    <ScrollView style={{ ...styles.container }}>
      <View>
        {students.map((student) => (
          <CardStudent
            key={student.id}
            student={student}
            render={render}
            setRender={setRender}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default StudentView;
