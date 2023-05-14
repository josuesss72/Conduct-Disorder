import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Linking,
  Button,
  Text,
} from "react-native";
import { colors } from "../styles/globalStyles";

const ActivitiesScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: "#F6F6F6" }}>
      <View>
        <View style={{ ...stylesActivites.item }}>
          <Button
            title="👩🏽‍🤝‍👩🏻 Aprendo a cuidarme"
            onPress={() =>
              Linking.openURL(
                "https://drive.google.com/file/d/16J4hfuOWRG1Y5tc-rayQqyW69VBWx-Kf/view?usp=share_link"
              )
            }
          />
        </View>
        <View style={{ ...stylesActivites.item }}>
          <Button
            title="💃 Bailemos con alegria"
            onPress={() =>
              Linking.openURL(
                "https://drive.google.com/file/d/1ux6pq8Ic9IQoijoM7ikM2FOw5hQxCGFz/view?usp=share_link"
              )
            }
          />
        </View>
        <View style={{ ...stylesActivites.item }}>
          <Button
            title="🚝 4 Estaciones"
            onPress={() =>
              Linking.openURL(
                "https://drive.google.com/file/d/1KXThQGCff3WdHfWFaE2dOIaFukNLqXgf/view?usp=share_link"
              )
            }
          />
        </View>
        <View style={{ ...stylesActivites.item }}>
          <Text style={{ fontSize: 17, color: colors.blue }}>
            😴 Cuentos para dormir
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="parte 1"
              onPress={() =>
                Linking.openURL(
                  "https://drive.google.com/file/d/1Ubi55_0G8hXaTTbkzAl0EL0HqYtdVQBN/view?usp=share_link"
                )
              }
            />
            <Button
              title="parte 2"
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/1Ml3TYtE3b0xuphQ1Obyh6gorsOOnpWG4/edit?usp=share_link&ouid=100097056483532467852&rtpof=true&sd=true"
                )
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const stylesActivites = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#FAD9A1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ActivitiesScreen;
