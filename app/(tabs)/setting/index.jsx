import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const setting = () => {
  return (
    <View className="flex-1 relative p-4">
      <Text className="absolute bg-white top-0 right-2 text-2xl text-center border-2 border-[#343434] mx-auto mt-8 z-10">
        ユーザー
      </Text>
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        食べログ×インスタ
      </Text>
      <CustomButton
        onPress={() => {}}
        title="お知らせ"
        textStyles="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8"
      />
      <CustomButton
        onPress={() => {}}
        title="プロフィール編集"
        textStyles="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8"
      />
      <CustomButton
        onPress={() => router.push("/dashboard")}
        title="ログアウト"
        textStyles="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8"
      />
      <CustomButton
        onPress={() => router.push("/help")}
        title="ヘルプ"
        textStyles="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8"
      />
    </View>
  );
};

export default setting;
