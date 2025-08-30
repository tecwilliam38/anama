
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import { feedStyle } from './styles.js';
import { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import PostComponent from './post.js';



export default function FeedComponent({ user, id_user }) {
    const {
        container,
        listContainer,
    } = feedStyle;


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

            setUserImages(data.map(item => ({
                image: item.image_url,
                body_text: item.post_body
            })
            ));
        } catch (err) {
            console.error('Erro ao buscar imagens:', err.message);
        }
    };


    return (
        <View style={container}>
            {/* <View style={{ marginTop: 30 }}><Text>{user.user_email}</Text></View> */}
            <FlatList
                data={userImages}
                renderItem={({ item }) => <PostComponent item={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={listContainer}
            />
        </View>
    )
}
