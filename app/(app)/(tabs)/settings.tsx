import Screen from "@/components/common/Screen";
import { auth } from "@/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Linking,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { BottomSheetModal } from "@/components/common/BottomSheetModal";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { SettingsSection } from "@/components/settings/SettingsSection";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const selectLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLanguageModalVisible(false);
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Screen tabbed>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="pt-6 pb-4">
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
            {t("settings")}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-base">{t("manage_account")}</Text>
        </View>

        <View className="bg-white dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 px-5 py-4 mb-6">
          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
              <Ionicons name="person-outline" size={22} color="#6366f1" />
            </View>
            <View className="flex-1">
              {user?.displayName && (
                <Text className="text-neutral-900 dark:text-white font-semibold text-base">
                  {user.displayName}
                </Text>
              )}
              <Text className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</Text>
            </View>
          </View>
        </View>

        <SettingsSection title={t("general")} icon="options-outline">
          <SettingsItem
            title={t("profile")}
            subtitle={t("edit_info")}
            icon="person"
            onPress={() => router.push("/(app)/profile")}
          />
          <SettingsItem
            title={t("notifications")}
            subtitle={t("manage_alerts")}
            icon="notifications"
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#404040", true: "#6366f1" }}
                thumbColor={"#ffffff"}
              />
            }
          />
          <SettingsItem
            title={t("language")}
            subtitle={i18n.language === "es" ? t("spanish") : t("english")}
            icon="language"
            onPress={() => setLanguageModalVisible(true)}
            isLast
          />
        </SettingsSection>

        <SettingsSection title={t("appearance")} icon="color-palette-outline">
          <SettingsItem
            title={t("dark_mode")}
            icon="moon-outline"
            onPress={toggleTheme}
            isLast
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#e5e7eb", true: "#6366f1" }}
                thumbColor={"#ffffff"}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title={t("support")} icon="help-circle-outline">
          <SettingsItem
            title={t("about")}
            subtitle={t("version", { version: "1.0.0" })}
            icon="information-circle"
            onPress={() => handleOpenLink("https://github.com/expo/expo")}
            isLast
          />
        </SettingsSection>

        <Pressable
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-600 py-4 rounded-2xl mt-2 mb-8 active:bg-red-700 shadow-lg"
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text className="text-white text-base font-bold ml-2">
            {t("log_out")}
          </Text>
        </Pressable>
      </ScrollView>

      {/* Language Bottom Sheet Modal */}
      <BottomSheetModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        title={t("language")}
      >
        <Pressable
          onPress={() => selectLanguage("en")}
          className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
            i18n.language === "en"
              ? "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
              : "bg-neutral-50 dark:bg-neutral-800 border border-transparent"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              i18n.language === "en"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-neutral-900 dark:text-white"
            }`}
          >
            {t("english")}
          </Text>
          {i18n.language === "en" && (
            <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
          )}
        </Pressable>

        <Pressable
          onPress={() => selectLanguage("es")}
          className={`flex-row items-center justify-between p-4 rounded-xl ${
            i18n.language === "es"
              ? "bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
              : "bg-neutral-50 dark:bg-neutral-800 border border-transparent"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              i18n.language === "es"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-neutral-900 dark:text-white"
            }`}
          >
            {t("spanish")}
          </Text>
          {i18n.language === "es" && (
            <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
          )}
        </Pressable>
      </BottomSheetModal>
    </Screen>
  );
}
