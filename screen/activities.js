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
          <Button
            title="🦁 Actividad reflexiva en la selva"
            onPress={() =>
              Linking.openURL(
                "https://drive.google.com/file/d/18NYODcKZNNtKmPYxYyCXZjN-o1IEuDG9/view?usp=share_link"
              )
            }
          />
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
