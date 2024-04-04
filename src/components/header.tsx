import { Text, View } from "react-native"

type Props ={
  title : string 
}
export function Header( { title } : Props){
  return (
    <View className="w-full h-28 flex-row bg-black/20 px-8 pb-4 border-b border-white/10">
        <Text className="flex-1">{title}</Text>
    </View>
  )
}