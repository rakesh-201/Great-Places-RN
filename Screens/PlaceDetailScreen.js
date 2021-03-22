import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ColorPropType,
  Platform,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import MapCom from "../Components/MapCom";

const PlaceDetailScreen = (props) => {
  const placeId = props.navigation.getParam("id");
  const place = useSelector((state) =>
    state.places.places.find((place) => place.id == placeId)
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <>
        <Image source={{ uri: place.imageUri }} style={styles.image} />
        <View style={styles.con}>
          <MapCom location={{ lat: place.lat, lng: place.lng }} edit={false} />
        </View>
      </>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
    headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
  };
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    marginTop: 0,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 1.5,
  },
  con: {
    margin: 20,
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default PlaceDetailScreen;
