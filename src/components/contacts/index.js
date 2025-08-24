import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../api';
import { ActivityIndicator } from 'react-native-paper';
import { ContactStyles } from './styles';
import { Image } from 'react-native-elements';

export default function ContatosComponents({ userId, token }) {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchFriends = async () => {
        try {
            const res = await api.get(`/messages/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFriends(res.data);
        } catch (err) {
            console.log('Erro ao buscar amigos:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFriends();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />;
    }

    return (
        <View style={ContactStyles.container}>
            {
                friends.length === 0 ? (
                    <Text style={ContactStyles.empty}>Você ainda não adicionou nenhum amigo.</Text>
                ) : (
                    <FlatList
                        style={ContactStyles.itemStyle}
                        data={friends}
                        keyExtractor={(item) => item.id_user}
                        renderItem={({ item }) => (
                            <View style={ContactStyles.contactBody}>
                                <Image source={require("../../assets/home.png")}
                                    style={ContactStyles.userImage}
                                />
                                <View style={ContactStyles.friendCenter}>
                                    <View style={ContactStyles.friendData}>
                                        <Text style={ContactStyles.friendName}>{item.name || 'Sem nome'}</Text>
                                        <Text style={ContactStyles.friendLastMessage}>{item.friend_id}</Text>
                                    </View>
                                    <View style={ContactStyles.friendIcons}>
                                        <Text style={ContactStyles.friendTime}>{item.friend_id || 'Sem nome'}</Text>
                                        <Text style={styles.friendNotifications}>{item.friend_id}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                )
            }
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height - 20,
        width: "100%",
        backgroundColor: "rgba(153, 153, 153, 0.5)",
        marginTop: 10,
        marginBottom: 10,
    },
    itemStyle: {
        height: 40,
        width: '100%',
    },
    contactBody: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 1,
        height: 80,
        backgroundColor: "#fff",
    },
    userImage: {
        margin: 5,
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'cover',
        backgroundColor: "rgba(204, 204, 204, 0.5)",
    },
    friendData: {
        flexDirection: "column",
        padding: 10,
    },
    title: {
        fontSize: 20,
        color: "#000",
        fontWeight: 'bold',
        marginBottom: 10,
    },
    empty: {
        fontSize: 16,
        color: '#777',
    },
    friendItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    contact: {
        fontSize: 14,
        color: '#555',
    },
});


