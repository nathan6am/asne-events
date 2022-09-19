import { View, Text } from "react-native";
import React from "react";

export default function Error() {
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 16 }}>
      <Text>
        Something went wrong. Please check your netowrk connection and reload
        the page.
      </Text>
    </View>
  );
}
