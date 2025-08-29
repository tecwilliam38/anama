import React, { useEffect, useState } from 'react';
import { View, Button, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../api/supabaseClient';

// // 🔐 Supabase config
// const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
// const supabaseKey = 'YOUR_ANON_KEY';
// const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'user_images';

export default function PhotoUploader({user}) {

    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
     const [files, setFiles] = useState()


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!imageUri) return;
        try {
            setUploading(true);
            const response = await fetch(imageUri);
            const blob = await response.blob();            
            const filePath = `${user.id}/photo-${Date.now()}.jpg`;

            const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, blob, {
                contentType: 'image/jpeg',
            });
            
            if (error) throw error;
            
            // Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
            setImageUri(null);
        } catch (error) {
            // Alert.alert('Erro', error.message);
        } finally {
            setUploading(false);
        }
    };
    // alert("aqui", error)

    const fetchPhotos = async () => {
        try {
            setLoadingPhotos(true);
            // const { data, error } = await supabase.storage.from(BUCKET_NAME).list(user.id);
            const { data, error } = await supabase.storage.from("user_images").list();
            console.log("data fetchphotos", data);
            

            if (error) throw error;

            const urls = await Promise.all(
                data.map(async (file) => {
                    const { data: urlData } = await supabase.storage
                        .from(BUCKET_NAME)
                        .getPublicUrl(file.name);
                    return urlData.publicUrl;
                })
            );
            setPhotos(urls);
        } catch (error) {
            Alert.alert('Erro ao carregar fotos', error.message);
        } finally {
            setLoadingPhotos(false);
        }
    };

    useEffect(() => {
        if (!user) return

        // Load user images
        fetchPhotos()
        loadImages()
    }, [user])

    const loadImages = async () => {
        const { data } = await supabase.storage.from('anama').list(user.id)     
        if (data) {
            console.log(data);
            
            setFiles(data)
        }
    }




    return (
        <View style={{ padding: 20 }}>
            <Button title="Escolher Foto" onPress={pickImage} />
            {imageUri && (
                <>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: '100%', height: 300, marginVertical: 20 }}
                        resizeMode="contain"
                    />
                    <Button title="Enviar para Supabase" onPress={uploadImage} />
                </>
            )}
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}