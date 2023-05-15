import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
import { Text, View } from "react-native";
import CardInstitution from "../components/Student/CardInstitution";
import { getInstitution } from "../database/controllers/intitution.controllers";
import { colors, styles } from "../styles/globalStyles";
import AddIntitution from "./AddIntitution";
import AddStudent from "./AddStudent";
import Assess from "./Assess";
import StudentView from "./StudentView";

const Stack = createStackNavigator();

const MyStack = ({ userCredent }) => {
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [isAddIntitution, setIsAddInstitution] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Screen"
        options={{
          title: "INSTITUCIONES",
          headerStyle: {
            backgroundColor: colors.red,
          },
          headerTintColor: colors.white,
        }}
        children={() => (
          <Screen userCredent={userCredent} isAddIntitution={isAddIntitution} />
        )}
      />
      <Stack.Screen
        name="AddIntitution"
        children={() => (
          <AddIntitution
            userCredent={userCredent}
            setIsAddInstitution={setIsAddInstitution}
            isAddIntitution={isAddIntitution}
          />
        )}
        options={{ presentation: "transparentModal", headerShown: false }}
      />
      <Stack.Screen
        name="StudentView"
        children={() => <StudentView userCredent={userCredent} />}
        options={{
          title: "ESTUDIANTES",
          headerStyle: {
            backgroundColor: colors.red,
          },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="Add"
        options={{
          presentation: "modal",
          title: "NUEVO ESTUDIANTE",
          headerStyle: {
            backgroundColor: colors.red,
          },
          headerTintColor: colors.white,
        }}
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

const Screen = ({ userCredent, isAddIntitution }) => {
  const navigation = useNavigation();
  const [institutions, setInstitutions] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("AddIntitution")}
          title="➕"
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (userCredent) {
      getInstitution(userCredent.uid)
        .then((res) => {
          setInstitutions(res.filter((item) => item !== undefined));
        })
        .catch((err) => console.log(err));
    }
  }, [isAddIntitution, isDelete]);

  return (
    <ScrollView style={{ ...styles.container }}>
      <View style={{ gap: 25 }}>
        {institutions.map((institution) => (
          <CardInstitution
            key={institution?.id}
            navigation={navigation}
            institution={institution}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
          />
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
