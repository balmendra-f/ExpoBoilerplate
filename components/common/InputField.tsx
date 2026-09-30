import React from "react";
import { View, TextInput, KeyboardTypeOptions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const InputFieldComponent = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
}: InputFieldProps) => (
  <View className="mb-4">
    <View className="flex-row items-center bg-white dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700/50">
      <View className="pl-4 pr-3">
        <Ionicons name={icon} size={20} color="#9CA3AF" />
      </View>
      <TextInput
        className="flex-1 py-4 pr-4 text-neutral-900 dark:text-white text-base"
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        textContentType={secureTextEntry ? "oneTimeCode" : undefined}
        autoComplete="off"
      />
    </View>
  </View>
);

const InputField = React.memo(InputFieldComponent);
InputField.displayName = "InputField";

export default InputField;
