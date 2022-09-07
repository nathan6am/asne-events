import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./navigators/BottomTabs";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
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
