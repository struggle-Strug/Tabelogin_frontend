import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import AddComment from "@/app/(tabs)/home/addComment";
import { router } from "expo-router";
import axios from "axios";

const home = () => {
  const [posts, setPosts] = useState([]);
  const [addCommentModal, setAddCommentModal] = useState(false);

  const logoImage = require("@/assets/images/logo.png");
  const womanAvatar = require("@/assets/images/womanAvatar.png");
  const postImage = require("@/assets/images/postImage.png");

  const getPosts = async () => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post`
    );
    // if (response.error) return;
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View className="flex-1 justify-start">
      <View className="mt-12 flex flex-row justify-center">
        <ImageViewer
          imgSource={logoImage}
          imageStyle={{ width: 60, height: 60 }}
        />
      </View>
      <ScrollView>
        <View className="flex-col gap-4">
          {posts?.map((p, index) => (
            <>
              <View key={p.id || index}>
                <View className="flex flex-row items-center gap-2 px-6">
                  <ImageViewer
                    imgSource={{ uri: p.user.avatar }}
                    imageStyle={{ width: 32, height: 32, borderRadius: 9999 }}
                  />
                  <Text className="text-base font-bold">{p.user.name}</Text>
                </View>
                <View className="mt-2">
                  <ImageViewer
                    imgSource={{
                      uri: "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
                    }}
                    imageStyle={{ width: "100%", height: 300 }}
                  />
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
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#343434"
                      />
                    </TouchableOpacity>
                    <Text className="text-lg text-primary">7</Text>
                  </View>
                  <AddComment
                    modalVisible={addCommentModal}
                    onClose={() => setAddCommentModal(false)}
                  />
                </View>
              </View>
            </>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default home;
