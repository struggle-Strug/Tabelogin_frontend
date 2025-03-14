import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const post = () => {
  const handleNext = () => {
    router.push("/post/preview");
  };
  return (
    <View className="flex-1 relative p-4">
      <Text className="absolute bg-white top-0 right-2 text-2xl text-center border-2 border-[#343434] mx-auto mt-8 z-10">
        ユーザー
      </Text>
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        新規投稿
      </Text>
      <Text className="text-2xl text-center px-8 py-20 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        写真
      </Text>
      <View className="text-2xl text-center px-8 min-h-60 border-2 border-[#343434] w-[80%] mx-auto mt-8"></View>
      <View className="flex flex-row items-center justify-center gap-4 mt-8">
        <CustomButton
          onPress={() => router.push("/mypage")}
          title="キャンセル"
          textStyles=" border-2 border-[#343434] flex items-center justify-center px-8 py-2"
        />
        <CustomButton
          onPress={handleNext}
          title="次へ"
          textStyles=" border-2 border-[#343434] flex items-center justify-center px-8 py-2"
        />
      </View>
    </View>
  );
};

export default post;
