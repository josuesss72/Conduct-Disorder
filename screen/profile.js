import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Loading from "../components/loading/Loading";
import { getInfoUser } from "../database/controllers/user.controllers";
import { styles } from "../styles/globalStyles";

function ProfileScreen({ userCredent, load }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (userCredent) {
      getInfoUser(userCredent.uid)
        .then((res) => {
          setUserData(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Loading loading={load}>
      <View style={{ ...styles.container }}>
        <View style={stylesProfile.box}>
          <View style={stylesProfile.box_image}>
            <Image
              style={stylesProfile.image}
              source={
                userData?.photoURL
                  ? {
                      uri: userData?.photoURL,
                    }
                  : require("../assets/perfil_vacio.jpg")
              }
            />
            <Text style={styles.text1}>{userData?.name}</Text>
            <Text>✉ {userData?.email}</Text>
          </View>
          {/* INFO */}
          <View style={{ ...stylesProfile.box_info, ...styles.box }}>
            <View style={{ ...stylesProfile.text_info }}>
              <Text style={styles.text1}>📱 Telefono</Text>
              <Text style={{ ...styles.text2 }}>({userData?.iphone})</Text>
            </View>
            <View style={stylesProfile.text_info}>
              <Text style={styles.text1}>📘 Asignatura </Text>
              <Text style={{ ...styles.text2 }}>{userData?.subject}</Text>
            </View>
          </View>
        </View>
      </View>
    </Loading>
  );
}

const stylesProfile = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  box_image: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    gap: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  box_info: {
    justifyContent: "center",
    gap: 10,
  },
  text_info: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    gap: 20,
  },
});

export default ProfileScreen;
