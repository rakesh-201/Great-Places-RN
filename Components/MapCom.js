import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Color from "../Constants/Color";

const MapCom = (props) => {
  const [coordinate, setCoordinate] = useState(
    props.location
      ? {
          latitude: props.location.lat,
          longitude: props.location.lng,
        }
      : undefined
  );

  const [curRegion, setCurRegion] = useState({
    latitude: props.location ? props.location.lat : 19.076,
    longitude: props.location ? props.location.lng : 72.8777,
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  });

  const locationHandler = (event) => {
    if (props.edit) {
      setCoordinate({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      });
      console.log(event);
      setCurRegion({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        // latitudeDelta: 1,
        // longitudeDelta: 1,
      });
    }
  };

  return (
    <View>
      <MapView
        region={curRegion}
        style={styles.map}
        onPress={(event) => locationHandler(event)}
      >
        {coordinate ? (
          <Marker title="Selected location" coordinate={coordinate}></Marker>
        ) : null}
      </MapView>
      <View>
        {props.edit ? (
          <Button
            title="Save"
            color={Color.primary}
            onPress={() => {
              props.setLocation({
                lat: coordinate.latitude,
                lng: coordinate.longitude,
              });
              props.edit = false;
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default MapCom;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 100,
    width: 300,
    marginTop: 10,
  },
});
