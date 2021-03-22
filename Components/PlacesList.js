import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

const PlacesList = (props) => {
  return (
    <TouchableHighlight
      underlayColor="yellow"
      style={styles.screen}
      onPress={() => {
        props.navigation.navigate("Detail", {
          id: props.id,
          title: props.title,
        });
      }}
    >
      <View style={styles.con1}>
        <View style={styles.con3}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.con2}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.txt}>{props.address}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  con1: {
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    margin: 10,
    width: "95%",
    flexDirection: "row",
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  con2: {
    paddingLeft: 10,
    paddingTop: 15,
    overflow: "hidden",
    width: "60%",
  },
  text: {
    color: "black",
    fontSize: 19,
    paddingBottom: 5,
  },
  txt: {
    color: "rgb(59, 59, 59)",
    fontSize: 14,
    overflow: "hidden",
  },
  con3: {
    width: "40%",
    height: "100%",
    overflow: "hidden",
  },
});

export default PlacesList;
