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
import { AuthContext } from '../../context/auth';


export default function TopSearch({ user, id_user, signOut }) {
    const { topSearch, userImage, topSearchComponent, topSearchText } = HomeStyles;

    const { profileImage } = useContext(AuthContext);



    const [imageUri, setImageUri] = useState(null);
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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
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
    console.log("aqui profileimage:", profileImage);

    useEffect(() => {
        fetchUserImagesProfile();
        fetchUserImages();
    }, [profileImage]);


    const renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item }}
                style={{ width: 100, height: 200, margin: 5, borderRadius: 8 }}
                resizeMode='cover'
            />
        )
    };

    return (
        <View style={topSearch}>
            {userProfile ? (
                <Image
                    source={{ uri: profileImage }}
                    // source={{ uri: `${userProfile || profileImage}?t=${Date.now()}` }}
                    style={userImage}
                    onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
                />
            ) : null}


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