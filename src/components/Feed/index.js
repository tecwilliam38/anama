
import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { feedStyle } from './styles.js';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import PostComponent from './post.js';
import * as FileSystem from 'expo-file-system';



export default function FeedComponent({ user }) {
    const {
        container,
        listContainer,
    } = feedStyle;


    const [userImages, setUserImages] = useState([]);


    useEffect(() => {
        fetchUserImages();
    }, [user]);

    const fetchUserImages = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('anama_posts')
                .select('image_url, post_body')
                .eq('id_user', user.id_user)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (Array.isArray(data)) {
                setUserImages(data.map(item => ({
                    image: item.image_url,
                    body_text: item.post_body
                })));
            } else {
                setUserImages([]); // ou trate como preferir
                console.warn('Nenhum dado retornado do Supabase.');
            }
        } catch (err) {
            console.error('Erro ao buscar imagens:', err.message || err);
            setUserImages([]); // garante que o estado não fique indefinido
        }
    }, [user.id_user]);

    // console.log(userImages);
    

    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    return (
        <TouchableWithoutFeedback onPress={() => setActiveMenuIndex(null)}>
            <View style={container}>
                <FlatList
                    data={userImages}
                    renderItem={({ item, index }) => (
                        <PostComponent
                            item={item}
                            index={index}
                            activeMenuIndex={activeMenuIndex}
                            setActiveMenuIndex={setActiveMenuIndex}
                            fetchUserImages={fetchUserImages}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={listContainer}
                />
            </View>
        </TouchableWithoutFeedback>

    )
}
const styles = StyleSheet.create({
    container: {
        width: '99%',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
});