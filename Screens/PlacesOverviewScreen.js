import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import Color from "../Constants/Color";
import PlacesList from "../Components/PlacesList";
import { setPlace } from "../store/places-action";

const PlacesOverviewScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPlace());
  }, []);

  const places = useSelector((state) => state.places.places);

  console.log(places.length);

  return (
    <FlatList
      data={places}
      renderItem={(item) => (
        <PlacesList
          id={item.item.id}
          navigation={props.navigation}
          image={item.item.imageUri}
          address={item.item.address}
          title={item.item.title}
        />
      )}
    />
  );
};

PlacesOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Great Places",
    headerRight: (config) => (
      <HeaderButtons headerButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          title="Add"
          iconSize={22}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
          color={Platform.OS === "android" ? "white" : Color.primary}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesOverviewScreen;
