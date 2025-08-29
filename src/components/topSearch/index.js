import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { HomeStyles } from '../../screens/Home/style'
import { Image } from 'react-native-elements';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { supabase, supabaseKey, supabaseUrl } from '../../api/supabaseClient';

import * as FileSystem from 'expo-file-system';


import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { decode } from 'base64-arraybuffer';


export default function TopSearch({ user, id_user, signOut }) {
    const { topSearch, userImage, topSearchComponent, topSearchText } = HomeStyles;

    const [imageUri, setImageUri] = useState(null);
    const [profileUri, setProfileuri] = useState(null)
    const [userImages, setUserImages] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [post_body, setPost_body] = useState("")
    const [loading, setLoading] = useState(false);
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const getFileExtension = (uri) => {
        return uri.split('.').pop().toLowerCase();
    };
    const agora = new Date();
    const dataHoraBrasil = agora.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
    });

    const fetchUserImages = async () => {
        try {
            const { data, error } = await supabase
                .from('anama_posts')
                .select('image_url')
                .eq('id_user', id_user)
                .order('created_at', { ascending: false });

            if (error) throw error;
            // Atualiza o estado com as URLs das imagens
            // console.log("Imagens recebidas:", data);

            setUserImages(data.map(item => item.image_url));
        } catch (err) {
            console.error('Erro ao buscar imagens users:', err.message);
            // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
        }
    };

    const fetchUserImagesProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('anama_user')
                .select('profile_image')
                .eq('id_user', id_user)
                .single()

            if (error) throw error;

            // Verifica se há dados e acessa o primeiro item
            const imageUrl = data?.profile_image; // <- extrai a string da URL
            setUserProfile(imageUrl); // agora userProfile será uma string

        } catch (err) {
            console.error('Erro ao buscar imagens aqui:', err.message);
            // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
        }
    };

    // console.log("Tipo do dado:", typeof userProfile);

    // console.log("URL da imagem de perfil:", userProfile);
   
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const pickImageProfile = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // 👈 mais seguro
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            setProfileuri(selectedUri); // 👈 agora sim!
        }
    };

    const sendImage = async () => {
        if (!imageUri) return;

        const ext = getFileExtension(imageUri);
        if (!allowedExtensions.includes(ext)) {
            alert('Formato de imagem não suportado. Use JPG, JPEG, PNG ou GIF.');
            return;
        }

        try {
            // 1. Converte a URI em Blob

            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            const base64Data = await FileSystem.readAsStringAsync(fileInfo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const arrayBuffer = decode(base64Data); // 👈 converte base64 para ArrayBuffer

            // 2. Gera nome único com ID do usuário            
            const fileName = `${id_user}/${Date.now()}.${ext}`;
            console.log('Caminho do arquivo para upload:', fileName); // 👈 Verificação

            // 3. Faz upload no bucket público            
            const { error: uploadError } = await supabase.storage
                .from('anama') // 👈 Certifique-se que o nome do bucket é exatamente "anama"
                .upload(fileName, arrayBuffer, {
                    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // 4. Recupera URL pública da imagem
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from('anama')
                .getPublicUrl(fileName);

            if (publicUrlError) throw publicUrlError;

            const imageUrl = publicUrlData.publicUrl;

            // 5. Insere no banco de dados
            const { error: dbError } = await supabase
                .from('anama_posts')
                .insert({
                    image_url: imageUrl,
                    id_user: id_user,
                    created_at: new Date().toISOString(),
                    post_body
                });

            if (dbError) throw dbError;

            // console.log('Imagem enviada e registrada com sucesso:', imageUrl);

            // 6. Limpa imagem selecionada (fecha picker)
            setImageUri(null);
            setPost_body(null)

            // 7. Recarrega imagens do usuário
            fetchUserImages();
        } catch (err) {
            console.error('Erro ao enviar imagem:', err.message);
            alert('Erro ao enviar imagem. Verifique sua conexão ou o formato do arquivo.');
        }
    };

    useEffect(() => {
        fetchUserImagesProfile();
        fetchUserImages();
    }, [user]);

    const renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item }}
                style={{ width: 100, height: 200, margin: 5, borderRadius: 8 }}
                resizeMode='cover'
            />
        )
    };



    const sendProfileImage = async () => {
        if (!profileUri) return;

        const ext = getFileExtension(profileUri);
        if (!allowedExtensions.includes(ext)) {
            alert('Formato de imagem não suportado. Use JPG, JPEG, PNG ou GIF.');
            return;
        }

        try {
            // 🔍 1. Verifica se o usuário já tem imagem salva
            const { data: existingData, error: fetchError } = await supabase
                .from('anama_user')
                .select('profile_image')
                .eq('id_user', id_user)
                .single();

            if (fetchError) throw fetchError;

            const existingImageUrl = existingData?.profile_image;
            const fileName = `profile/${id_user}.${ext}`; // nome fixo

            // 🧠 2. Decide se vai sobrescrever ou criar nova
            const shouldOverwrite = !!existingImageUrl;

            // 📦 3. Converte imagem em ArrayBuffer
            const fileInfo = await FileSystem.getInfoAsync(profileUri);
            const base64Data = await FileSystem.readAsStringAsync(fileInfo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const arrayBuffer = decode(base64Data);

            // 📤 4. Upload no bucket
            const { error: uploadError } = await supabase.storage
                .from('anama')
                .upload(fileName, arrayBuffer, {
                    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                    upsert: shouldOverwrite, // 👈 sobrescreve se já existir
                });

            if (uploadError) throw uploadError;

            // 🌐 5. Recupera URL pública
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from('anama')
                .getPublicUrl(fileName);

            if (publicUrlError) throw publicUrlError;

            const profileImageUrl = publicUrlData.publicUrl;

            // 📝 6. Atualiza no banco
            const { error: updateError } = await supabase
                .from('anama_user')
                .update({ profile_image: profileImageUrl })
                .eq('id_user', id_user);

            if (updateError) throw updateError;

            console.log('Imagem de perfil atualizada com sucesso:', profileImageUrl);
            setProfileuri(null);
            fetchUserImagesProfile();
        } catch (err) {
            console.error('Erro ao enviar imagem de perfil:', err.message);
            alert('Erro ao enviar imagem de perfil. Verifique sua conexão ou formato.');
        }
    };

    return (
        <View style={topSearch}>
            {userProfile ? (
                <Image
                    source={{ uri: userProfile }}
                    style={userImage}
                    onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
                />
            ) : null}


            {/* <Image
                source={{ uri: 'https://yulykztzhmoxfztykeop.supabase.co/storage/v1/object/public/anama/profile/3.jpeg' }} // imagem padrão
                // source={require("../../assets/splash-icon.png")} // imagem padrão
                style={userImage}
                onTouchEnd={signOut}
            /> */}

            {/* {profileUri ? (
                <TouchableOpacity style={{ padding: 5 }} onPress={sendProfileImage}>
                    <FontAwesome5 name="cloud-upload-alt" size={40} color="green" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={{ padding: 5 }} onPress={pickImageProfile}>
                    <FontAwesome5 name="file-image" size={40} color="blue" />
                </TouchableOpacity>
            )} */}
            <TextInput
                placeholder='No que você está pensando?'
                placeholderTextColor="#000"
                multiline={true}
                value={post_body}
                style={topSearchComponent}
                onChangeText={setPost_body}
            />
            {/* <Text style={{fonstize:30, color:"#ccc"}}>{user.token}
                    </Text> */}
            {imageUri && <Image source={{ uri: imageUri }} style={{ height: 200, marginVertical: 10 }} />}
            {imageUri ? (
                <TouchableOpacity style={{ padding: 5 }} onPress={sendImage}>
                    <FontAwesome5 name="cloud-upload-alt" size={40} color="blue" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={{ padding: 5 }} onPress={pickImage}>
                    <FontAwesome5 name="file-image" size={40} color="blue" />
                </TouchableOpacity>
            )}
        </View>
    )
}