import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CachedImage from "react-native-expo-cached-image";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function VenueMap({ route }) {
  const venue = route.params.venue;
  return (
    <View style={{ flex: 1 }}>
      <ReactNativeZoomableView
        bindToBorders={true}
        panBoundaryPadding={600}
        initialZoom={0.25}
        minZoom={0.2}
        maxZoom={2.0}
      >
        <CachedImage
          style={{
            width: venue.map.dimensions.width,
            height: venue.map.dimensions.height,
          }}
          source={{ uri: venue.map.url }}
        />
      </ReactNativeZoomableView>
    </View>
  );
}
