import React, { useState } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import StudentScreen from "./Student";
import ProfileScreen from "./profile";
import ActivitiesScreen from "./activities";
import { colors } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_TOKEN } from "../utils/keyStorage";

function Home({ userCredent, setRenderSign, renderSign }) {
  const Tab = createBottomTabNavigator();
  const [load, setLoad] = useState(false);

  const onSalir = async () => {
    await AsyncStorage.removeItem(KEY_TOKEN);
    setLoad(true);
    setRenderSign(!renderSign);
  };

  const MyTab = () => {
    return (
      <Tab.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Perfil":
                iconName = "user";
                break;
              case "Studiantes":
                iconName = "book";
                break;
              case "Activities":
                iconName = "bookmark";
                break;
              default:
                break;
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen
          name="Perfil"
          children={() => (
            <ProfileScreen userCredent={userCredent} load={load} />
          )}
          options={{
            title: "PERFIL",
            headerStyle: {
              backgroundColor: colors.orange,
            },
            headerTintColor: colors.white,
            headerRight: () => <Button title="Salir" onPress={onSalir} />,
            tabBarStyle: {
              backgroundColor: colors.orange,
            },
            tabBarActiveTintColor: colors.white,
          }}
        />
        <Tab.Screen
          name="Studiantes"
          children={() => <StudentScreen userCredent={userCredent} />}
          options={{
            headerShown: false,
            tabBarStyle: { backgroundColor: colors.red },
            tabBarActiveTintColor: colors.white,
          }}
        />
        <Tab.Screen
          name="Activities"
          component={ActivitiesScreen}
          options={{
            title: "ACTIVIDADES",
            headerStyle: {
              backgroundColor: colors.yellow,
            },
            headerTintColor: colors.white,
            tabBarStyle: {
              backgroundColor: colors.yellow,
            },
            tabBarActiveTintColor: colors.white,
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer independent={true}>
      <MyTab />
    </NavigationContainer>
  );
}

export default Home;
