import { FontAwesome6 } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const ICONS: Record<string, string> = {
  "index": "check-square",
  "timer": "clock",
  "notes": "user-circle",
  "addTask": "plus",
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const { buildHref } = useLinkBuilder();

  const routes = state.routes.filter(
    (route: any) => !["_sitemap", "+not-found"].includes(route.name),
  );

  const groupedRoutes = routes.slice(0, 3);
  const lastRoute = routes[routes.length - 1];

  const renderTab = (route: any, index: number, isLastTab = false) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const isFocused = state.index === index;
    const iconName = ICONS[route.name] ?? "circle";

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({ type: "tabLongPress", target: route.key });
    };

    if (isLastTab) {
      // single pill — icon only, orange color
      return (
        <PlatformPressable
          key={route.key}
          href={buildHref(route.name, route.params)}
          accessibilityState={isFocused ? { selected: true } : {}}
          onPress={onPress}
          onLongPress={onLongPress}
          style={[styles.tabbarItem]}
        >
          <FontAwesome6
            name={iconName as any}
            size={26}
            color={isFocused ? "#fff" : "#FF6B00"}
          />
        </PlatformPressable>
      );
    }

    // grouped tabs — icon + label, focused = dark bg pill
    const iconColor = isFocused ? "#1C1C1C" : "#9A9A9A";
    const labelColor = isFocused ? "#1C1C1C" : "#9A9A9A";

    return (
      <PlatformPressable
        key={route.key}
        href={buildHref(route.name, route.params)}
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.tabbarItem,
          isFocused && styles.tabbarItemFocused,
        ]}
      >
        <FontAwesome6 name={iconName as any} size={20} color={iconColor} />
        {/* {!isFocused && ( */}
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        {/* // )} */}
      </PlatformPressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* First 3 — white pill */}
      <View style={styles.groupPill}>
        {groupedRoutes.map((route: any, index: number) =>
          renderTab(route, index, false),
        )}
      </View>

      {/* Last — black pill, orange icon only */}
      <View style={styles.lastPill}>
        {renderTab(lastRoute, routes.length - 1, true)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  groupPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#e5e5e5", 
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    maxWidth: 330,
  },
  lastPill: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tabbarItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
    flexDirection: "row",
  },
  tabbarItemFocused: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    // paddingHorizontal:8,
    borderRadius: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
