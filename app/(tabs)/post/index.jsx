import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Step1 from "./step1";

const Post = () => {
  const { user } = useAuth();
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]); // Store selected image indexes instead of URIs
  const [currentIndex, setCurrentIndex] = useState(0); // Track the currently visible image index
  const scrollViewRef = useRef(null); // Reference for the ScrollView
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (selectedImageIndexes.length === 0) return;
    setStep(2);
  };

  const handleClose = () => {
    setSelectedImageIndexes([]);
    setStep(1);
    router.back();
  };

  const imageArray = [
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffrontend-786d8f1f-1630-4e59-89ea-2d4f39b2cb20/ImagePicker/c8de197e-78af-420e-bf2c-93090b012faa.jpeg",
  ];

  // Handle image selection and store the index
  const handleImageSelect = (index) => {
    const isSelected = selectedImageIndexes.includes(index);
    if (isSelected) {
      setSelectedImageIndexes(selectedImageIndexes.filter((i) => i !== index)); // Deselect image by index
    } else {
      setSelectedImageIndexes([...selectedImageIndexes, index]); // Add the selected index to the list
    }
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

  return (
    <View className="flex-1">
      <View className="border-b-[0.5px] flex-row justify-between p-4">
        <CustomButton onPress={handleClose} iconName="x" />
        <Text className="text-xl font-bold text-[#343434]">新規投稿</Text>
        <CustomButton
          onPress={handleNext}
          title="次へ"
          textStyles="font-bold text-[#003CFF]"
        />
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
          <View style={{ flexDirection: "row", minHeight: 350 }}>
            {renderSelectedImages()}
          </View>
        </ScrollView>
      </View>

      {/* Render Slide Indicators */}
      <View className="flex-row justify-center min-h-8">
        {renderSlideIndicators()}
      </View>
      {step === 1 && <Step1 imageArray={imageArray} renderItem={renderItem} />}
    </View>
  );
};

export default Post;
