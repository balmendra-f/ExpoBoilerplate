import React, { useState } from "react";
import { View, TextInput, Text, Alert, Pressable } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useScreen } from "../../providers/ScreenProvider";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Header from "@/components/common/Header";
import Screen from "@/components/common/Screen";

export default function ForgotScreen() {
  const { t } = useTranslation();
  const auth = getAuth();
  const { setIsLoading } = useScreen();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const onSubmit = async () => {
    setIsLoading(true);
    if (!isValidEmail(email)) {
      setError(true);
      setErrorMessage(t("email_invalid"));
      setIsLoading(false);
      return;
    }
    setError(false);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        t("email_sent_title"),
        t("email_sent_message", { email }),
        [{ text: t("ok") }]
      );
      router.push("/(auth)");
    } catch {
      setError(true);
      setErrorMessage(t("error_reset_email"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <Header title={t("reset_password")} />
      <View className="flex-1 p-6 justify-center">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-2">
            {t("forgot_password_title")}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            {t("forgot_password_subtitle")}
          </Text>
        </View>

        <View className="mb-6">
          <TextInput
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-transparent rounded-xl p-4 mb-2 text-neutral-900 dark:text-white text-base"
            placeholder={t("email_address")}
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
          {error && (
            <Text className="text-red-400 text-sm mt-1">{errorMessage}</Text>
          )}
        </View>

        <Pressable
          onPress={onSubmit}
          className="bg-indigo-600 rounded-xl p-4 items-center mb-4 active:bg-indigo-700"
        >
          <Text className="text-white text-base font-semibold">{t("send_reset_link")}</Text>
        </Pressable>

        <View className="flex-row justify-center items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("remember_password")} </Text>
          <Pressable
            onPress={() => router.push("/(auth)")}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Text className="text-indigo-400 text-sm font-semibold">{t("sign_in")}</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
