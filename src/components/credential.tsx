import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/styles/colors";
import { QRcode } from "./qrcode";
import { BadgeStore } from "@/store/badge-store";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
type Props = {
  data: BadgeStore | null;
  onChangeAvatar?: () => void;
  onExpandeQRCode?: () => void;
};
export function Credential({ data, onChangeAvatar, onExpandeQRCode }: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
    from={{
      rotateZ: "-10deg",
    }}
    animate={{
      rotateZ: "10deg",
    }}
    transition={{
      loop: true,
      type: "timing",
      duration: 1000,
      easing: Easing.linear,
    }}
      className="w-full self-stretch items-center"
    >
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data?.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full"></View>
        </ImageBackground>

        {data?.image ? (
          <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.8}>
            <Image
              source={{ uri: data.image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-36 h-36 items-center justify-center rounded-full -mt-24 bg-gray-400"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" size={32} color={colors.green[400]} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {data?.name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {data?.email}
        </Text>

        <QRcode value={data!.checkInURL} size={120} />

        <TouchableOpacity onPress={onExpandeQRCode}>
          <Text className="font-bold text-sm text-orange-500">
            Ampliar Qrcode
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
