import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
}

export const SettingsItem = ({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  isLast = false,
}: SettingsItemProps) => (
  <Pressable
    className={`flex-row items-center px-5 py-4 active:bg-neutral-100 dark:active:bg-neutral-700 ${
      !isLast ? "border-b border-neutral-200 dark:border-neutral-700/50" : ""
    }`}
    onPress={onPress}
  >
    <View className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-700/50 items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#6366f1" />
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-neutral-900 dark:text-white mb-0.5">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </Text>
      )}
    </View>
    {rightElement ?? (
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    )}
  </Pressable>
);

export default SettingsItem;
