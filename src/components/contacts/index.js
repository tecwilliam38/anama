import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api';
import { ActivityIndicator } from 'react-native-paper';
import { ContactStyles } from './styles';
import { Image } from 'react-native-elements';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function ContatosComponents({ userId, token }) {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatMessages, setChatMessages] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const receiver_id = route.params?.receiver_id || 2;

    useFocusEffect(
        useCallback(() => {
            fetchMessages();
        }, [receiver_id])
    );

    const fetchMessages = async () => {
        try {
            const response = await api.get(`/messages/users/${receiver_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("Mensagens", response.data);
            setChatMessages(response.data); // salva no state                       
        } catch (error) {
            console.error('Erro ao buscar conversa:', error.response?.data || error.message);
        }
    };



    const openChatWithFriend = (friend_id) => {
        navigation.navigate('MyChat', { receiver_id: friend_id });
    };

    const fetchFriends = async () => {
        try {
            const res = await api.get(`/messages/friends/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            //  console.log(res.data);

            setFriends(res.data);
            chatMessages;
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

    const renderItem = ({ item }) => {
        const lastMessages = item.chatMessages?.enviadas || [];

        // Pegando o último timestamp, se existir
        const lastTimestamp = lastMessages.length > 0 ? lastMessages[lastMessages.length - 1]?.timestamp : null;


        const horaFormatada = lastTimestamp
            ? new Date(lastTimestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo',
            })
            : '';
        return (
            <>
                <TouchableOpacity onPress={() => openChatWithFriend(item.friend_id)}>
                    <View style={ContactStyles.contactBody}>
                        <Image source={require("../../assets/home.png")}
                            style={ContactStyles.userImage}
                        />
                        <View style={ContactStyles.friendCenter}>
                            <View style={ContactStyles.friendData}>
                                <Text numberOfLines={1}
                                    ellipsizeMode="tail"
                                    textBreakStrategy="simple"
                                    style={ContactStyles.friendName}>{item.user_name || 'vazio'}</Text>
                                <Text style={ContactStyles.friendBottomText} numberOfLines={1} ellipsizeMode="tail">
                                    {chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].mensagens : 'Sem mensagens'}
                                </Text>
                            </View>
                            <View style={ContactStyles.friendIcons}>
                                <Text style={ContactStyles.friendBottomText} numberOfLines={1} ellipsizeMode="tail">
                                    {chatMessages.length > 0
                                        ? new Date(chatMessages[chatMessages.length - 1].enviadas).toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'America/Sao_Paulo',
                                        })
                                        : 'Sem hora'}
                                </Text>
                                <View style={ContactStyles.friendBottomIcons}>
                                    <Text numberOfLines={1}
                                        ellipsizeMode="tail"
                                        textBreakStrategy="simple"
                                        style={ContactStyles.friendTime}>{item.id_user || 'vazio'}</Text>
                                    <Text style={ContactStyles.friendTime}>{item.friend_id || ''}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    };

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
                        renderItem={renderItem}
                    />
                )
            }
        </View>
    )
}
