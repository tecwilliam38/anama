import React, { useState, useEffect } from 'react';
import { View, Button, Image, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../api/supabaseClient';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';



const ImagePost = ({ id_user }) => {
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userImages, setUserImages] = useState([]);

    const fetchUserImages = async () => {
        try {
            const { data, error } = await supabase
                .from('anama_posts')
                .select('image_url')
                .eq('id_user', id_user)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setUserImages(data); // Atualiza o estado com as imagens
        } catch (err) {
            console.error('Erro ao buscar imagens:', err.message);
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
    
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    const getFileExtension = (uri) => {
        return uri.split('.').pop().toLowerCase();
    };

    const sendImage = async () => {
        if (!imageUri) return;

        const ext = getFileExtension(imageUri);
        if (!allowedExtensions.includes(ext)) {
            alert('Formato de imagem não suportado. Use JPG, JPEG, PNG ou GIF.');
            return;
        }

        try {
            // 1. Lê o arquivo como base64
            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            const base64Data = await FileSystem.readAsStringAsync(fileInfo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // 2. Gera nome único com ID do usuário
            const fileName = `${id_user}/${Date.now()}.${ext}`;

            // 3. Faz upload no bucket público
            const { error: uploadError } = await supabase.storage
                .from('anama')
                .upload(fileName, base64Data, {
                    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // 4. Recupera URL pública da imagem
            const { data } = supabase.storage
                .from('anama')
                .getPublicUrl(fileName);

            const imageUrl = data.publicUrl;

            // 5. Insere no banco de dados
            const { error: dbError } = await supabase
                .from('anama_posts')
                .insert({
                    image_url: imageUrl,
                    id_user: id_user,
                    created_at: new Date().toISOString(), // opcional, se não tiver default
                });

            if (dbError) throw dbError;

            console.log('Imagem enviada e registrada com sucesso:', imageUrl);

            // 6. Limpa imagem selecionada (fecha picker)
            setImageUri(null);
            // 7. Recarrega imagens do usuário
        } catch (err) {
            console.error('Erro ao enviar imagem:', err.message);
            alert('Erro ao enviar imagem. Verifique sua conexão ou o formato do arquivo.');
        }
    };

    fetchUserImages();

    useEffect(() => {
        fetchUserImages();
    }, []);

    const renderItem = ({ item }) => (
        <Image
            source={{ uri: item.image_url }}
            style={{ width: 100, height: 100, margin: 5 }}
        />
    );




    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={pickImage} style={styles.buttonCam}>
                <Ionicons name="camera-outline" size={40} color="#fff" />
            </TouchableOpacity>

            {/* <Button title="Escolher imagem" onPress={pickImage} /> */}
            {imageUri && <Image source={{ uri: imageUri }} style={{ height: 200, marginVertical: 10 }} />}
            <TouchableOpacity onPress={sendImage} style={styles.buttonCam}>
                <Ionicons name="send" size={40} color="#fff" />
            </TouchableOpacity>
            {/* <Button title="Postar imagem" onPress={uploadImage} disabled={loading} /> */}
            {loading && <ActivityIndicator />}

            <FlatList
                data={userImages} // array com URLs das imagens
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
};

export default ImagePost;

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
