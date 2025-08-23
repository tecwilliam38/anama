import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function ReelsList() {

    const [animes, setAnimes] = useState([]);
    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/top/anime')
            .then(response => setAnimes(response.data.data))
            .catch(error => console.error(error));
    }, []);


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.images.jpg.image_url }} style={styles.itemImage} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={animes}
                renderItem={renderItem}
                keyExtractor={item => item.mal_id.toString()}
                horizontal={true} // 👈 isso ativa a rolagem horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(73, 92, 79, 0.37)',        
        marginHorizontal: 5,
        borderRadius: 15,
        width: 140,
        height: 200,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android shadow
        elevation: 1,
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
    },
    itemImage: {
        width: "100%",
        height: 150,
        borderRadius: 15
    }
});
