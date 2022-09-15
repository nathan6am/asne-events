import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
export default function Loading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator animating={true} color="#4c97ce" />
    </View>
  );
}
