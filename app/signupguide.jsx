import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";

import { useRouter } from "expo-router";

const signupguide = () => {
  const logoImage = require("@/assets/images/logo.png");

  const router = useRouter();
  const handleSignUpGuide = () => {
    router.replace("/onboarding");
  };
  return (
    <View className="flex-1 justify-start p-4">
      <View className="mt-12 flex flex-row justify-center">
        <ImageViewer
          imgSource={logoImage}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <View className="flex flex-col items-start py-6">
        <Text className="text-2xl text-left font-bold px-8 py-4 mx-auto mt-8 w-full">
          認証メールを送信しました
        </Text>
        <Text className="text-base text-disable text-left font-bold px-8 py-4 mx-auto mt-4 w-full">
          ご入力いただいたメールアドレスにメールアドレスの認証メールを送信しました。メールに記載されている認証リンクをクリックし、会員情報の本登録をお願いいたします。
        </Text>
      </View>
      <View className="px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto">
        <CustomButton
          onPress={handleSignUpGuide}
          title="メールに送られた認証メールのURLをクリック"
          textStyles="text-xl text-center"
        />
      </View>
    </View>
  );
};

export default signupguide;
