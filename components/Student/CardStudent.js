import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { deleteStudent } from "../../database/controllers/student.controllers";
import { styles } from "../../styles/globalStyles";

const CardStudent = ({ student, render, setRender }) => {
  const onDelete = () => {
    deleteStudent(student.id).then(() => setRender(!render));
  };

  return (
    <View style={{ ...styles.box, gap: 10 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View style={{ ...stylesStudent.box_emoji }}>
          <Text style={{ ...stylesStudent.emoji }}>{student.gender}</Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
          }}
        >
          <Text style={{ ...styles.text1 }}>
            {student.name} {student.lastName}
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View>
              <Text>
                <Text style={{ ...stylesStudent.strong }}>Grado: </Text>
                {student.grade}
              </Text>
              <Text>
                <Text style={{ ...stylesStudent.strong }}>Edad: </Text>
                {student.age}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginLeft: "auto",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ textAlign: "right" }} onPress={onDelete}>
            ✖
          </Text>
          <Button title="evaluar" />
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View style={{ ...stylesStudent.description }}>
          <Text>❗ {student.note}</Text>
        </View>
      </View>
    </View>
  );
};

const stylesStudent = StyleSheet.create({
  emoji: {
    fontSize: 60,
  },
  strong: {
    fontWeight: "500",
  },
  description: {
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    padding: 10,
  },
  box_emoji: {
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#EDEDED",
  },
});

export default CardStudent;
