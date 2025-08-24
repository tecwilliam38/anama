import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { supabase } from '../../api/supabaseClient';
import { AuthContext } from '../../context/auth';
import {  Ionicons } from '@expo/vector-icons';


export default function ImageUploader() {
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

    const uploadImageold = async () => {
        const userId = user.id_user;

        if (!image || !userId) return;

        try {
            setUploading(true);

            const response = await fetch(image);
            const blob = await response.blob();

            const fileExt = image.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('anama')
                .upload(filePath, blob, {
                    contentType: blob.type || 'image/jpeg',
                    upsert: true,
                });

            if (error) throw error;

            Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
            setImage(null);
        } catch (err) {
            console.error('Erro ao enviar imagem:', err.message);
            Alert.alert('Erro', err.message);
        } finally {
            setUploading(false);
        }
    };




    const uploadImage = async () => {
        const idUser = user.id_user;
        try {
            setUploading(true);

            const response = await fetch(image);
            const blob = await response.blob();

            const fileName = `${idUser}-${Date.now()}.jpg`;

            const { data, error: uploadError } = await supabase.storage
                .from('user_images')
                .upload(fileName, blob, {
                    contentType: 'image/jpeg',
                });

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('user_images')
                .getPublicUrl(fileName);

            const imageUrl = publicUrlData.publicUrl;

            const { error: insertError } = await supabase
                .from('anama_images')
                .insert([{ id_user: idUser, image_url: imageUrl }]);

            if (insertError) throw insertError;

            Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
            setImage(null);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível enviar a imagem.');
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