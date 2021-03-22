import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./Navigation/AppNavigator";
import placesReducer from "./store/places-reducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { init } from "./helpers/db";

init()
  .then(console.log("Initialized"))
  .catch(() => {
    console.log("error");
    console.log(err);
  });

export default function App() {
  const appReducers = combineReducers({
    places: placesReducer,
  });

  const store = createStore(appReducers, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
