import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import CachedImage from "react-native-expo-cached-image";
import * as Linking from "expo-linking";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapSponsors(sponsors) {
  let result = [];
  sponsors.forEach((sponsor) => {
    let idx = result.findIndex((section) => section.tier === sponsor.tier);
    if (idx === -1) {
      result.push({
        title: `${capitalizeFirstLetter(sponsor.tier)} Sponsors`,
        tier: sponsor.tier,
        data: [sponsor],
      });
    } else {
      result[idx].data.push(sponsor);
    }
  });
  return result;
}

function RenderSponsor({ sponsor }) {
  return (
    <View>
      <Text style={{ padding: 8 }}>{sponsor.name}</Text>
      <Pressable
        onPress={() => {
          Linking.openURL(sponsor.url);
        }}
        style={{ backgroundColor: "white", padding: 16 }}
      >
        <CachedImage
          style={{ width: "100%", height: 150 }}
          source={{
            uri: sponsor.logoUrl,
          }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

function SponsorSections({ sections }) {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <RenderSponsor sponsor={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
      )}
    />
  );
}

export default function SponsorScreen({ route }) {
  const sponsorSections = mapSponsors(route.params.sponsors);

  return (
    <View>
      <SponsorSections sections={sponsorSections} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#4c97ce",
  },
});
