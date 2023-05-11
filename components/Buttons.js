import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const CustomButton1 = ({ title, color, align, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: `${align}`,
        backgroundColor: `${color}`,
        ...styles.button,
      }}
      {...props}
    >
      <Text
        style={{
          ...styles.button_text,
          color: `${"white"}`,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  button_text: {
    fontSize: 18,
  },
});
