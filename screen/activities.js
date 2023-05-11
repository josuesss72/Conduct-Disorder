import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { styles } from "../styles/globalStyles";

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
      </View>
    </ScrollView>
  );
};

const stylesActivites = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#FAD9A1",
  },
});

export default ActivitiesScreen;
