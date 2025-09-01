
import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { feedStyle } from './styles.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import PostComponent from './post.js';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../../context/auth.js';



export default function FeedComponent({ user }) {
    const { container, listContainer } = feedStyle;
    const { userImages, fetchUserImages, confirmDelete, refreshImages } = useContext(AuthContext);

    useEffect(() => {
        fetchUserImages();
    }, [user, refreshImages]);



    // console.log(userImages);


    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    return (
        <TouchableWithoutFeedback onPress={() => setActiveMenuIndex(null)} >
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