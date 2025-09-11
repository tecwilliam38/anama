import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function HeaderChat() {
    const [user] = useState(null);
    return (
        <View style={styles.container}>
            <Image source={{ uri: photo }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
};