import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FeedScreen() {
    const DATA = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
        { id: '4', title: 'Item 4' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    listContainer: {
        width: "100%",                
    },
    item: {        
        alignItems: 'center',        
        marginHorizontal:"1%",
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 10,        
        marginVertical: 5,
        borderRadius: 12,
        width: "98%",
        height: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android shadow
        elevation: 1,
    },
    title: {
        color: '#000',
        fontSize:30,
        fontWeight: 'bold',
    },
});
