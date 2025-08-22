import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

export default function ReelsList() {
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
        paddingTop:10,
        height:220,
        justifyContent: 'center',        
        backgroundColor:"#fff",
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: 'rgba(73, 92, 79, 0.37)',
        padding: 20,
        marginHorizontal: 5,
        borderRadius: 12,
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
        color: '#fff',
        fontWeight: 'bold',
    },
});
