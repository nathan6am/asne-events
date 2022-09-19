import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import CachedImage from "react-native-expo-cached-image";
import VenueMapModal from "../components/VenueMapModal";
import { RectButton } from "react-native-gesture-handler";

function parseUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  } else return url;
}
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

      <Text style={styles.title}>{venue.name}</Text>
      <RectButton
        onPress={() => {
          if (venue.url) {
            Linking.openURL(parseUrl(venue.url));
          }
        }}
        style={{ marginTop: 2, backgroundColor: "white", padding: 16 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="ios-globe-outline"
            color="#4c97ce"
            size={20}
            style={{ marginRight: 8 }}
          />
          <Text>Venue Website</Text>
          <Ionicons name="open-outline" size={16} style={{ marginLeft: 5 }} />
        </View>
      </RectButton>
      <View style={{ marginTop: 2, backgroundColor: "white", padding: 16 }}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="md-location"
            color="#4c97ce"
            size={18}
            style={{ marginRight: 8 }}
          />
          <Text style={{ opacity: 0.6 }}>Address</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text>{venue.address.addressLine1}</Text>
          <Text>{`${venue.address.city}, ${venue.address.state}`}</Text>
          <Text>{venue.address.zip}</Text>
        </View>
      </View>
      <RectButton
        onPress={() => {
          navigation.navigate("Venue Map", { venue: venue });
        }}
        style={{ marginTop: 2, backgroundColor: "white", padding: 16 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="map"
            color="#4c97ce"
            size={18}
            style={{ marginRight: 8 }}
          />
          <Text>View Venue Map</Text>
        </View>
      </RectButton>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    padding: 16,
    backgroundColor: "white",
  },
});
