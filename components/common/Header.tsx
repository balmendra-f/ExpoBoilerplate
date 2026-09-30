import { FC, Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const Header: FC<{
  title?: string;
  renderCenter?: any;
  renderRight?: any;
  canGoBack?: boolean;
}> = ({ title, renderCenter, renderRight, canGoBack = true }) => {
  const { colorScheme } = useColorScheme();

  return (
    <Fragment>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <View className="flex flex-row items-center p-4 bg-gray-50 dark:bg-[#171717] ">
        <View className="flex-1">
          {canGoBack && (
            <Ionicons
              name="chevron-back"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={router.back}
            />
          )}
        </View>
        <Text className="text-black dark:text-white text-xl font-bold ml-4">
          {renderCenter ? renderCenter() : title}
        </Text>
        <View className="flex-1">{renderRight?.()}</View>
      </View>
    </Fragment>
  );
};

export default Header;
