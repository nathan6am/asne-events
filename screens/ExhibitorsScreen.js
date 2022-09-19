import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { RectButton } from "react-native-gesture-handler";
import Fuse from "fuse.js";

import React, { useState, useEffect, useRef } from "react";
import { SearchBar } from "react-native-elements";
import CachedImage from "react-native-expo-cached-image";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import * as Linking from "expo-linking";

function getInitialOffest(dimensions, location) {
  const centerHorizontal = Math.floor(dimensions.width / 2);
  const offsetX = centerHorizontal - location.left;
  const centerVertical = Math.floor(dimensions.height / 2);
  const offsetY = centerVertical - location.top;
  return {
    x: offsetX,
    y: offsetY,
  };
}
function splitBooths(exhibitors) {
  let booths = [];
  exhibitors.forEach((exhibitor) => {
    exhibitor.booths.forEach((booth) => booths.push(booth));
  });
  return booths;
}
function parseUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  } else return url;
}
function RenderBooth({ booth, highlight }) {
  return (
    <View
      style={{
        width: 48,
        height: 48,
        backgroundColor: highlight ? "#fbb730" : "#f1f1f1",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        top: booth.location.top,
        left: booth.location.left,
      }}
    >
      <Text>{booth.boothCd}</Text>
    </View>
  );
}
function ExhibitorModal({ exhibitor, hide, exhibitors, map }) {
  const booths = splitBooths(exhibitors);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (exhibitor) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [exhibitor]);
  return (
    <Modal
      visible={visible}
      onRequestClose={hide}
      animationType="fade"
      transparent={true}
    >
      {exhibitor && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.0)",
          }}
        >
          <View
            style={{
              marginHorizontal: 4,
              width: "95%",
              elevation: 10,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                height: 50,
                backgroundColor: "#0b3d78",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View style={{ height: 50, width: 50 }}></View>
              <Text
                style={{
                  fontFamily: "sans-serif-medium",
                  fontSize: 20,
                  padding: 8,
                  color: "white",
                }}
              >
                Exhibitor Info
              </Text>
              <TouchableOpacity
                onPress={hide}
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="close" color="white" size={28} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#f1f1f1",
                padding: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "sans-serif-medium",
                  fontSize: 18,
                }}
              >
                {exhibitor.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <Ionicons name="md-location" />
                <Text>
                  {exhibitor.booths.map((booth) => booth.boothCd).join(", ")}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (exhibitor.url) {
                  Linking.openURL(parseUrl(exhibitor.url));
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 8,
                  paddingVertical: 16,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="md-open-outline"
                  size={18}
                  style={{ marginRight: 8 }}
                />
                <Text>Exhibitor Website</Text>
              </View>
            </TouchableOpacity>
            <View style={{ borderTopWidth: 2, borderColor: "#f1f1f1" }}></View>
            <View
              style={{
                height: 300,
                borderBottomEndRadius: 8,
                borderBottomStartRadius: 8,
              }}
            >
              <ReactNativeZoomableView
                bindToBorders={true}
                panBoundaryPadding={1200}
                initialZoom={0.5}
                initialOffsetX={
                  getInitialOffest(map.dimensions, exhibitor.booths[0].location)
                    .x
                }
                initialOffsetY={
                  getInitialOffest(map.dimensions, exhibitor.booths[0].location)
                    .y
                }
                minZoom={0.3}
                maxZoom={2.0}
              >
                <View
                  style={{
                    width: map.dimensions.width,
                    height: map.dimensions.height,
                  }}
                >
                  {booths.map((booth) => (
                    <RenderBooth
                      booth={booth}
                      key={booth.boothCd}
                      highlight={exhibitor.booths.some(
                        (item) => item.boothCd === booth.boothCd
                      )}
                    />
                  ))}
                  <CachedImage
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: map.url }}
                  ></CachedImage>
                </View>
              </ReactNativeZoomableView>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}
function RenderExhibitor({ exhibitor, setModalData }) {
  return (
    <RectButton
      onPress={() => {
        setModalData(exhibitor);
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
        <Text>{exhibitor.booths.map((booth) => booth.boothCd).join(", ")}</Text>
      </View>
    </RectButton>
  );
}

function ExhibitorSections({ exhibitors, query, handleDismiss, setModalData }) {
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
      renderItem={({ item }) => (
        <RenderExhibitor exhibitor={item} setModalData={setModalData} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}
export default function ExhibitorsScreen({ route }) {
  const exhibitors = route.params.exhibitors;
  const map = route.params.event.exhibitorMap;
  const [displayList, setDisplayList] = useState(exhibitors);
  const [modalData, setModalData] = useState(null);
  const hideModal = () => {
    setModalData(null);
  };
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
      <ExhibitorModal
        exhibitor={modalData}
        hide={hideModal}
        exhibitors={exhibitors}
        map={map}
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
          setModalData={setModalData}
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
    borderBottomWidth: 2,
    marginBottom: 2,
    borderColor: "#f1f1f1",
    paddingHorizontal: 8,
  },
});
