import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import Color from "../Constants/Color";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TextInput } from "react-native-gesture-handler";

const ImagePickerCom = (props) => {
  const [image, setImage] = useState();

  const askPermissions = async () => {
    const result = await Permissions.askAsync("camera", "cameraRoll");
    if (result.status !== "granted") {
      Alert.alert(
        "CAMERA Permission Not Granted",
        "You won't be able to use this app without this permission!",
        [{ text: "Okay", style: "destructive" }]
      );
    } else {
      return result;
    }
  };

  const imageHandler = async () => {
    const allowed = await askPermissions();
    if (allowed) {
      const image_ = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
      });
      setImage(image_.uri);
      props.image(image_.uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageCon}>
        {!image ? (
          <Text style={styles.txt}>
            No previews available, may be try picking some images!
          </Text>
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </View>
      <View style={styles.butCon}>
        <Button
          style={styles.button}
          title="Take Image"
          color={Color.primary}
          onPress={imageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: 300,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  button: {},
  butCon: {
    width: 100,
  },
  imageCon: {
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: 280,
    height: "87%",
    overflow: "hidden",
  },
  txt: {
    alignItems: "center",
  },
});

export default ImagePickerCom;
