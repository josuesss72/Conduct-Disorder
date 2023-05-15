import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, Alert, Image } from "react-native";
import { auth } from "../database/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { styles } from "../styles/globalStyles";
import Loading from "../components/loading/Loading";
import FormUserInfoScreen from "./FormUserInfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  setTokenStorage,
  userExists,
  VerifyToken,
} from "../database/middlewares/user.middlewares";
import { VerifyUserLoggedAfter } from "../database/middlewares/auth.middlewares";

function SignUpScreen({ children, userCredent, setUserCredent, renderSign }) {
  const [isLogin, setIsLogin] = useState({ login: false, process: false });
  const [load, setLoad] = useState(false);
  const [electronicAuth, setElectronicAuth] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (text, name) => {
    setElectronicAuth({ ...electronicAuth, [name]: text });
  };

  const handleLogin = async () => {
    setLoad(true);
    signInWithEmailAndPassword(
      auth,
      electronicAuth.email,
      electronicAuth.password
    )
      .then((res) => {
        setUserCredent(res.user);
        setTokenStorage(res.user.stsTokenManager.accessToken);
        //setLoad(true);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        Alert.alert(err.message);
      });
  };

  const handleCreateAccount = () => {
    setLoad(true);
    createUserWithEmailAndPassword(
      auth,
      electronicAuth.email,
      electronicAuth.password
    )
      .then((res) => {
        setUserCredent(res.user);
        console.log(isLogin);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err.message);
      });
  };

  useEffect(() => {
    if (userCredent) {
      userExists(userCredent.uid).then((boolean) => {
        if (boolean) {
          console.log("entra userExists");
          VerifyToken()
            .then((isToken) => {
              setIsLogin({ process: true, login: true });
              setLoad(false);
            })
            .catch(() => {
              setUserCredent();
              setIsLogin({ process: false, login: false });
            });
        } else {
          setLoad(false);
          //setLoad(false);
        }
      });
    } else {
      /*VerifyUserLoggedAfter()
        .then((user) => {
          if(user){
            setUserCredent(user);
          } 
        })
        .catch((err) => {
          console.log(err);
        });*/
    }
  }, [userCredent, renderSign]);

  if (!isLogin.login && !userCredent) {
    return (
      <Loading loading={load}>
        <KeyboardAwareScrollView
          style={{
            backgroundColor: "#6DA9E4",
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center", marginTop: 35 }}>
            <Image
              style={{ ...styles.logo }}
              source={require("../database/data/pdf/logo2.jpg")}
            />
          </View>
          <View
            style={{
              gap: 20,
              ...styles.box,
              marginTop: 20,
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 30 }}>Welcome to Conduct Disorder</Text>
              <Text style={styles.text1}>Registrate o inicia seccion</Text>
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
