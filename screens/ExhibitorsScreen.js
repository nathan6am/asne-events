import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Fuse from "fuse.js";

import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "react-native-paper";
import { SearchBar } from "react-native-elements";

function RenderExhibitor({ exhibitor }) {
  return (
    <RectButton
      onPress={() => {
        console.log(exhibitor);
      }}
      style={styles.exhibitorItem}
    >
      <View
        style={{
          flexShrink: 0.5,
          padding: 6,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#0b3d78", fontSize: 16 }}>{exhibitor.name}</Text>
      </View>
      <View style={{ padding: 6, justifyContent: "center", opacity: 0.5 }}>
        <Text>{exhibitor.booths.join(", ")}</Text>
      </View>
    </RectButton>
  );
}

function ExhibitorSections({ exhibitors, query, handleDismiss }) {
  const formatResults = (list, query) => {
    let formatted = [];
    if (query) {
      formatted.push({ title: "Search Results:", data: list });
      return formatted;
    } else {
      const sorted = list.slice().sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      sorted.forEach((item) => {
        let alpha = item.name.charAt(0).toUpperCase();
        const idx = formatted.findIndex((section) => section.title == alpha);
        if (idx === -1) {
          formatted.push({ title: alpha, data: [item] });
        } else {
          formatted[idx].data.push(item);
        }
      });
      return formatted;
    }
  };

  const [sections, updateSections] = useState(() =>
    formatResults(exhibitors, query)
  );

  useEffect(() => {
    updateSections(formatResults(exhibitors, query));
  }, [exhibitors, query]);

  return (
    <SectionList
      onTouchStart={handleDismiss}
      sections={sections}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <RenderExhibitor exhibitor={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}
export default function ExhibitorsScreen({ route }) {
  const exhibitors = route.params.exhibitors;
  [displayList, setDisplayList] = useState(exhibitors);
  const inputRef = useRef(null);
  const handleDismiss = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  };
  const options = { keys: ["name"], threshold: 0.4 };
  const fuse = new Fuse(exhibitors, options);
  const [query, updateQuery] = useState("");
  useEffect(() => {
    if (query) {
      const results = fuse.search(query);
      setDisplayList(results.map((result) => result.item));
    } else {
      setDisplayList(exhibitors);
    }
  }, [query]);
  return (
    <View>
      <SearchBar
        ref={inputRef}
        placeholder="Search exhibitors..."
        onChangeText={(text) => {
          updateQuery(text);
        }}
        value={query}
        inputStyle={{ color: "#121212" }}
        inputContainerStyle={{ backgroundColor: "#fafafa" }}
        containerStyle={{
          backgroundColor: "#0b3d78",
          borderTopColor: "#0b3d78",
        }}
        cursorColor="#fbb730"
        lightTheme
        onClear={() => {
          setDisplayList(exhibitors);
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          inputRef.current?.blur();
        }}
      >
        <ExhibitorSections
          exhibitors={displayList}
          query={query}
          handleDismiss={handleDismiss}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { padding: 8 },
  exhibitorItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 8,
  },
});
