import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'; // ⚠️ Pode ser substituído por react-native padrão se não usar recursos extras
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { HomeStyles } from '../../screens/Home/style';
import { supabase } from '../../api/supabaseClient'; // ✅ Removi supabaseKey e supabaseUrl pois não são usados

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import { AuthContext } from '../../context/auth';



export default function TopSearch({ user, id_user, signOut }) {
    const { topSearch, userImage, topSearchComponent } = HomeStyles;
    const { profileImage } = useContext(AuthContext);

    useEffect(() => {
        setUserProfile(user.profile_image)       
    }, [profileImage]);
    // 

    const [imageUri, setImageUri] = useState(null);
    const [userImages, setUserImages] = useState([]); // ⚠️ Não está sendo usado no render
    const [userProfile, setUserProfile] = useState(null); // ⚠️ Também não está sendo usado diretamente
    const [post_body, setPost_body] = useState("");

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    const getFileExtension = (uri) => uri.split('.').pop().toLowerCase();

    const agora = new Date();
    const dataHoraBrasil = agora.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
    });


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

            const { error: uploadError } = await supabase.storage
                .from('anama')
                .upload(fileName, arrayBuffer, {
                    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from('anama')
                .getPublicUrl(fileName);

            if (publicUrlError) throw publicUrlError;

            const imageUrl = publicUrlData.publicUrl;

            const { error: dbError } = await supabase
                .from('anama_posts')
                .insert({
                    image_url: imageUrl,
                    id_user,
                    created_at: new Date().toISOString(),
                    post_body,
                });

            if (dbError) throw dbError;

            setImageUri(null);
            setPost_body("");
            fetchUserImages();
        } catch (err) {
            console.error('Erro ao enviar imagem:', err.message);
            alert('Erro ao enviar imagem.');
        }
    };

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
            {userProfile && (
                <Image
                    source={{ uri: `${userProfile}?t=${Date.now()}` }}
                    style={userImage}
                    onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
                />
            )}

            <TextInput
                placeholder='No que você está pensando?'
                placeholderTextColor="#000"
                multiline
                value={post_body}
                style={topSearchComponent}
                onChangeText={setPost_body}
            />

            {imageUri && (
                <Image source={{ uri: imageUri }} style={{ height: 200, marginVertical: 10 }} />
            )}

            <TouchableOpacity style={{ padding: 5 }} onPress={imageUri ? sendImage : pickImage}>
                <FontAwesome5
                    name={imageUri ? "cloud-upload-alt" : "file-image"}
                    size={40}
                    color="blue"
                />
            </TouchableOpacity>
        </View>
    );
}