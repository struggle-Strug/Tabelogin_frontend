import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { router, useRouter } from "expo-router";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";

const onboarding = () => {
  const logoImage = require("@/assets/images/logo.png");

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const router = useRouter();
  const handleOnBoarding = async () => {
    if (!name) return setErrorNameMessage("名前を入力してください。");
    const userData = {
      name: name,
      birthday: `${year}-${month}-${day}`,
      introduction: introduction,
    };

    const response = await axios.put(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user`,
      userData
    );
    if (response.data.error) return;
    router.replace("/mypage");
  };
  return (
    <View className="flex-1">
      <View className="mt-12 flex flex-row justify-center">
        <ImageViewer
          imgSource={logoImage}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <View className="flex flex-col items-start py-6">
        <Text className="text-2xl text-left font-bold px-8 py-4 mx-auto mt-8 w-full">
          本登録を完了する
        </Text>
        <View className="w-full px-8">
          <View className="flex flex-row gap-2 items-end">
            <Text className="text-base">名前</Text>
            <Text className="text-xs text-warning">(必須)</Text>
          </View>
          <TextInput
            placeholder="山田 太郎"
            onChangeText={(value) => setName(value)}
            className={`text-lg px-2 py-2 border-2 ${
              errorNameMessage
                ? "border-warning bg-[#ffa2aa]"
                : "border-[#343434] bg-transparent"
            } w-full rounded-md mt-2`}
          />

          {errorNameMessage && (
            <Text className="text-base text-left text-warning mx-auto mt-2 w-full">
              {errorNameMessage}
            </Text>
          )}
        </View>
        <View className="w-full px-8 mt-2">
          <View className="flex flex-row gap-2 items-end">
            <Text className="text-base">生年月日</Text>
          </View>
          <View className="flex flex-row gap-2 items-end justify-start">
            <TextInput
              onChangeText={(value) => setYear(value)}
              className={`text-base px-2 py-2 border-2 border-[#343434] rounded-md mt-2 w-1/4`}
            />
            <Text className="text-base">年</Text>
            <TextInput
              onChangeText={(value) => setMonth(value)}
              className={`text-base px-2 py-2 border-2 border-[#343434] rounded-md mt-2 w-1/4`}
            />
            <Text className="text-base">月</Text>
            <TextInput
              onChangeText={(value) => setDay(value)}
              className={`text-base px-2 py-2 border-2 border-[#343434] rounded-md mt-2 w-1/4`}
            />
            <Text className="text-base">日</Text>
          </View>
          <Text className="text-base mt-2">自己紹介</Text>

          <TextInput
            multiline
            mode="outlined"
            numberOfLines={4}
            placeholder="自己紹介"
            onChangeText={(value) => setIntroduction(value)}
            className="text-base px-2 py-2 border-2 border-[#343434] rounded-md mt-2 w-full mx-auto min-h-40"
            style={{ textAlignVertical: "top" }} // ✅ Add this to align text to the top
          />
          <View className="flex flex-row justify-center w-full mt-4">
            <CustomButton
              onPress={handleOnBoarding}
              title="本登録"
              containerStyles="w-full"
              textStyles={`text-base text-center w-full py-4 bg-second ${
                name ? "text-primary" : "text-disable"
              } rounded-full mt-2`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default onboarding;
