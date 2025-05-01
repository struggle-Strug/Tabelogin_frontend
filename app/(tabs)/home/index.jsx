import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import AddComment from "@/app/(tabs)/home/addComment";
import { router } from "expo-router";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track which post's modal is open
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const logoImage = require("@/assets/images/logo.png");
  const womanAvatar = require("@/assets/images/womanAvatar.png");
  const postImage = require("@/assets/images/postImage.png");

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [commentModalVisible]);

  // Function to open comment modal for a specific post
  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  };

  // Function to close comment modal
  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

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
                    uri: p.images[0],
                  }}
                  imageStyle={{ width: "100%", height: 300 }}
                />
                <View className="flex flex-row justify-start items-center gap-2 px-4 mt-2">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full justify-center items-center p-3 bg-second"
                    onPress={() => {}}
                  >
                    <Feather name="thumbs-up" size={24} color="#343434" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full justify-center items-center p-3 bg-second"
                    onPress={() => openCommentModal(p.id)}
                  >
                    <Feather name="message-circle" size={24} color="#343434" />
                  </TouchableOpacity>
                  <Text className="text-lg text-primary">
                    {p.comments.length}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ONLY ONE modal component for the entire screen */}
      <AddComment
        modalVisible={commentModalVisible}
        onClose={closeCommentModal}
        postId={selectedPostId}
      />
    </View>
  );
};

export default Home;
