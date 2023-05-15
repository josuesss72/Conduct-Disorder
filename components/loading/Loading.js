import React from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { styles } from "../../styles/globalStyles";

function Loading({ loading, children }) {
  if (loading) {
    return (
      <View style={styleLoading.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../database/data/pdf/logo2.jpg")}
        />
        <ActivityIndicator animating={true} size={"large"} color={"#000"} />
      </View>
    );
  }

  return children;
}

const styleLoading = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default Loading;
