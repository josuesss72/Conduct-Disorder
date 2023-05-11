import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

function Loading({ loading, children }) {
  if (loading) {
    return (
      <View style={styleLoading.container}>
        <ActivityIndicator animating={true} size={"large"} color={"#000"} />
      </View>
    );
  }

  return children;
}

const styleLoading = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
        justifyContent: 'center'
    }
})

export default Loading