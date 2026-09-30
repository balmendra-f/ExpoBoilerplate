import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";

export default function TabsLayout() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#1f1f1f" : "#e5e5e5",
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 20 : 8,
          paddingTop: 8,
          elevation: 0,
          shadowColor: isDark ? "#000" : "#a3a3a3",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: focused
                  ? "rgba(99, 102, 241, 0.15)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: focused
                  ? "rgba(99, 102, 241, 0.15)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
