import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../api/supabaseClient';
import { MaterialIcons } from '@expo/vector-icons';

const ReelsList = ({ id_user }) => {
    const [userImages, setUserImages] = useState([]);

    const fetchUserImages = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('anama_posts')
                .select('image_url')
                .eq('id_user', id_user)
                .order('created_at', { ascending: false });

            if (error) throw error;
            const imagensValidas = data
                .map(item => item.image_url)
                .filter(url => typeof url === 'string' && url.trim() !== '');

            setUserImages(imagensValidas);
        } catch (err) {
            console.error('Erro ao buscar imagens:', err.message);
        }
    }, [id_user]);

    useEffect(() => {
        fetchUserImages();
    }, []);

    const deleteImage = async (imageUrl) => {
        try {
            // Extrai o caminho do arquivo do URL público
            const path = imageUrl.split('/anama/')[1];

            // Remove do storage
            const { error: storageError } = await supabase.storage
                .from('anama')
                .remove([path]);

            if (storageError) throw storageError;

            // Remove do banco
            const { error: dbError } = await supabase
                .from('anama_posts')
                .delete()
                .eq('image_url', imageUrl)
                .eq('id_user', id_user);

            if (dbError) throw dbError;

            fetchUserImages();
        } catch (err) {
            console.error('Erro ao excluir imagem:', err.message);
            Alert.alert('Erro', 'Não foi possível excluir a imagem.');
        }
    };

    const confirmDelete = (imageUrl) => {
        Alert.alert(
            'Excluir imagem',
            'Tem certeza que deseja excluir esta imagem?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: () => deleteImage(imageUrl) }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item }} style={styles.itemImage} resizeMode='cover' />
            <TouchableOpacity style={styles.menuButton} onPress={() => confirmDelete(item)}>
                <MaterialIcons name="more-vert" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default ReelsList;

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
    },
    container: {
        marginTop: 15,
        paddingTop: 10,
        height: 220,
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    item: {
        // backgroundColor: 'rgba(73, 92, 79, 0.37)',
        marginHorizontal: 5,
        width: 120, // ligeiramente maior que a imagem
        height: 210,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
    },
    itemImage: {
        width: 100,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover', // garante que a imagem preencha sem distorcer
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 4,
        zIndex: 10,
    }
})
