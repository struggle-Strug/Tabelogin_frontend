import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const edit = () => {
  const router = useRouter();
  const handleSave = () => {
    router.replace("/mypage");
  };
  return (
    <View className="flex-1">
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        画像設定
      </Text>
      <Text className="text-2xl text-center px-8 py-20 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        画像
      </Text>
      <Text className="text-2xl text-center px-8 py-40 border-2 border-[#343434] w-[80%] mx-auto mt-8"></Text>
      <View className="flex-row justify-center items-center w-full gap-4 mt-4">
        <CustomButton
          onPress={() => router.push("/mypage")}
          title="キャンセル"
          textStyles="text-lg text-center border-2 border-[#343434] px-4 py-2"
        />
        <CustomButton
          onPress={handleSave}
          title="保存"
          textStyles="text-lg text-center border-2 border-[#343434] px-4 py-2"
        />
      </View>
    </View>
  );
};

export default edit;
