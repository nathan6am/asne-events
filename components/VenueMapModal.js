import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CachedImage from "react-native-expo-cached-image";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function VenueMapModal({ venue, showMap, setShowMap }) {
  return (
    <Modal
      style={{ justifyContent: "center" }}
      transparent={true}
      animationType="fade"
      visible={showMap}
      onRequestClose={() => {
        setShowMap(false);
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            borderRadius: 10,
            flexShrink: 1,
            height: "70%",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <View style={{ height: 60, backgroundColor: "#0b3d78" }}>
            <Text>Venue Map</Text>
          </View>
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
      </View>
    </Modal>
  );
}
