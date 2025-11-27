import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// --- Import local images ---
// District logos
const D2_LOGO = require("../assets/Leo-District-Logo-306-D2.png");
const D3_LOGO = require("../assets/Leo-District-Logo-306-D3.png");
const D5_LOGO = require("../assets/Leo-District-Logo-306-D5.png");
const D11_LOGO = require("../assets/Leo-District-Logo-306-D11.png");

// Club logos
const C1_LOGO = require("../assets/Leo-District-Logo-306-D2.png");
const C2_LOGO = require("../assets/Leo-District-Logo-306-D3.png");
const C3_LOGO = require("../assets/Leo-District-Logo-306-D5.png");
const C4_LOGO = require("../assets/Leo-District-Logo-306-D11.png");

// Colors
const PRIMARY_GOLD = "#FFC700";
const SECONDARY_DARK = "#1F1F1F";
const INACTIVE_TAB_COLOR = "#888";

// --- Mock Data (updated with local images) ---
const DISTRICT_DATA = [
  { id: "d1", name: "Leo District D2", location: "@Anuradhapura", image: D2_LOGO },
  { id: "d2", name: "Leo District D3", location: "@Colombo", image: D3_LOGO },
  { id: "d3", name: "Leo District D9", location: "@Kandy, Matale, Polonnaruwa, Trincomalee", image: D2_LOGO },
  { id: "d4", name: "Leo District D6", location: "@Ambalangoda", image: D3_LOGO },
  { id: "d5", name: "Leo District D5", location: "@Negombo", image: D5_LOGO },
  { id: "d6", name: "Leo District D11", location: "@Gampaha", image: D11_LOGO },
  { id: "d7", name: "Leo District D12", location: "@Kurunegala", image: D2_LOGO },
  { id: "d8", name: "Leo District D1", location: "@Colombo", image: D3_LOGO },
];

const CLUB_DATA = [
  { id: "c1", name: "Leo Club of Colombo", location: null, image: C1_LOGO },
  { id: "c2", name: "Leo Club of Moratuwa", location: null, image: C2_LOGO },
  { id: "c3", name: "Leo Club of Royal Achievers", location: null, image: C3_LOGO },
  { id: "c4", name: "Leo Club of UOC Alumni", location: null, image: C4_LOGO },
];

// --- Custom Icon Component ---
const CustomAppIcon = ({ name, size = 24, color }) => (
  <Icon name={name} size={size} color={color} />
);

// --- Bottom Navigation Component ---
const BottomNav = ({ currentScreen, setScreen }) => (
  <View style={styles.bottomNav}>
    {["HomeFeed", "Search", "Notification", "Setting", "Profile"].map(
      (screen) => {
        let iconName;
        switch (screen) {
          case "HomeFeed":
            iconName = "home-outline";
            break;
          case "Search":
            iconName = "search-outline";
            break;
          case "Notification":
            iconName = "notifications-outline";
            break;
          case "Setting":
            iconName = "settings-outline";
            break;
          case "Profile":
            iconName = "person-outline";
            break;
        }

        return (
          <TouchableOpacity
            key={screen}
            onPress={() => setScreen(screen)}
            style={{ alignItems: "center" }}
          >
            <CustomAppIcon
              name={iconName}
              size={28}
              color={
                currentScreen === screen ? PRIMARY_GOLD : INACTIVE_TAB_COLOR
              }
            />
          </TouchableOpacity>
        );
      }
    )}
  </View>
);

// --- List Item Component ---
const ListItem = ({ item, setScreen }) => (
  <TouchableOpacity
    style={styles.listItemContainer}
    onPress={() => {
      if (item.id.startsWith("d")) {
        setScreen("District", {
          districtId: item.id,
          districtName: item.name,
        });
        return;
      }

      if (item.id.startsWith("c")) {
        setScreen("Clubs", {
          clubId: item.id,
          clubName: item.name,
        });
        return;
      }
    }}
  >
    <Image style={styles.entityImage} source={item.image ? item.image : { uri: item.imageUri }} />
    <View style={styles.textContainer}>
      <Text style={styles.entityName}>{item.name}</Text>
      {item.location && (
        <Text style={styles.entityLocation}>{item.location}</Text>
      )}
    </View>
  </TouchableOpacity>
);

// --- Main Search Screen ---
const SearchScreen = ({ setScreen }) => {
  const [activeTab, setActiveTab] = useState("District");
  const [currentBottomScreen, setCurrentBottomScreen] = useState("HomeFeed");

  const dataToDisplay =
    activeTab === "District" ? DISTRICT_DATA : CLUB_DATA;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => setScreen("HomeFeed")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === "District"
                ? "Search your favorite district..."
                : "Search your club..."
            }
            placeholderTextColor="#888"
          />
          <Text style={styles.searchIcon}>🔎</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "District" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("District")}
          >
            <Text
              style={[
                styles.toggleText,
                activeTab === "District" && styles.activeToggleText,
              ]}
            >
              District
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "Clubs" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("Clubs")}
          >
            <Text
              style={[
                styles.toggleText,
                activeTab === "Clubs" && styles.activeToggleText,
              ]}
            >
              Clubs
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dataToDisplay}
          renderItem={({ item }) => (
            <ListItem item={item} setScreen={setScreen} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <BottomNav
          currentScreen={currentBottomScreen}
          setScreen={(screenName) => {
            setCurrentBottomScreen(screenName);
            setScreen(screenName);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 15 },
  topHeader: { paddingVertical: 10 },
  backArrow: { color: "#FFF", fontSize: 24 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: { flex: 1, color: "#FFF", fontSize: 16 },
  searchIcon: { fontSize: 20, color: "#FFF" },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#333",
  },
  toggleText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  activeToggleText: { color: "#FFF" },
  listContent: { paddingBottom: 100 },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  entityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#FFC700",
  },
  textContainer: { justifyContent: "center" },
  entityName: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  entityLocation: { color: "#AAA", fontSize: 14 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: SECONDARY_DARK,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});

export default SearchScreen;
