import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons"; // Use Feather or any icon library
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  iconName?: string; // Icon name as string
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  onPress,
  title,
  iconName,
  iconColor = "#343434",
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`rounded-xl justify-center items-center flex-row gap-2 ${containerStyles}`}
      onPress={onPress}
    >
      {/* Icon */}
      {iconName && <Feather name={iconName} size={24} color={iconColor} />}
      {/* Text */}
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
