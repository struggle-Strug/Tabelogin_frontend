import { View, Text } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/contexts/AuthContext";

export default function MyPage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <View className="flex-1 relative p-4">
      <Text className="absolute bg-white top-0 right-2 text-2xl text-center border-2 border-[#343434] mx-auto mt-8 z-10">
        ユーザー
      </Text>
      <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[80%] mx-auto mt-8">
        食べログ×インスタ
      </Text>
      <View className="flex flex-row justify-center gap-4 p-8">
        <View className="flex flex-col items-center w-1/3">
          <View className="rounded-full min-h-24 aspect-[1/1] border-2 border-[#343434]"></View>
          <CustomButton
            onPress={() => router.push("/mypage/edit")}
            title="編集"
            textStyles="text-lg text-center border-2 border-[#343434] mt-2 px-2"
          />
        </View>
        <View className="flex flex-col items-start gap-2 w-2/3">
          <Text className="text-lg text-center border-2 border-[#343434] w-[50%]">
            名前
          </Text>
          <Text className="text-lg text-center border-2 border-[#343434] px-2">
            性別
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-2xl text-center px-8 py-4 border-2 border-[#343434] w-[50%] mx-auto mt-8">
          自己紹介
        </Text>
      </View>
    </View>
  );
}
