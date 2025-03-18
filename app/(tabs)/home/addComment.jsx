import {
  Modal,
  Pressable,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageViewer from "@/components/ImageViewer"; // Make sure ImageViewer works for images
import womanAvatar from "@/assets/images/womanAvatar.png";
import manAvatar from "@/assets/images/manAvatar.png";
import line from "@/assets/images/Line.png";
import React from "react";

const AddComment = ({ modalVisible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* Background Overlay */}
      <Pressable
        className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"
        onPress={onClose} // Close modal when background is tapped
      />

      {/* Modal Content at the Bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg">
        {/* Modal Header */}
        <View className="flex-col items-center mb-4 border-b-[0.5px] gap-2 py-2">
          <ImageViewer
            imgSource={line}
            imageStyle={{ width: 40, marginTop: 8 }}
          />
          <Text className="text-lg font-bold mt-2 mb-4">コメント</Text>
        </View>

        {/* Comment Example */}
        <View className="flex-col p-6 w-[88%]">
          <View className="flex-row items-start gap-3">
            <ImageViewer
              imgSource={womanAvatar}
              imageStyle={{ width: 40, height: 40 }} // Round the avatar
            />
            <View>
              <Text className="text-base font-bold">jiro sato</Text>
              <Text className="text-base text-gray-600">
                コメントが入ります。コメントが入ります。コメントが入ります。コメントが入ります。
              </Text>
            </View>
          </View>
        </View>

        {/* Input Field for New Comment */}
        <View className="flex flex-row items-center justify-start gap-2 w-full p-6 border-t-[0.5px] border-gray-200">
          <ImageViewer
            imgSource={manAvatar}
            imageStyle={{ width: 40, height: 40, borderRadius: 20 }} // Round the avatar
          />
          <TextInput
            placeholder="コメントを入力..."
            className="border border-gray-300 rounded-md px-3 py-2 w-3/4"
            style={{ height: 40 }} // Adjust the height for the input box
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full justify-center items-center p-3 bg-primary"
            onPress={() => {
              console.log("Send Comment"); // Add your logic for sending the comment here
            }}
          >
            <Ionicons name="send-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddComment;
