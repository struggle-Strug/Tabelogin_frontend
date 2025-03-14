import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const home = () => {
  return (
    <View className="flex-1 relative p-4">
      <Text className="absolute bg-white top-0 right-2 text-2xl text-center border-2 border-[#343434] mx-auto mt-8 z-10">
        ユーザー
      </Text>
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[90%] mx-auto mt-8">
        フォロー中のユーザーの投稿
      </Text>
      <View className="flex flex-col justify-start px-8 py-4 border-2 border-[#343434] w-[80%] min-h-40 mx-auto mt-8">
        <View className="flex flex-row gap-4">
          <View className="rounded-full min-h-12 aspect-[1/1] border-2 border-[#343434]"></View>
          <View className="w-[60%] flex items-center justify-center">
            <CustomButton
              onPress={() => router.push("/mypage")}
              title="名前"
              textStyles=" border-2 border-[#343434] flex items-center justify-center px-8 py-4"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default home;
