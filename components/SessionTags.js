import { View, Text } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  Octicons,
  FontAwesome,
  Ionicons,
} from "react-native-vector-icons";

const tagEnum = ["innovation", "panel", "keynote", "invite-only", "technical"];
function RenderTag({ tag }) {
  switch (tag) {
    case "innovation":
      return (
        <View
          style={{
            backgroundColor: "#ffe0de",
            padding: 4,
            paddingHorizontal: 8,
            flexDirection: "row",
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="theater"
            color="red"
            size={16}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "red" }}>Innovation Theater</Text>
        </View>
      );

    case "keynote":
      return (
        <View
          style={{
            backgroundColor: "#ddf5e3",
            padding: 4,
            paddingHorizontal: 8,
            flexDirection: "row",
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="person"
            color="#4dbd69"
            size={16}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#4dbd69" }}>Keynote</Text>
        </View>
      );

    case "panel":
      return (
        <View
          style={{
            backgroundColor: "#f7e0fa",
            padding: 4,
            paddingHorizontal: 8,
            flexDirection: "row",
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <Octicons
            name="comment-discussion"
            color="#663a7d"
            size={16}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#663a7d" }}>Discussion Panel</Text>
        </View>
      );

    case "invite-only":
      return (
        <View
          style={{
            backgroundColor: "#e9e9ea",
            padding: 4,
            paddingHorizontal: 8,
            flexDirection: "row",
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="lock"
            color="#1f1f1f"
            size={16}
            style={{ marginRight: 6 }}
          />
          <Text style={{ color: "#1f1f1f" }}>Invitation Only</Text>
        </View>
      );
  }
}

export default function SessionTags({ tags, style }) {
  const filteredTags = tags.filter((tag) => tagEnum.includes(tag));
  if (filteredTags.length) {
    return (
      <View
        style={{
          ...style,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingVertical: 4,
        }}
      >
        {filteredTags.map((tag, idx) => (
          <RenderTag tag={tag} key={idx} />
        ))}
      </View>
    );
  } else {
    return null;
  }
}
