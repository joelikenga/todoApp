import { TabBar } from "@/components/tabBar";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="tasks/index" options={{ title: "Tasks" }} />
      <Tabs.Screen name="timer/index" options={{ title: "Timer" }} />
      <Tabs.Screen name="notes/index" options={{ title: "Notes" }} />
      <Tabs.Screen name="addTask/index" options={{ title: "Add" }} />
    </Tabs>
  );
};

export default TabsLayout;
