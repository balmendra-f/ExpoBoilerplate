import Screen from "@/components/common/Screen";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Screen tabbed>
      <View className="flex-1 px-6 pt-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">{t("home")}</Text>
          {user?.displayName && (
            <Text className="text-base text-gray-500 dark:text-gray-400">
              {t("welcome_user", { name: user.displayName })}
            </Text>
          )}
        </View>

        <View className="flex-1 items-center justify-center gap-4">
          <View className="w-20 h-20 rounded-3xl bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
            <Ionicons name="code-slash-outline" size={36} color="#6366f1" />
          </View>
          <Text className="text-neutral-900 dark:text-white text-xl font-bold text-center">
            {t("app_starts_here")}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center text-sm leading-6 max-w-xs">
            {t("home_placeholder_text")}
          </Text>

          <Pressable
            className="mt-4 bg-indigo-600 px-6 py-3 rounded-2xl active:bg-indigo-700"
            onPress={() => {}}
          >
            <Text className="text-white font-semibold text-base">
              {t("get_started")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
