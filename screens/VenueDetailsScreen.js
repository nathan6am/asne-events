import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CachedImage from "react-native-expo-cached-image";
import VenueMapModal from "../components/VenueMapModal";
export default function VenueDetailsScreen({ route, navigation }) {
  const venue = route.params.venue;
  const [showMap, setShowMap] = useState(false);
  return (
    <View>
      <VenueMapModal venue={venue} showMap={showMap} setShowMap={setShowMap} />
      <CachedImage
        style={{ width: "100%", height: 150 }}
        source={{ uri: venue.imageUrl }}
        resizeMode="cover"
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Venue Map", { venue: venue });
        }}
      >
        <Text>View Venue Map</Text>
      </Pressable>
      <Text>{venue.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
