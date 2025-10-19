import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import api from '../../api';
import { supabase } from '../../api/supabaseClient';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../../screens/Profile/styles';
import { Image } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// Depois (versão legada)
import * as FileSystem from 'expo-file-system/legacy';


import { decode } from 'base64-arraybuffer';

import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/auth';

export default function ProfileComponent({ user, id_user }) {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profileUri, setProfileuri] = useState(null)

    const { signOut, profileImage, setProfileImage } = useContext(AuthContext)

    const getFileExtension = (uri) => uri.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];


    async function ProfileLoad(id_user) {
        try {
            const response = await api.get(`/user/profile/${id_user}`, {
                headers: {
                    Authorization: `Bearer ${user.token}` // substitua por seu token real
                }
            });

            if (response.data) {
                // console.log("Dados do usuário:", response.data);
                setUserData(response.data); // atualiza o estado com os dados recebidos
            }
        } catch (error) {
            console.log("Erro ao buscar perfil:", error.response?.data?.error || error.message);

        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        ProfileLoad(id_user)
        setProfileImage(userData.profile)
    }, []);

    const handleChangePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // 👈 mais seguro
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            setProfileuri(selectedUri); // 👈 agora sim!
        }
    }
    // console.log(typeof userProfile);
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
            setUserData(prev => ({ ...prev, profile: profileImageUrl, }));
            setProfileuri(null);
            setProfileImage(profileImageUrl);
            ProfileLoad(id_user);
            console.log('URL enviada para o contexto:', profileImageUrl);

        } catch (err) {
            console.error('Erro ao enviar imagem de perfil:', err.message);
            alert('Erro ao enviar imagem de perfil. Verifique sua conexão ou formato.');
        }
    };
    return (

        <View style={[styles.card, {marginTop:60}]}>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : userData ? (
                <>
                    <View style={stylesinline.imageContainer}>
                        {profileUri ?
                            <Image
                                source={{ uri: profileUri }}
                                style={styles.profileImage}
                                resizeMode="cover"
                            />
                            :
                            <Image
                                source={{ uri: `${userData.profile}?t=${Date.now()}` }}
                                style={stylesinline.profileImage}
                                resizeMode="resize"
                            />
                        }

                        {/* Ícone sobreposto no canto superior direito */}
                        {profileUri ? (
                            <TouchableOpacity
                                style={stylesinline.uploadIcon}
                                onPress={sendProfileImage}
                            >
                                <Ionicons name="send" size={24} color="#007AFF" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={handleChangePhoto}
                                style={stylesinline.cameraIcon}
                            >
                                <Icon name="camera" size={24} color="#007AFF" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.title}>Perfil do Usuário</Text>
                    <View style={styles.infoRow}>
                        <Icon name="account" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.value}>{userData.nome}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="email" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{userData.email}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="cellphone" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>Telefone:</Text>
                        <Text style={styles.value}>{userData.telefone}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="home" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.label}>Endereço:</Text>
                        <Text style={styles.value}>{userData.endereco}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                        <MaterialCommunityIcons name="logout" size={30} color="#666" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Sair</Text>

                    </TouchableOpacity>

                </>
            ) : (
                <Text style={styles.error}>Não foi possível carregar os dados.</Text>
            )
            }
        </View >

    )
}

const stylesinline = StyleSheet.create({
    imageContainer: {
        position: 'relative', // necessário para posicionar filhos com absolute
        width: "100%",
        top:-70,        
        borderRadius: 60,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileImage: {
        marginBottom: 15,        
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 1,
        alignItems: 'center',        
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 6,
        borderRadius: 20,
        elevation: 3, // sombra no Android
    },
    uploadIcon: {
        position: 'absolute',
        bottom: 1,        
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 6,
        borderRadius: 20,
        elevation: 3,
    },
});