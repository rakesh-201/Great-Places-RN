import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import ImagePickerCom from "../Components/ImagePickerCom";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import Color from "../Constants/Color";
import { addPlace } from "../store/places-action";
import LocationPicker from "../Components/LocationPicker";
import * as Locations from "expo-location";

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [Location, setLocation] = useState();
  const dispatch = useDispatch();

  const dispatchHandler = useCallback(async () => {
    let result;
    if (Location) {
      try {
        result = await Locations.reverseGeocodeAsync({
          latitude: Location.lat,
          longitude: Location.lng,
        });
        console.log(result);
        result = result[0];
        result = `${result.name}, ${result.city} - ${result.postalCode}, ${
          result.street ? result.street + ", " : " "
        }${result.region}, ${result.country}`;
      } catch (err) {
        console.log(`error: ${err}`);
      }
    }

    dispatch(addPlace(title, image, result, Location));
    props.navigation.goBack();
  }, [dispatch, title, image, Location]);

  useEffect(() => {
    props.navigation.setParams({ dispatch: dispatchHandler });
  }, [dispatchHandler]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.con1}>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
          <ImagePickerCom
            image={(image) => {
              setImage(image);
              console.log("in");
            }}
          />
        </View>
        <View style={styles.con1}>
          <LocationPicker Location={setLocation} />
        </View>
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (navData) => {
  const dispatch = navData.navigation.getParam("dispatch");

  return {
    headerTitle: "Add Place",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-done-all" : "ios-done-all"}
          color={Platform.OS === "android" ? "white" : Color.primary}
          iconSize={22}
          onPress={dispatch}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    marginTop: 30,
  },
  con1: {
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderRadius: 10,
    padding: 15,
    height: 500,
    width: "98%",
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
});

export default NewPlaceScreen;
