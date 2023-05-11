import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import { auth } from "../database/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { styles } from "../styles/globalStyles";
import Loading from "../components/loading/Loading";
import { userExists } from "../database/controllers/user.controllers";
import FormUserInfoScreen from "./FormUserInfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignUpScreen({ children, userCredent, setUserCredent }) {
  const [isLogin, setIsLogin] = useState({ login: false, process: false });
  const [load, setLoad] = useState(true);
  const [electronicAuth, setElectronicAuth] = useState({
    email: "",
    password: "",
  });

  const handlePress = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUserCredent(res.user);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeText = (text, name) => {
    setElectronicAuth({ ...electronicAuth, [name]: text });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(
      auth,
      electronicAuth.email,
      electronicAuth.password
    )
      .then((res) => {
        setUserCredent(res.user);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err.message);
      });
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(
      auth,
      electronicAuth.email,
      electronicAuth.password
    )
      .then((res) => {
        setUserCredent(res.user);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err.message);
      });
  };

  useEffect(() => {
    if (userCredent) {
      handleUserStateChange(userCredent);
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserCredent(user);
        } else {
          console.log("Not Logged");
          setLoad(false);
        }
      });
    }
  }, [userCredent]);

  const handleUserStateChange = async (user) => {
    const isExistsUser = await userExists(user.uid);
    if (isExistsUser) {
      setIsLogin({ process: true, login: true });
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  if (!isLogin.login && !userCredent) {
    return (
      <Loading loading={load}>
        <KeyboardAwareScrollView
          style={{ ...styles.body, ...styles.container }}
        >
          <View
            style={{
              gap: 20,
              ...styles.box,
              marginVertical: "15%",
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 40 }}>Bienvenido a TC</Text>
              <Text style={styles.text1}>Registrate o inicia seccion</Text>
              <View
                style={{
                  ...styles.buttonGroup,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#146C94",
                }}
              >
                <Button
                  title="Login with Google"
                  onPress={handlePress}
                  color={"white"}
                />
              </View>
            </View>
            {/* INPUTS */}
            <View style={{ gap: 15 }}>
              <View style={styles.boxInput}>
                <Text style={{ ...styles.text1 }}>✉ Email</Text>
                <TextInput
                  onChangeText={(text) => handleChangeText(text, "email")}
                  placeholder="Johs@gamil.com"
                  keyboardType="email-address"
                  style={{
                    ...styles.text_input,
                  }}
                />
              </View>
              <View style={styles.boxInput}>
                <Text style={{ ...styles.text1 }}>🔑 Password</Text>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={(text) => handleChangeText(text, "password")}
                  style={{
                    ...styles.text_input,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                ...styles.buttonGroup,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#146C94",
              }}
            >
              <Button title="Login" onPress={handleLogin} color={"white"} />
            </View>

            <View
              style={{
                ...styles.buttonGroup,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#146C94",
              }}
            >
              <Button
                title="Create new Account"
                onPress={handleCreateAccount}
                color={"white"}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Loading>
    );
  }

  if (!isLogin.process && userCredent) {
    return (
      <Loading loading={load}>
        <FormUserInfoScreen setIsLogin={setIsLogin} userCredent={userCredent} />
      </Loading>
    );
  }

  return children;
}

export default SignUpScreen;
