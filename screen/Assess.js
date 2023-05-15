import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { KEY_ID_STUDENT } from "../utils/keyStorage";

const Assess = () => {
  useEffect(() => {
    AsyncStorage.getItem(KEY_ID_STUDENT)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View>
      <Text>Assess</Text>
    </View>
  );
};

export default Assess;
