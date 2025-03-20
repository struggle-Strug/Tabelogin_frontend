import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import { useAuth } from "@/contexts/AuthContext";
import { saveToken } from "@/utils/secureStore";

const signin = () => {
  const logoImage = require("@/assets/images/logo.png");
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const handleSignin = async () => {
    if (!email.includes("@"))
      return setErrorEmailMessage("メールアドレスを正確に入力してください。");
    setErrorEmailMessage("");
    if (password.length < 6)
      return setErrorPasswordMessage("6文字以上入力してください。");
    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/signin`,
      userData
    );
    if (response.data.error) return;

    // After signup, go to the dashboard
    await saveToken(response.data.token); // ✅ Save token securely
    await setUser(response.data.user);
    router.replace("/mypage"); // ✅ Navigate after login
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
          Ditectにログイン
        </Text>
        <View className="w-full px-8">
          <Text className="text-base text-left py-4 mx-auto mt-2 w-full">
            メールアドレス
          </Text>
          <TextInput
            placeholder="メールアドレス"
            onChangeText={(value) => setEmail(value)}
            className="text-lg px-2 py-2 border-2 border-[#343434] w-full"
          />
          {errorEmailMessage && (
            <Text className="text-base text-left text-warning mx-auto mt-2 w-full">
              {errorEmailMessage}
            </Text>
          )}
        </View>
        <View className="w-full px-8">
          <Text className="text-base text-left py-4 mx-auto mt-2 w-full">
            パスワード（半角英数字６文字以上）
          </Text>
          <TextInput
            secureTextEntry={true}
            placeholder="パスワード"
            onChangeText={(value) => setPassword(value)}
            className="text-lg px-2 py-2 border-2 border-[#343434] w-full"
          />
          {errorPasswordMessage && (
            <Text className="text-base text-left text-warning mx-auto mt-2 w-full">
              {errorPasswordMessage}
            </Text>
          )}
        </View>
        <View className="flex flex-row justify-center w-full">
          <CustomButton
            onPress={() => handleSignin()}
            title="ログイン"
            containerStyles="w-[80%]"
            textStyles="text-base text-center w-full py-4 bg-primary text-white rounded-full mt-12"
          />
        </View>
      </View>
    </View>
  );
};

export default signin;
