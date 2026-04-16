import { colors } from "@/constants/defaultBasics";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 60;
const FLATLIST_WIDTH = width - 48; // screen - container padding (32) - wrapper padding (16)

const generateDateList = () => {
  const dates = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get the first day of the current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  // Get the last day of the current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
    const date = new Date(currentYear, currentMonth, d);
    const isToday = date.toDateString() === today.toDateString();

    dates.push({
      id: d.toString(),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toString(),
      isToday,
    });
  }

  return dates;
};

const TABS = [
  { name: "todo", icon: "spinner" },
  { name: "completed", icon: "check" },
  { name: "pending", icon: "clock" },
];

const TaskOverview = () => {
  const flatListRef = useRef<FlatList>(null);
  const data = useMemo(() => generateDateList(), []);

  const todayIndex = data.findIndex((d) => d.isToday);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  const handlePress = (index: number) => {
    setCurrentIndex(index);
    const offset = index * ITEM_WIDTH;
    flatListRef.current?.scrollToOffset({ offset, animated: true });
  };

  // Snap detection
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  // tabSelection

  const [tabName, setTabName] = useState<string>("todo");

  const tabSelection = (tabName: string) => {
    setTabName(tabName);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.greet}>Hey, Joel</Text>
        <Text style={styles.sub}>Let’s make progress today!</Text>
      </View>

      {/* Date Picker */}
      <View style={styles.wrapper}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onMomentumScrollEnd={onScrollEnd}
          initialScrollIndex={todayIndex}
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          contentContainerStyle={{
            paddingHorizontal: (FLATLIST_WIDTH - ITEM_WIDTH) / 2,
          }}
          renderItem={({ item, index }) => {
            const isActive = index === currentIndex;

            return (
              <TouchableOpacity
                onPress={() => handlePress(index)}
                style={[styles.item, isActive && styles.activeItem]}
              >
                <Text style={[styles.day, item.isToday && styles.todayText]}>
                  {item.day}
                </Text>

                <Text style={[styles.date, item.isToday && styles.todayText]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* Check list */}
      <View style={styles.checkListContainer}>
        <View style={styles.checkListTab}>
          {TABS.map((tabItem, index) => {
            const isActiveTab = tabName === tabItem.name;
            return (
              <View key={index} style={styles.tabsContainer}>
                <TouchableOpacity
                  onPress={() => tabSelection(tabItem.name)}
                  style={[
                    styles.tab,
                    isActiveTab && { backgroundColor: "#000" },
                  ]}
                >
                  <FontAwesome6
                    name={tabItem.icon}
                    size={20}
                    color={isActiveTab ? "#fff" : "#000"}
                  />
                  <Text
                    style={[styles.tabText,   { color: isActiveTab ? "#fff" : "#000" }]}
                  >
                    {tabItem.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TaskOverview;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 80,
    gap: 15,
  },

  greet: {
    fontSize: 24,
    fontWeight: "600",
  },

  sub: {
    fontSize: 20,
    color: "#666",
    marginTop: 4,
    fontFamily: "cursive",
  },

  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    // borderWidth: 2,
  },

  item: {
    width: ITEM_WIDTH,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
  },

  activeItem: {
    borderColor: colors.orange,
    borderWidth: 2,
    borderRadius: 10,
  },

  day: {
    fontSize: 16,
    color: "#999",
    marginBottom: 4,
  },

  date: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  todayText: {
    color: colors.orange,
  },

  checkListContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: 580,
    padding: 20,
  },
  checkListTab: {
    backgroundColor: "#e5e5e5",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 4,
  },
  tabsContainer: {
    flex: 1,
  },
  tab: {
    borderRadius: 10,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 5,
    gap: 5,
  },
  tabText: {
    fontSize: 16,
    color: colors.mediumGray,
    fontWeight: "500",
  },
});
