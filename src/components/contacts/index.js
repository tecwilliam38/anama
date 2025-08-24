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
                                    <View style={ContactStyles.friendBottomIcons}>                                   
                                        <Text style={ContactStyles.friendBottomText}>{item.friend_id || 'Sem nome'}</Text>
                                        <Text style={ContactStyles.friendBottomText}>{item.friend_id}</Text>
                                    </View>
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
