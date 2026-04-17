import { colors } from "@/constants/defaultBasics";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 60;
const FLATLIST_WIDTH = width - 48;

// --- Types ---
type DateItem = {
  id: string;
  day: string;
  date: string;
  isToday: boolean;
};

type TabItem = {
  name: string;
  icon: string;
};

// --- Helpers ---
const generateDateList = (): DateItem[] => {
  const dates: DateItem[] = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
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

const TABS: TabItem[] = [
  { name: "Todo", icon: "spinner" },
  { name: "completed", icon: "check" },
  { name: "pending", icon: "clock" },
];

// --- Memoized Sub-components ---
const DateItemComponent = React.memo(
  ({
    item,
    isActive,
    onPress,
    index,
  }: {
    item: DateItem;
    isActive: boolean;
    onPress: (index: number) => void;
    index: number;
  }) => {
    const handlePress = useCallback(() => onPress(index), [index, onPress]);

    return (
      <TouchableOpacity
        onPress={handlePress}
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
  },
);

const TabItemComponent = React.memo(
  ({
    tab,
    isActive,
    onPress,
  }: {
    tab: TabItem;
    isActive: boolean;
    onPress: (name: string) => void;
  }) => {
    const handlePress = useCallback(
      () => onPress(tab.name),
      [tab.name, onPress],
    );

    return (
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.tab, isActive && { backgroundColor: "#000" }]}
        >
          <FontAwesome6
            name={tab.icon}
            size={20}
            color={isActive ? "#fff" : "#000"}
          />
          <Text style={[styles.tabText, { color: isActive ? "#fff" : "#000" }]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

// --- Main Component ---
const TaskOverview = () => {
  const flatListRef = useRef<FlatList>(null);
  const data = useMemo(() => generateDateList(), []);

  const todayIndex = useMemo(() => data.findIndex((d) => d.isToday), [data]);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);
  const [tabName, setTabName] = useState<string>("Todo");

  const handleDatePress = useCallback((index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_WIDTH,
      animated: true,
    });
  }, []);

  const handleTabPress = useCallback((name: string) => {
    setTabName(name);
  }, []);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / ITEM_WIDTH);
      setCurrentIndex(index);
    },
    [],
  );

  const renderDateItem = useCallback(
    ({ item, index }: { item: DateItem; index: number }) => (
      <DateItemComponent
        item={item}
        index={index}
        isActive={index === currentIndex}
        onPress={handleDatePress}
      />
    ),
    [currentIndex, handleDatePress],
  );

  const keyExtractor = useCallback((item: DateItem) => item.id, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<DateItem> | null | undefined, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    [],
  );

  const contentContainerStyle = useMemo(
    () => ({ paddingHorizontal: (FLATLIST_WIDTH - ITEM_WIDTH) / 2 }),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.greet}>Hey, Joel</Text>
        <Text style={styles.sub}>Let's make progress today!</Text>
      </View>

      {/* Date Picker */}
      <View style={styles.wrapper}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onMomentumScrollEnd={onScrollEnd}
          initialScrollIndex={todayIndex}
          getItemLayout={getItemLayout}
          contentContainerStyle={contentContainerStyle}
          renderItem={renderDateItem}
        />
      </View>

      {/* Tab Bar */}
      <View style={styles.checkListContainer}>
        <View style={styles.checkListTab}>
          {TABS.map((tabItem) => (
            <TabItemComponent
              key={tabItem.name}
              tab={tabItem}
              isActive={tabName === tabItem.name}
              onPress={handleTabPress}
            />
          ))}
        </View>
      </View>

      {/* Tasks */}
      <ScrollView style={styles.taskContainer} >
          <View style={styles.task}>
              <CheckBox 
          </View>
      </ScrollView>
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
  },
  item: {
    width: ITEM_WIDTH,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  activeItem: {
    borderColor: colors.orange,
    borderRadius: 10,
    backgroundColor: colors.lighterGray,
  },
  day: {
    fontSize: 16,
    color: colors.nearBlack,
    marginBottom: 4,
    zIndex: 2,
  },
  date: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 6,
  },
  tabText: {
    fontSize: 16,
    color: colors.mediumGray,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
