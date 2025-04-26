import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import { router } from "expo-router";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import Step1 from "./step1";

const Post = () => {
  const { user } = useAuth();
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]); // Store selected image indexes instead of URIs
  const [currentIndex, setCurrentIndex] = useState(0); // Track the currently visible image index
  const scrollViewRef = useRef(null); // Reference for the ScrollView
  const [step, setStep] = useState(1);
  const [captureState, setCaptureState] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [type, setType] = useState("back");
  const [flash, setFlash] = useState("off");
  // const [imageArray, setImageArray] = useState([]); // Store images from the gallery
  const [comment, setComment] = useState("");
  const cameraRef = useRef(null);

  const imageArray = [
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
    "http://142.132.202.228:7000/uploads/1745686442624.jpeg",
  ];

  const handleNext = () => {
    if (selectedImageIndexes.length === 0) return;
    setStep(2);
  };

  const handleClose = () => {
    setSelectedImageIndexes([]);
    setStep(1);
    router.back();
  };

  // Handle image selection and store the index
  const handleImageSelect = (index) => {
    const isSelected = selectedImageIndexes.includes(index);
    if (isSelected) {
      setSelectedImageIndexes(selectedImageIndexes.filter((i) => i !== index)); // Deselect image by index
    } else {
      setSelectedImageIndexes([...selectedImageIndexes, index]); // Add the selected index to the list
    }
  };

  const fetchImages = async () => {
    const result = await MediaLibrary.getAssetsAsync({ photo });
    // setImageArray(result);
  };

  // Handle ScrollView scroll and update the current index
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageWidth = 400; // Image width
    const newIndex = Math.floor(contentOffsetX / imageWidth);
    setCurrentIndex(newIndex);
  };

  // Render selected images as a carousel
  const renderSelectedImages = () => {
    return selectedImageIndexes.map((index) => (
      <ImageViewer
        key={index}
        imgSource={{ uri: imageArray[index] }}
        imageStyle={{ width: 400, height: 300 }}
      />
    ));
  };

  // Render slide indicators (dots) based on the number of selected images
  const renderSlideIndicators = () => {
    return selectedImageIndexes.map((_, index) => (
      <View
        key={index}
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: currentIndex === index ? "#343434" : "#D3D3D3", // Darker for active
          marginRight: 6,
        }}
      />
    ));
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedImageIndexes.includes(index); // Check if the current item is selected
    return (
      <TouchableOpacity
        style={{
          width: "33.33%", // Each image takes up 1/3 of the container width
          aspectRatio: 1, // Maintain aspect ratio of 1:1 for images
        }}
        onPress={() => handleImageSelect(index)} // Pass index instead of URI
      >
        <View className="w-full relative">
          <ImageViewer
            imgSource={{ uri: item }}
            imageStyle={{
              width: "100%",
              height: 150,
              opacity: isSelected ? 0.5 : 1, // Darken the background if selected
            }}
          />
          {isSelected && (
            <View
              style={{
                position: "absolute",
                top: 5,
                left: 5,
                backgroundColor: "#343434",
                borderRadius: 15,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {selectedImageIndexes.indexOf(index) + 1}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handlePost = async () => {
    const contentData = {
      user_id: user?.id,
      title: "",
      content: comment,
    };
    const response_1 = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/post`,
      contentData
    );
    if (response_1.data.error) return;
    const imageData = {
      image_url: selectedImageIndexes.map((index) => imageArray[index]),
      content_id: response_1.data.content.id,
    };

    const response_2 = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/image`,
      imageData
    );
    if (response_2.data.error) return;
    setComment("");
    setSelectedImageIndexes([]);
    setStep(1);
    router.push("/home");
  };

  useEffect(() => {
    if (captureState) {
      (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === "granted");
      })();
    }
    fetchImages();
  }, [captureState]);

  return (
    <View className="flex-1">
      {captureState && (
        <View className="flex-1">
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={cameraRef}
            flashMode={flash}
          >
            <Text>qweqwe</Text>
          </Camera>
        </View>
      )}
      {!captureState && (
        <>
          <View className="border-b-[0.5px] flex-row justify-between p-4">
            {step === 1 && <CustomButton onPress={handleClose} iconName="x" />}
            {step === 2 && (
              <CustomButton
                onPress={() => setStep(1)}
                title=""
                iconName="chevron-left"
              />
            )}
            <Text
              className={`text-xl font-bold text-[#343434] ${
                step === 2 && "w-full text-center pr-16"
              }`}
            >
              新規投稿
            </Text>
            {step === 1 && (
              <CustomButton
                onPress={handleNext}
                title="次へ"
                textStyles="font-bold text-[#003CFF]"
              />
            )}
          </View>

          {/* Render selected images as a carousel */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <View style={{ flexDirection: "row", minHeight: 300 }}>
                {renderSelectedImages()}
              </View>
            </ScrollView>
          </View>

          {/* Render Slide Indicators */}
          <View className="flex-row justify-center min-h-8 mt-2">
            {renderSlideIndicators()}
          </View>

          {step === 1 && (
            <Step1
              imageArray={imageArray}
              renderItem={renderItem}
              setCaptureState={setCaptureState}
            />
          )}
          {step === 2 && (
            <>
              <View className="flex-col items-center w-full">
                <TextInput
                  value={comment}
                  placeholder="コメントを追加"
                  onChangeText={(value) => setComment(value)}
                  className={`text-lg px-2 py-2 border-[1px]
                      border-[#343434] bg-transparent
                    w-[90%] min-h-60 rounded-md mt-2`}
                  style={{ textAlignVertical: "top" }} // ✅ Add this to align text to the top
                />
                <CustomButton
                  onPress={handlePost}
                  iconName="plus-circle"
                  iconColor="#fff"
                  title="投稿"
                  containerStyles="bg-primary rounded-full w-[90%] mt-8"
                  textStyles="text-base text-center py-2 text-white"
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Post;
