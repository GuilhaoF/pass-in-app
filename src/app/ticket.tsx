import { useState } from "react";
import { View, Text, Modal, Share } from "react-native";
import { Button } from "@/components/button";
import { Credential } from "@/components/credential";
import { Header } from "@/components/header";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, StatusBar, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"
import { QRcode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";
export default function Ticket() {

  const [expandeQRCode,setExpandeQRCode] = useState(false)
  const badgeStore = useBadgeStore()

  async function handleSelectImage(){
    try{
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
      })
      if(result.assets){
        badgeStore.updateAvatar(result.assets[0].uri)
      }
    }catch(err){
      console.log(err)
    }
  }
  async function handleShare(){
    try{
      if(badgeStore.data?.checkInURL){
        await Share.share({
          message : `Olá, ${badgeStore.data.name}! Compartilhe sua credencial do evento ${badgeStore.data.eventTitle} com seus amigos! ${badgeStore.data.checkInURL}`
        })
      }
    }catch(err){
      console.log(err)
    }
  }
  
  if(!badgeStore.data?.checkInURL){
    return <Redirect href="/"/>
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        
        <Credential  data={badgeStore.data}  onChangeAvatar={handleSelectImage} onExpandeQRCode={() => setExpandeQRCode(true)}/>
       
        <MotiView 
        from={{ translateY : 0}}
        animate={{ translateY : 10}}  
        transition={{
          type : 'timing',
          loop : true,
          duration : 700,
        }}
        >
        <FontAwesome
          name="angle-double-down"
          color={colors.gray[300]}
          size={24}
          className="my-6 self-center"
        />
        </MotiView>
      

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar Credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          {badgeStore.data?.eventTitle}
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity activeOpacity={0.7} className="mt-10" onPress={() => badgeStore.remove()}>
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandeQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity onPress={() => setExpandeQRCode(false)}>
            <QRcode value="teste" size={300} />
            <Text className="text-base text-white font-bold  mt-10 text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
