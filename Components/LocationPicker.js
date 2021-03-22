import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import Color from "../Constants/Color";
import * as Location from "expo-location";
import MapCom from "./MapCom";
import * as Permissions from "expo-permissions";

const LocationPicker = (props) => {
  const [showMap, setShowMap] = useState();

  const askPermissions = async () => {
    console.log("1");
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "LOCATION Permission Not Granted",
        "You won't be able to use this app without this permission!",
        [{ text: "Okay", style: "destructive" }]
      );
    } else {
      return result;
    }
  };

  const locationHandler = async () => {
    const allowed = await askPermissions();
    if (!allowed) {
      return;
    }
    const result = await Location.getCurrentPositionAsync();
    if (!result) {
      return;
    }
    setShowMap({
      edit: false,
      location: {
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      },
    });
    props.Location({
      lat: result.coords.latitude,
      lng: result.coords.longitude,
    });
  };

  return (
    <View style={styles.con}>
      <View style={styles.conbut}>
        <Button
          title="Add Current Location"
          color={Color.primary}
          onPress={locationHandler}
        />
      </View>
      <View style={styles.conbut}>
        <Button
          title="Select Location On Map"
          color={Color.primary}
          onPress={() => {
            setShowMap({
              edit: true,
            });
          }}
        />
      </View>
      <View style={styles.map}>
        {showMap ? (
          <MapCom
            location={showMap.location}
            setLocation={props.Location}
            edit={showMap.edit}
          />
        ) : (
          <Text>No Preview Available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    alignItems: "center",
  },
  conbut: {
    width: 250,
    marginVertical: 10,
  },
  map: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
  },
});

export default LocationPicker;
