import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsSectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}

export const SettingsSection = ({
  title,
  icon,
  children,
}: SettingsSectionProps) => (
  <View className="mb-6">
    <View className="flex-row items-center mb-3 px-1">
      <View className="p-1 rounded-lg bg-indigo-500/20 dark:bg-indigo-500/20 items-center justify-center mr-2">
        <Ionicons name={icon} size={14} color="#6366f1" />
      </View>
      <Text className="text-sm font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
        {title}
      </Text>
    </View>
    <View className="bg-white dark:bg-neutral-800/80 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700/50">
      {children}
    </View>
  </View>
);

export default SettingsSection;
