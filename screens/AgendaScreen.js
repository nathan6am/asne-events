//COMPONENTS AND HOOKS
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import CalendarBar from "../components/CalendarBar";
import { eventsApi } from "../redux/eventsApi";
import Agenda from "../components/Agenda";
import { TabView } from "react-native-tab-view";
import Loading from "../components/Loading";
import { Ionicons } from "react-native-vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
//UTIL
import { generateCalendarStrip } from "../util/dateUtil";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

function FiltersModal({ filters, setFilters, visible, hide }) {
  const [all, setAll] = useState(filters.all);
  const [keynotes, setKeynotes] = useState(filters.keynotes);
  const [panels, setPanels] = useState(filters.panels);
  const [innovation, setInnovation] = useState(filters.innovation);
  const [technical, setTechnical] = useState(filters.technical);
  const [invite, setInvite] = useState(filters.invite);
  const [other, setOther] = useState(filters.other);
  useEffect(() => {
    setAll(filters.all);
    setKeynotes(filters.keynotes);
    setPanels(filters.panels);
    setInnovation(filters.innovation);
    setTechnical(filters.technical);
    setInvite(filters.invite);
    setOther(filters.other);
  }, [filters]);
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={hide}
    >
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
            width: "85%",
            elevation: 10,
            borderRadius: 8,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              backgroundColor: "#0b3d78",
              borderTopStartRadius: 8,
              borderTopEndRadius: 8,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "sans-serif-medium",
                color: "white",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Filter Sessions
            </Text>
          </View>
          <View style={{ padding: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox.Android
                status={all ? "checked" : "unchecked"}
                color="#fbb730"
                onPress={() => {
                  setAll(!all);
                  if (!all) {
                    setKeynotes(true);
                    setPanels(true);
                    setInnovation(true);
                    setInvite(true);
                    setTechnical(true);
                    setOther(true);
                  }
                }}
              />
              <Text>All Sessions</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={keynotes ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setKeynotes(!keynotes);
                  }}
                />
                <Text>Keynotes</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={panels ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setPanels(!panels);
                  }}
                />
                <Text>Discussion Panels</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={innovation ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setInnovation(!innovation);
                  }}
                />
                <Text>Innovation Theater</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={technical ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setTechnical(!technical);
                  }}
                />
                <Text>Technical Tracks</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={invite ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setInvite(!invite);
                  }}
                />
                <Text>Invitation Only</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox.Android
                  color="#fbb730"
                  status={other ? "checked" : "unchecked"}
                  disabled={all}
                  onPress={() => {
                    setOther(!other);
                  }}
                />
                <Text>Other Sessions</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setAll(filters.all);
                  setKeynotes(filters.keynotes);
                  setPanels(filters.panels);
                  setInnovation(filters.innovation);
                  setTechnical(filters.technical);
                  setInvite(filters.invite);
                  setOther(filters.other);
                  hide();
                }}
                style={{
                  backgroundColor: "red",
                  padding: 8,
                  width: 90,
                  paddingHorizontal: 16,
                  borderRadius: 4,
                  margin: 8,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFilters({
                    all,
                    keynotes,
                    panels,
                    innovation,
                    technical,
                    invite,
                    other,
                  });
                  hide();
                }}
                style={{
                  backgroundColor: "#4c97ce",
                  width: 90,
                  padding: 8,
                  paddingHorizontal: 16,
                  borderRadius: 4,
                  margin: 8,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "center" }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

//Returns an array of routes for each calendar day
function getTabRoutes(start, end) {
  const dates = generateCalendarStrip(start, end)
    .filter((el) => !el.disabled)
    .map((el) => el.day);
  const routes = dates.map((day, idx) => {
    return {
      key: day,
      title: dayjs(day).format("dddd MMMM Do"),
    };
  });
  return routes;
}

export default function AgendaScreen({ route }) {
  //CONSTANTS
  const layout = useWindowDimensions();
  const event = route.params.event;

  const eventid = route.params.event._id;
  const routes = getTabRoutes(event.startDate, event.endDate);

  //COMPONENT STATE
  const [activeDate, setActiveDate] = useState(
    dayjs().isBefore(dayjs(event.startDate))
      ? event.startDate
      : routes.find((route) => {
          return dayjs().isSame(route.key, "day");
        }).key
  );
  const [tabIdx, setTabIdx] = useState(0);
  const [showMyAgenda, setShowMyAgenda] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    all: true,
    keynotes: true,
    panels: true,
    innovation: true,
    technical: true,
    invite: true,
    other: true,
  });

  const clear = () => {
    setFilters({
      all: true,
      keynotes: true,
      panels: true,
      innovation: true,
      technical: true,
      invite: true,
      other: true,
    });
  };

  //Session data from Api
  const { data, error, isLoading } =
    eventsApi.endpoints.getEventSessions.useQuery(route.params.event._id);

  //Call refetch to refresh api results
  const { refetch } = eventsApi.endpoints.getEventSessions.useQuerySubscription(
    route.params.event._id
  );

  //Returns Agenda component for calendar route
  const renderScene = (sceneProps) => {
    const date = sceneProps.route.key;
    return (
      <Agenda
        filters={filters}
        sessions={data?.sessions}
        date={date}
        eventid={eventid}
        event={event}
        isMyAgenda={showMyAgenda}
      />
    );
  };

  useEffect(() => {
    setTabIdx(
      routes.findIndex((path) => dayjs(path.key).isSame(activeDate, "day"))
    );
  }, [activeDate]);

  return (
    <View style={{ flex: 1 }}>
      <FiltersModal
        visible={showFilters}
        hide={() => {
          setShowFilters(false);
        }}
        filters={filters}
        setFilters={setFilters}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#0b3d78",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f1f1f1",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <Pressable
            onPress={() => {
              setShowMyAgenda(false);
            }}
          >
            <Text
              style={{
                padding: 6,
                borderRadius: 4,
                paddingHorizontal: 12,
                backgroundColor: showMyAgenda ? "transparent" : "#0b3d78",
                color: showMyAgenda ? "black" : "white",
                margin: 2,
              }}
            >
              Full Agenda
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowMyAgenda(true);
            }}
          >
            <Text
              style={{
                padding: 6,
                paddingHorizontal: 12,
                backgroundColor: !showMyAgenda ? "transparent" : "#0b3d78",
                color: !showMyAgenda ? "black" : "white",
                margin: 2,
                borderRadius: 4,
              }}
            >
              My Agenda
            </Text>
          </Pressable>
        </View>
      </View>
      <CalendarBar
        start={event.startDate}
        end={event.endDate}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          padding: 8,
          paddingHorizontal: 16,
          marginTop: 1,
          alignItems: "center",
          justifyContent: "space-between",
          elevation: 2,
          zIndex: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowFilters(true);
          }}
          style={{ height: "100%" }}
        >
          <Ionicons name="md-filter" color="#fbb730" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clear}>
          <Text style={{ color: "#fbb730" }}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <TabView
          renderTabBar={() => {}}
          renderScene={renderScene}
          navigationState={{ index: tabIdx, routes: routes }}
          onIndexChange={(idx) => {
            setActiveDate(routes[idx].key);
          }}
          initialLayout={{ width: layout.width }}
        />
      )}
    </View>
  );
}
