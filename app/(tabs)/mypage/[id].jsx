import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import womanAvatar from "@/assets/images/womanAvatar02.png";
import manAvatar from "@/assets/images/manAvatar02.png";
import editImage from "@/assets/images/editImage.png"; // Edit image
import logoImage from "@/assets/images/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const userProfile = () => {
  const { user: authUser } = useAuth();
  const { id } = useLocalSearchParams();
  const [imageArray, setImageArray] = useState([]);
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [followStatus, setFollowStatus] = useState(false);

  // Render function for each image in the FlatList
  const renderItem = ({ item }) => {
    return (
      <View className="w-1/3">
        <ImageViewer
          imgSource={{ uri: item }}
          imageStyle={{ width: "100%", height: 150 }}
        />
      </View>
    );
  };

  const getImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post/images/${id}`
      );
      if (response.data.error) return;
      setImageArray(response.data);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/${id}`
      );
      if (response.data.error) return;
      setUser(response.data);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const follow = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/follow`,
        { follow_id: id, follower_id: authUser?.id }
      );
      if (response.data.error) return;
      setFollowStatus(true);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const unfollow = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/follow/unfollow`,
        { follow_id: id, follower_id: authUser?.id }
      );
      if (response.data.error) return;
      setFollowStatus(false);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const checkFollowStatus = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/follow/check`,
        { follow_id: id, follower_id: authUser?.id }
      );
      if (response.data.error) return;
      setFollowStatus(response.data.follow_status);
      console.log(response.data.follow_status);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/info/${id}`
      );
      if (response.data.error) return;
      setUserInfo(response.data);
    } catch {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  useEffect(() => {
    getImages();
    getUserData();
    checkFollowStatus();
    getUserInfo();
  }, []);
  return (
    <View className="flex-1 justify-start">
      <View className="mt-12 flex flex-row justify-center">
        <ImageViewer
          imgSource={logoImage}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <View className="flex-row items-start gap-3 p-6">
        <View className="relative">
          {/* Make the entire Avatar clickable */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/mypage/edit")} // Replace with navigation to edit page
          >
            <ImageViewer
              imgSource={user?.image ? { uri: user?.image } : manAvatar}
              imageStyle={{ width: 60, height: 60, borderRadius: 30 }} // Round avatar
            />

            {/* Edit Icon on top of Avatar */}
            <View className="absolute bottom-0 right-0 bg-white rounded-full p-1">
              <ImageViewer
                imgSource={editImage}
                imageStyle={{ width: 20, height: 20 }} // Size of the edit icon
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-col pt-2 gap-2">
          <Text className="text-base font-bold">{user?.name}</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-lg text-black">
              {userInfo?.content_count}
            </Text>
            <Text className="text-base text-[#343434]">投稿</Text>
            <View className="w-4" />
            <Text className="font-bold text-lg text-black">
              {userInfo?.follower_count}
            </Text>
            <Text className="text-base text-[#343434]">フォロワー</Text>
            <View className="w-4" />
            <Text className="font-bold text-lg text-black">
              {userInfo?.follow_count}
            </Text>
            <Text className="text-base text-[#343434]">フォロー中</Text>
          </View>
        </View>
      </View>
      <View className="px-6 mb-4">
        <Text className="text-base text-center border-[#343434] py-4">
          自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。自己紹介文が入ります。
        </Text>
        <CustomButton
          onPress={() => (followStatus ? unfollow() : follow())}
          title={followStatus ? "フォロー中" : "フォロー"}
          iconColor={followStatus ? "black" : "white"}
          iconName={followStatus ? "user-check" : "user-plus"} // Pass the desired icon name (from Feather or other libraries)
          containerStyles={`rounded-full border-2 border-[#343434] px-4 py-2 mt-4 ${
            followStatus ? "bg-white" : "bg-black"
          }`}
          textStyles={`text-center ${
            followStatus ? "text-black" : "text-white"
          }`}
        />
      </View>

      {/* FlatList for Images */}
      <FlatList
        data={imageArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Display images in 3 columns
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
    </View>
  );
};

export default userProfile;
