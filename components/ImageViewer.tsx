import { Image, ImageSourcePropType } from "react-native";
import { ImageStyle, StyleProp } from "react-native";

type Props = {
  imgSource: ImageSourcePropType, // Updated to use ImageSourcePropType for react-native Image
  imageStyle?: StyleProp<ImageStyle>, // Use StyleProp<ImageStyle> to support arrays and mixed styles
};

export default function ImageViewer({ imgSource, imageStyle = {} }: Props) {
  return <Image source={imgSource} style={imageStyle} />;
}
