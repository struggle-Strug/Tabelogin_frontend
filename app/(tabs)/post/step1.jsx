import React from "react";
import { FlatList } from "react-native";

const Step1 = ({ imageArray, renderItem }) => {
  return (
    // Conditionally render FlatList for Images
    <FlatList
      data={imageArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3} // Display images in 3 columns
      contentContainerStyle={{ paddingHorizontal: 0 }}
    />
  );
};

export default Step1;
