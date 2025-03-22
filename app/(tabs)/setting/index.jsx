import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import { removeToken } from "@/utils/secureStore";

const setting = () => {
  const handleLogout = async () => {
    await removeToken();
    router.replace("/signin");
  };
  return (
    <View className="flex-1 p-4">
      <View className="w-full flex-row justify-start p-6 border-b-[0.5px]">
        <CustomButton
          onPress={() => router.back()}
          title=""
          iconName="chevron-left"
        />
        <View className="w-[80%] flex-row justify-center items-center gap-2">
          <Feather name="settings" size={20} color="black" />
          <Text className="text-xl font-bold text-[#343434]">設定</Text>
        </View>
      </View>
      <View className="p-4">
        <TouchableOpacity onPress={() => {}}>
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row gap-2">
              <Feather name="bell" size={24} color="#343434" />
              <Text className="text-xl text-center border-[#343434]">
                お知らせ
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#343434" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/mypage/edit")}>
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row gap-2">
              <Feather name="edit-2" size={24} color="#343434" />
              <Text className="text-xl text-center border-[#343434]">
                プロフィール編集
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#343434" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row gap-2">
              <Feather name="headphones" size={24} color="#343434" />
              <Text className="text-xl text-center border-[#343434]">
                ヘルプ
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#343434" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row gap-2">
              <Feather name="log-out" size={24} color="#343434" />
              <Text className="text-xl text-center border-[#343434]">
                ログアウト
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#343434" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default setting;
