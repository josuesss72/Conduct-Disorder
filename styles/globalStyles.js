import { StyleSheet } from "react-native";

export const colors = {
  white: "white",
  orange: "#FEBE8C",
  yellow: "#F4E185",
  red: "#FF6969",
  blue: "#2F58CD",
};

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F5F5F5",
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputGroup: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    fontSize: 15,
  },
  boxInput: {
    gap: 7,
  },
  text1: {
    fontSize: 18,
  },
  text2: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonGroup: {
    marginTop: 20,
    backgroundColor: "#146C94",
    borderRadius: 10,
    padding: 10,
  },
  text_input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#9BA4B5",
    fontSize: 18,
  },
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  emoji: {
    fontSize: 100,
  },
});
