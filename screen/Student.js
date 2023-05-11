import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
import { Text, View } from "react-native";
import CardStudent from "../components/Student/CardStudent";
import { getStudents } from "../database/controllers/student.controllers";
import { colors, styles } from "../styles/globalStyles";
import AddStudent from "./AddStudent";

const Stack = createStackNavigator();

const MyStack = ({ userCredent }) => {
  const [isAddStudent, setIsAddStudent] = useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Screen"
        options={{
          title: "ESTUDIANTES",
          headerStyle: {
            backgroundColor: colors.red,
          },
          headerTintColor: colors.white,
        }}
        children={() => (
          <Screen userCredent={userCredent} isAddStudent={isAddStudent} />
        )}
      />
      <Stack.Screen
        name="Add"
        options={{ presentation: "modal" }}
        children={() => (
          <AddStudent
            userCredent={userCredent}
            setIsAddStudent={setIsAddStudent}
            isAddStudent={isAddStudent}
          />
        )}
      />
    </Stack.Navigator>
  );
};

const Screen = ({ userCredent, isAddStudent }) => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Add")} title="➕" />
      ),
    });
  }, []);

  useEffect(() => {
    getStudents(userCredent.uid)
      .then((res) => setStudents(res))
      .catch((err) => console.error(err));
  }, [isAddStudent]);

  return (
    <ScrollView style={{ ...styles.container }}>
      <View style={{ gap: 25 }}>
        {students.map((student) => (
          <CardStudent key={student.id} student={student} />
        ))}
      </View>
    </ScrollView>
  );
};

const StudentScreen = ({ userCredent }) => {
  return (
    <NavigationContainer independent={true}>
      <MyStack userCredent={userCredent} />
    </NavigationContainer>
  );
};

export default StudentScreen;
