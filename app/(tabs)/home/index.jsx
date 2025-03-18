import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import AddComment from "@/app/(tabs)/home/addComment";
import { router } from "expo-router";

const home = () => {
  const logoImage = require("@/assets/images/logo.png");
  const womanAvatar = require("@/assets/images/womanAvatar.png");
  const postImage = require("@/assets/images/postImage.png");
  const [addCommentModal, setAddCommentModal] = useState(false);
  return (
    <View className="flex-1 justify-start">
      <View className="mt-12 flex flex-row justify-center">
        <ImageViewer
          imgSource={logoImage}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <View className="flex flex-row items-center gap-2 px-6">
        <ImageViewer
          imgSource={womanAvatar}
          imageStyle={{ width: 28, height: 28 }}
        />
        <Text className="text-base font-bold">hanako tanaka</Text>
      </View>
      <View className="mt-2">
        <ImageViewer imgSource={postImage} imageStyle={{ width: "100%" }} />
        <View className="flex flex-row justify-start items-center gap-2 px-4 mt-2">
          <TouchableOpacity
            activeOpacity={0.7}
            className={`rounded-full justify-center items-center p-3 bg-second`}
            onPress={() => {}}
          >
            <Feather name="thumbs-up" size={24} color="#343434" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className={`rounded-full justify-center items-center p-3 bg-second`}
            onPress={() => setAddCommentModal(true)}
          >
            <Feather name="message-circle" size={24} color="#343434" />
          </TouchableOpacity>
          <Text className="text-lg text-primary">7</Text>
        </View>
        <AddComment
          modalVisible={addCommentModal}
          onClose={() => setAddCommentModal(false)}
        />
      </View>
    </View>
  );
};

export default home;
