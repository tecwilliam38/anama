// Componente TopSearch desenvolvido por William com colaboração de Microsoft Copilot 🤝
// Este componente permite ao usuário selecionar uma imagem, visualizar uma prévia e enviá-la para o Supabase,
// junto com um texto de postagem. Também exibe a imagem de perfil do usuário.

import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'; // ⚠️ Pode ser substituído por 'react-native' se não usar recursos extras
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

import { HomeStyles } from '../../screens/Home/style';
import { supabase } from '../../api/supabaseClient';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import { AuthContext } from '../../context/auth';

export default function TopSearch({ user, id_user }) {
    const { topSearch, userImage, topSearchComponent } = HomeStyles;
    const { profileImage } = useContext(AuthContext);

    const [imageUri, setImageUri] = useState(null); // URI da imagem selecionada
    const [userProfile, setUserProfile] = useState(null); // URL da imagem de perfil
    const [post_body, setPost_body] = useState(""); // Texto da postagem

    // Atualiza imagem de perfil quando 'profileImage' muda
    useEffect(() => {
        setUserProfile(user?.profile_image); // ✅ Adicionado operador de segurança
    }, [profileImage]);

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    // Extrai a extensão do arquivo a partir da URI
    const getFileExtension = (uri) => uri.split('.').pop().toLowerCase();

    // Função para selecionar imagem da galeria
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Corrigido: 'images' não é válido
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };
    // Função para tirar uma foto e postar:
    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            alert('Permissão da câmera é necessária para tirar fotos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Função para enviar imagem ao Supabase
    const sendImage = async () => {
        if (!imageUri) return;

        const ext = getFileExtension(imageUri);
        if (!allowedExtensions.includes(ext)) {
            alert('Formato de imagem não suportado.');
            return;
        }

        try {
            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            const base64Data = await FileSystem.readAsStringAsync(fileInfo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const arrayBuffer = decode(base64Data);
            const fileName = `${id_user}/${Date.now()}.${ext}`;

            // Upload da imagem para o bucket 'anama'
            const { error: uploadError } = await supabase.storage
                .from('anama')
                .upload(fileName, arrayBuffer, {
                    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // Obtém URL pública da imagem
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from('anama')
                .getPublicUrl(fileName);

            if (publicUrlError) throw publicUrlError;

            const imageUrl = publicUrlData.publicUrl;

            // Insere registro no banco de dados
            const { error: dbError } = await supabase
                .from('anama_posts')
                .insert({
                    image_url: imageUrl,
                    id_user,
                    created_at: new Date().toISOString(),
                    post_body,
                });

            if (dbError) throw dbError;

            // Limpa os campos após envio
            setImageUri(null);
            setPost_body("");
        } catch (err) {
            console.error('Erro ao enviar imagem:', err.message);
            alert('Erro ao enviar imagem.');
        }
    };

   const sendTextPost = async () => {
  if (!post_body.trim()) {
    alert('Digite algo antes de enviar.');
    return;
  }

  try {
    const { error: dbError } = await supabase
      .from('anama_posts')
      .insert({       
        image_url: "", // em vez de null
        id_user,
        created_at: new Date().toISOString(),
        post_body,
      });

    if (dbError) throw dbError;

    setPost_body(""); // limpa o campo após envio    
  } catch (err) {
    console.error('Erro ao enviar postagem:', err.message);
    alert('Erro ao enviar postagem.');
  }
};

    return (
        <View style={topSearch}>
            {/* Exibe imagem de perfil se disponível */}
            {userProfile && (
                <Image
                    source={{ uri: `${userProfile}?t=${Date.now()}` }} // Cache busting
                    style={userImage}
                    onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
                />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {/* Campo de texto para a postagem */}
                <TextInput
                    placeholder='No que você está pensando?'
                    placeholderTextColor="#000"
                    multiline
                    value={post_body}
                    style={topSearchComponent}
                    onChangeText={setPost_body}
                    onSubmitEditing={sendImage}
                    returnKeyType="send" // muda o botão do teclado para "Enviar"

                />
                <TouchableOpacity onPress={sendTextPost}>
                    <Ionicons name="send" size={40} color="blue" />
                </TouchableOpacity>
                {/* Prévia da imagem selecionada */}
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{ height: 200, marginVertical: 10 }} />
                )}
            </View>
            {/* Botão para selecionar ou enviar imagem */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={pickImage}>
                    <FontAwesome5 name="file-image" size={40} color="blue" />
                </TouchableOpacity>

                <TouchableOpacity onPress={takePhoto}>
                    <FontAwesome5 name="camera" size={40} color="green" />
                </TouchableOpacity>

                {imageUri && (
                    <TouchableOpacity onPress={sendImage}>
                        <FontAwesome5 name="cloud-upload-alt" size={40} color="purple" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}