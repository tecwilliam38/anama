import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../context/auth';
import { Ionicons } from '@expo/vector-icons';

// Banco firebase
import uuid from 'react-native-uuid';

import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../api/firebase';
import { createClient } from '@supabase/supabase-js';
import { NHOST_STORAGE_URL } from '../../api/nhostApi';
import axios from 'axios';
// import { supabase } from '../../api/supabaseClient';





export default function ImageUploader({ id_user, accessToken  }) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUri, setImageUri] = useState(null);


    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) return;
        // Carregar as imagens do bucket:
        loadImages();
    }, [user])

    const loadImages = async () => {
        setLoadingImages(true);
        try {
            const q = query(collection(db, 'user_images'), where('id_user', '==', id_user));
            const querySnapshot = await getDocs(q);
            const images = querySnapshot.docs.map(doc => doc.data().image_url);
            setUserImages(images);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        } finally {
            setLoadingImages(false);
        }

    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!imageUri || !accessToken) return;

        setUploading(true);
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const fileName = `${id_user}_${Date.now()}.jpg`;

            const formData = new FormData();
            formData.append('file', blob, fileName);

            const uploadRes = await axios.post(`${NHOST_STORAGE_URL}/files`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const fileId = uploadRes.data.id;
            const fileUrl = `${NHOST_STORAGE_URL}/files/${fileId}`;

            Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
            console.log('URL da imagem:', fileUrl);
            setImageUri(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao enviar imagem.');
        } finally {
            setUploading(false);
        }
    };



    return (
        <View style={{ alignItems: 'center', marginVertical: 50 }}>
            <TouchableOpacity onPress={pickImage} style={styles.buttonCam}>
                <Ionicons name="camera-outline" size={40} color="#fff" />
            </TouchableOpacity>


            {image && (
                <>
                    <Image source={{ uri: image }}
                        style={{ width: 200, height: 250, marginVertical: 10, borderRadius: 15 }} />
                    <Button title="Enviar para Supabase" onPress={uploadImage} />
                </>
            )}
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}


const styles = StyleSheet.create({
    buttonCam: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        padding: 10,
        width: 80,
        height: 80,
        backgroundColor: "#666",
        borderWidth: 1,
        borderColor: "#fff",
    }
})