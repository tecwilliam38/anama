import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import { feedStyle } from './styles.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { supabase } from '../../api/supabaseClient.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FeedScreen({ user, id_user }) {
    const { itemBody, title, container, listContainer, itemImage, titleDescription, titleEpisodios, titleRank, itemDescription } = feedStyle;


    const [userImages, setUserImages] = useState([]);
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        fetchUserImages();
    }, [user]);

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
            console.error('Erro ao buscar imagens:', err.message);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={itemBody}>
                <Image
                    source={{ uri: item }}
                    style={itemImage}
                    resizeMode='cover'
                />
            </View>
        )
    };

    return (
        <View style={container}>
            {/* <View style={{ marginTop: 30 }}><Text>{user.user_email}</Text></View> */}
            <FlatList
                data={userImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={listContainer}
            />
        </View>
    )
}


