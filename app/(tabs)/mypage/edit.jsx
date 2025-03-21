import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import * as ImagePicker from "expo-image-picker"; // Expo Image Picker
import { useRouter } from "expo-router";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import ImageViewer from "@/components/ImageViewer";
import manAvatar from "@/assets/images/manAvatar02.png";
import { useAuth } from "@/contexts/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const [avatarUri, setAvatarUri] = useState(""); // State for avatar URI
  const [name, setName] = useState("");
  const [birthdayYear, setBirthdayYear] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const router = useRouter();

  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    (1900 + i).toString()
  );

  // Generate months (01 to 12)
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  // Generate days (01 to 31)
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const handleSave = async () => {
    if (name.trim() === "")
      return setErrorNameMessage("名前を入力してください。");
    const data = {
      image: avatarUri,
      name: name,
      birthday: `${birthdayYear}-${birthdayMonth}-${birthdayDay}`,
      introduction: introduction,
    };
    const response = await axios.put(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user`,
      data
    );
    if (response.data.error) return console.log(response.data.error);
    router.replace("/mypage");
  };

  // Ask for permission and launch the image picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setName(user?.name);
    setAvatarUri(user?.image);
    setBirthdayYear(user?.birthday.split("-")[0]);
    setBirthdayMonth(user?.birthday.split("-")[1]);
    setBirthdayDay(user?.birthday.split("-")[2]);
    setIntroduction(user?.introduce);
  }, []);

  return (
    <View className="flex-1 relative">
      <View className="w-full flex-row justify-start p-6 border-b-[0.5px]">
        <CustomButton
          onPress={() => router.back()}
          title=""
          iconName="chevron-left"
        />
        <Text className="text-lg font-bold text-[#343434]">
          プロフィールを編集
        </Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="w-full">
          <View className="flex-col gap-1 items-center p-2">
            {/* Avatar Image with option to pick a new image */}
            <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
              <ImageViewer
                imgSource={avatarUri ? { uri: avatarUri } : manAvatar}
                imageStyle={{ width: 60, height: 60, borderRadius: 30 }} // Round avatar
              />
            </TouchableOpacity>
            <CustomButton
              onPress={pickImage}
              title="写真を編集"
              textStyles="text-[#003CFF] font-bold text-center"
            />
          </View>
          <View className="w-full flex-col p-2">
            <View className="w-full border-t-[0.5px]">
              <View className="flex-row justify-start items-center border-b-[0.5px] px-4 py-2">
                <Text className="w-1/5 text-left text-[#343434]">名前</Text>
                <TextInput
                  value={name}
                  onChangeText={(value) => setName(value)}
                  className={`text-lg px-2 py-2 border-2 ${
                    errorNameMessage
                      ? "border-warning bg-[#ffa2aa]"
                      : "border-[#343434] bg-transparent"
                  } w-[80%] rounded-md`}
                />
                {errorNameMessage && (
                  <Text className="text-base text-left text-warning mx-auto mt-2 w-full">
                    {errorNameMessage}
                  </Text>
                )}
              </View>
              <View className="flex-row justify-start items-center border-b-[0.5px] p-4">
                <Text className="w-1/5 text-left text-[#343434]">生年月日</Text>
                <View className="w-4/5 flex-row">
                  {/* Year Picker */}
                  <Picker
                    selectedValue={birthdayYear}
                    style={{
                      width: "45%",
                      marginLeft: -12,
                      height: 50,
                    }}
                    onValueChange={(itemValue) => setBirthdayYear(itemValue)}
                  >
                    {years.map((year) => (
                      <Picker.Item key={year} label={year} value={year} />
                    ))}
                  </Picker>
                  {/* Month Picker */}
                  <Picker
                    selectedValue={birthdayMonth}
                    style={{
                      width: "35%",
                      marginLeft: -12,
                      height: 50,
                      textAlign: "center",
                    }}
                    onValueChange={(itemValue) => setBirthdayMonth(itemValue)}
                  >
                    {months.map((month) => (
                      <Picker.Item key={month} label={month} value={month} />
                    ))}
                  </Picker>
                  {/* Day Picker */}
                  <Picker
                    selectedValue={birthdayDay}
                    style={{
                      width: "35%",
                      marginLeft: -12,
                      height: 50,
                      textAlign: "center",
                    }}
                    onValueChange={(itemValue) => setBirthdayDay(itemValue)}
                  >
                    {days.map((day) => (
                      <Picker.Item key={day} label={day} value={day} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View className="flex-row justify-start items-start p-4">
                <Text className="w-1/5 text-left text-[#343434] pt-2">
                  自己紹介
                </Text>
                <TextInput
                  value={introduction}
                  onChangeText={(value) => setIntroduction(value)}
                  className={`text-lg px-2 py-2 border-2
                      border-[#343434] bg-transparent
                    w-[80%] min-h-40 rounded-md mt-2`}
                  style={{ textAlignVertical: "top" }} // ✅ Add this to align text to the top
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button at the Bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4">
        <CustomButton
          onPress={handleSave}
          iconName="check"
          iconColor="#fff"
          title="保存"
          containerStyles="bg-primary rounded-full w-full"
          textStyles="text-base text-center py-4 text-white"
        />
      </View>
    </View>
  );
};

export default EditProfile;
