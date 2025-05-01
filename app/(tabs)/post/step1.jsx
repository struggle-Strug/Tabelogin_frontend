import React from "react";
import { FlatList, View } from "react-native";
import CustomButton from "@/components/CustomButton";

const Step1 = ({ imageArray, renderItem, setCaptureState }) => {
  return (
    <>
      <View className="flex-row justify-end p-2">
        <CustomButton onPress={() => setCaptureState(true)} iconName="camera" />
      </View>
      <FlatList
        data={imageArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Display images in 3 columns
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
    </>
  );
};

export default Step1;
