import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Keyboard } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { updateUser } from "@/api/users/updateUser";
import Screen from "@/components/common/Screen";
import Header from "@/components/common/Header";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ProfileForm
      key={`${user?.uid ?? "anonymous"}-${user?.displayName ?? ""}`}
      initialName={user?.displayName ?? ""}
    />
  );
}

function ProfileForm({ initialName }: { initialName: string }) {
  const { t } = useTranslation();
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(t("error_generic"), t("name_required"));
      return;
    }

    Keyboard.dismiss();
    setIsSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await updateUser(auth.currentUser.uid, { name });
        Alert.alert(t("success"), t("profile_updated"), [
          { text: t("ok"), onPress: () => router.back() }
        ]);
      }
    } catch {
      Alert.alert(t("error_generic"), t("error_updating_profile"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Screen>
      <Header title={t("edit_profile")} />
      <View className="flex-1 px-5 pt-8">
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 ml-1">
          {t("full_name")}
        </Text>
        <View
          className="flex-row items-center rounded-2xl border px-4 h-14 mb-8 bg-white dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/50"
        >
          <Ionicons name="person-outline" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-neutral-900 dark:text-white text-base ml-3"
            value={name}
            onChangeText={setName}
            placeholder={t("full_name")}
            placeholderTextColor="#6B7280"
            autoCapitalize="words"
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={isSaving || !name.trim()}
          className="rounded-2xl h-14 items-center justify-center flex-row shadow-lg"
          style={({ pressed }) => ({
            backgroundColor: isSaving || !name.trim() ? "#404040" : Colors.light.tint,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Ionicons name="save-outline" size={20} color="#ffffff" />
          <Text className="text-white text-base font-bold ml-2">
            {isSaving ? t("saving") : t("save")}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
