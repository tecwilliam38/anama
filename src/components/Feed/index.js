import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import { feedStyle } from './styles.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.js';
import { supabase } from '../../api/supabaseClient.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FeedScreen({ user, id_user }) {
    const { itemBody,
        title,
        container,
        listContainer,
        itemImage,
        titleDescription,
        titleEpisodios, titleRank, itemDescription } = feedStyle;


    const [userImages, setUserImages] = useState([]);

    useEffect(() => {
        fetchUserImages();
    }, [user, userImages]);

    const fetchUserImages = async () => {
        try {
            const { data, error } = await supabase
                .from('anama_posts')
                .select('image_url, post_body')
                .eq('id_user', id_user)
                .order('created_at', { ascending: false });

            if (error) throw error;
            // Atualiza o estado com as URLs das imagens
            // console.log("Imagens recebidas:", data);

            setUserImages(data.map(item => ({
                image: item.image_url,
                body_text: item.post_body
            })
            ));
        } catch (err) {
            console.error('Erro ao buscar imagens:', err.message);
            // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={itemBody}>
                <Image
                    source={{ uri: item.image }}
                    style={itemImage}
                    resizeMode='cover'
                />
                <Text>
                    {item.body_text}
                </Text>
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


