import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import { feedStyle } from './styles.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FeedScreen() {
    const { itemBody, title, container, listContainer, itemImage, titleDescription, titleEpisodios, titleRank, itemDescription } = feedStyle;

    const [animes, setAnimes] = useState([]);
    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/top/anime?page=1&limit=10')
            .then(response => setAnimes(response.data.data))

            
            .catch(error => console.error());
    }, []);
    const renderItem = ({ item }) => (
        <View style={itemBody}>
            <Text style={title}>{item.title}</Text>
            <Image source={{ uri: item.images.jpg.image_url }} style={itemImage} />
            {/* <Text style={title}>{item.synopsis}</Text> */}
            <View style={titleDescription}>
                <Text style={titleEpisodios}>Episódios: {item.episodes}</Text>
                <Text style={titleRank}>Ranking:{item.rank}</Text>
            </View>
            <Text numberOfLines={10} ellipsizeMode="tail" style={itemDescription}>Ranking:{item.synopsis}</Text>
        </View>
    );

    return (
        <View style={container}>
            <FlatList
                data={animes}
                renderItem={renderItem}
                keyExtractor={item => item.mal_id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={listContainer}
            />
        </View>
    )
}

