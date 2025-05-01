import {
  Modal,
  Pressable,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageViewer from "@/components/ImageViewer";
import womanAvatar from "@/assets/images/womanAvatar.png";
import manAvatar from "@/assets/images/manAvatar.png";
import line from "@/assets/images/Line.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

// Change prop name from id to postId to match what we're passing from the parent
const AddComment = ({ modalVisible, onClose, postId }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments when the modal opens and postId changes
  useEffect(() => {
    if (modalVisible && postId) {
      fetchComments();
    }
  }, [modalVisible, postId]);

  const fetchComments = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post/comments/${postId}`
      );
      setComments(response.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!comment.trim() || !postId) return;
    try {
      setSubmitting(true);
      const commentData = {
        content_id: postId,
        user_id: user?.id,
        comment: comment,
      };
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post/comments/${postId}`,
        commentData
      );
      // Clear input and refresh comments
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error sending comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* Background Overlay */}
      <Pressable
        className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-20"
        onPress={onClose}
      />

      {/* Modal Content at the Bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg max-h-[70%]">
        {/* Modal Header */}
        <View className="flex-col items-center mb-4 border-b-[0.5px] gap-2 py-2">
          <ImageViewer
            imgSource={line}
            imageStyle={{ width: 40, marginTop: 8 }}
          />
          <Text className="text-lg font-bold mt-2 mb-4">コメント</Text>
        </View>

        {/* Comments Section - Scrollable */}
        <ScrollView className="flex-1 max-h-[300px]">
          {loading ? (
            <View className="py-4 items-center">
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <View key={comment.id || index} className="flex-col p-6 w-[88%]">
                <View className="flex-row items-start gap-3">
                  <ImageViewer
                    imgSource={
                      comment.user?.avatar
                        ? { uri: comment.user.avatar }
                        : womanAvatar
                    }
                    imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                  <View>
                    <Text className="text-base font-bold">
                      {comment.user?.name || "Anonymous"}
                    </Text>
                    <Text className="text-base text-gray-600">
                      {comment.comment}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="py-4 items-center">
              <Text className="text-gray-500">No comments yet</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Field for New Comment */}
        <View className="flex flex-row items-center justify-start gap-2 w-full p-6 border-t-[0.5px] border-gray-200">
          <ImageViewer
            imgSource={manAvatar}
            imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <TextInput
            placeholder="コメントを入力..."
            className="border border-gray-300 rounded-md px-3 py-2 flex-1"
            style={{ height: 40 }}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full justify-center items-center p-3 bg-primary"
            onPress={handleSendComment}
            disabled={submitting || !comment.trim()}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send-outline" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddComment;
