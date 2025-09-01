import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../api/supabaseClient';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../context/auth';


const ReelsList = ({ user }) => {

    const { userImages, fetchUserImages, confirmDelete } = useContext(AuthContext);


    useEffect(() => {
        fetchUserImages();
    }, []);




    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode='cover' />
            <TouchableOpacity style={styles.menuButton} onPress={() => confirmDelete(item.image)}>
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
