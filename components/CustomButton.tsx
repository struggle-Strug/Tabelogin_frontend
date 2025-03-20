import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons"; // Use Feather or any icon library

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
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center flex-row gap-2 ${containerStyles}`}
      onPress={onPress}
    >
      {/* Icon */}
      {iconName && <Feather name={iconName} size={20} color="#343434" />}
      {/* Text */}
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
