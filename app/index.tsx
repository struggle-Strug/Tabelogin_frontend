import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/secureStore";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import { useAuth } from "@/contexts/AuthContext";

import "@/global.css";
import { router, usePathname, useRouter } from "expo-router";

const App = () => {
  const logoImage = require("@/assets/images/logo.png");
  const { setUser, setIsAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get the current route

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/tokenlogin`
      );
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };
  const checkLogin = async () => {
    const token = await getToken();
    console.log("token in APP", token);

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      getUserData();
    } else if (
      !token &&
      pathname !== "/" &&
      pathname !== "/signup" &&
      pathname !== "/signupguide" &&
      pathname !== "/onboarding"
    ) {
      router.replace("/signin"); // Redirect to Signin page
    }
    setLoading(false);
  };

  useEffect(() => {
    checkLogin();
  }, [pathname]);

  return (
    <View className="flex-1 justify-center items-center">
      <ImageViewer
        imgSource={logoImage}
        imageStyle={{ width: 120, height: 120 }}
      />
      <Text className="text-2xl text-primay mt-2">Ditect</Text>
      <CustomButton
        onPress={() => router.push("/signup")}
        title="新規登録"
        containerStyles="w-[80%]"
        textStyles="text-base text-center w-full py-4 bg-primary text-white rounded-full mt-12"
      />
      <Text className="text-base text-primay mt-16">
        既にアカウントをお持ちの方
      </Text>

      <CustomButton
        onPress={() => router.push("/signin")}
        title="ログイン"
        containerStyles="w-[80%]"
        textStyles="text-base text-center w-full py-4 bg-second text-primary rounded-full mt-2"
      />
    </View>
  );
};

export default App;
