import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheetModal = ({
  visible,
  onClose,
  title,
  children,
}: BottomSheetModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
      <View
        className="bg-white dark:bg-neutral-900 rounded-t-3xl p-6 pb-12 w-full shadow-xl border-t border-neutral-200 dark:border-neutral-800"
        onStartShouldSetResponder={() => true}
      >
        <View className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full self-center mb-6" />

        {title && (
          <Text className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
            {title}
          </Text>
        )}

        {children}
      </View>
    </Pressable>
  </Modal>
);

export default BottomSheetModal;
