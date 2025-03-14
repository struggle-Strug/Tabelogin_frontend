import { View, Text } from "react-native";
import React from "react";

const dashboard = () => {
  return (
    <View className="flex-1 relative p-4">
      <Text className="absolute bg-white top-0 right-2 text-2xl text-center border-2 border-[#343434] mx-auto mt-8 z-10">
        ユーザー
      </Text>
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        食べログ×インスタ
      </Text>
      <Text className="text-2xl text-center px-8 min-h-80 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        お知らせ
      </Text>
    </View>
  );
};

export default dashboard;
