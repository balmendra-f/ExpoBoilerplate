import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useScreen } from "@/providers/ScreenProvider";
import { auth } from "@/firebase";
import Screen from "@/components/common/Screen";
import InputField from "@/components/common/InputField";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { setIsLoading } = useScreen();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value.trim() }));
  };

  const onSubmit = async () => {
    setError(false);
    if (formData.password.length < 6) {
      setError(true);
      setErrorMessage(t("password_length"));
      return;
    }
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.replace("/");
    } catch {
      Alert.alert(t("error_title"), t("invalid_credentials"), [{ text: t("ok") }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isIncomplete = !formData.email.trim() || formData.password.length < 6;

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 justify-center py-8">
          {/* Logo */}
          <View className="items-center mb-12">
            <View className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center border border-indigo-200 dark:border-indigo-500/30 mb-6">
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                resizeMode="contain"
              />
            </View>
            <Text className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-2">
              {t("welcome_back")}
            </Text>
            <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
              {t("sign_in_to_continue")}
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <InputField
              icon="mail-outline"
              placeholder={t("email_address")}
              value={formData.email}
              onChangeText={(v: string) => handleChange("email", v)}
              keyboardType="email-address"
            />
            <InputField
              icon="lock-closed-outline"
              placeholder={t("password")}
              value={formData.password}
              onChangeText={(v: string) => handleChange("password", v)}
              secureTextEntry
            />
            <Pressable
              onPress={() => router.push("/(auth)/forgot")}
              className="self-end"
            >
              <Text className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {t("forgot_password")}
              </Text>
            </Pressable>

            {error && (
              <View className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mt-4 flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text className="text-red-400 text-sm ml-2 flex-1">
                  {errorMessage}
                </Text>
              </View>
            )}
          </View>

          {/* Submit */}
          <Pressable
            onPress={onSubmit}
            disabled={isIncomplete}
            className={`rounded-2xl p-4 items-center mb-6 shadow-lg ${
              isIncomplete
                ? "bg-neutral-200 dark:bg-neutral-700"
                : "bg-indigo-600 active:bg-indigo-700"
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons name="log-in-outline" size={20} color="#fff" />
              <Text className="text-white text-base font-bold ml-2">
                {t("sign_in")}
              </Text>
            </View>
          </Pressable>

          {/* Footer */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-500 dark:text-gray-400 text-sm">
              {t("dont_have_account")}{" "}
            </Text>
            <Pressable onPress={() => router.push("/(auth)/signUp")}>
              <Text className="text-indigo-400 text-sm font-bold">
                {t("sign_up")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
