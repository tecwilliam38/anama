import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import api from '../../api';
import { ActivityIndicator } from 'react-native-paper';
import { ContactStyles } from './styles';
import { Image } from 'react-native-elements';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import { supabase } from '../../api/supabaseClient';

export default function ContatosComponents({ userId, token }) {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatMessages, setChatMessages] = useState([]);
    const [friendImage, setFriendImage] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const receiver_id = route.params?.receiver_id || 2;

    useFocusEffect(
        useCallback(() => {
            fetchMessages();
        }, [receiver_id])
    );

    const fetchUserImagesProfile = async (receiver_id) => {
        try {
            const { data, error } = await supabase
                .from('anama_user')
                .select('profile_image')
                .eq('id_user', receiver_id)
                .single()

            if (error) throw error;

            // Verifica se há dados e acessa o primeiro item
            const imageUrl = data?.profile_image; // <- extrai a string da URL
            setUserProfile(imageUrl); // agora userProfile será uma string
            setFriendImage(imageUrl)
            // console.log("userprofile:", imageUrl);

        } catch (err) {
            console.error('Erro ao buscar imagens aqui:', err.message);
            // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
        }
    };


    const fetchFriendsWithMessages = async () => {
        try {
            const res = await api.get(`/messages/friends/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const friendsData = res.data;

            const enrichedFriends = await Promise.all(
                friendsData.map(async (friend) => {
                    try {
                        // Busca última mensagem
                        const msgRes = await api.get(`/messages/users/${friend.friend_id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const mensagens = msgRes.data;
                        const ultima = mensagens[mensagens.length - 1];

                        // Busca imagem de perfil
                        const { data: profileData, error: profileError } = await supabase
                            .from('anama_user')
                            .select('profile_image')
                            .eq('id_user', friend.friend_id)
                            .single();

                        // .eq('id_user', receiver_id)
                        if (profileError) throw profileError;
                        // console.log("Buscando imagem para:", friend.data);
                        return {
                            ...friend,
                            last_message: ultima || null,
                            profile_image: profileData?.profile_image || null
                        };
                    } catch (err) {
                        console.log(`Erro ao buscar dados de ${friend.friend_id}`, err);
                        return {
                            ...friend,
                            last_message: null,
                            profile_image: null
                        };
                    }
                })
            );

            setFriends(enrichedFriends);
        } catch (err) {
            console.log('Erro ao buscar amigos:', err);
        } finally {
            setLoading(false);
        }
    };


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
        fetchFriendsWithMessages();
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
                        <Image
                            source={
                                item.profile_image
                                    ? { uri: `${item.profile_image}?t=${Date.now()}` }
                                    : require("../../assets/clock.png")
                            }
                            style={ContactStyles.userImage}
                        />

                        <View style={ContactStyles.friendCenter}>
                            <View style={ContactStyles.friendData}>
                                <Text numberOfLines={1}
                                    ellipsizeMode="tail"
                                    textBreakStrategy="simple"
                                    style={ContactStyles.friendName}>{item.user_name || ''}</Text>
                                <Text style={ContactStyles.friendBottomText}>
                                    {item.last_message?.mensagens || '...'}
                                </Text>
                            </View>
                            <View style={ContactStyles.friendIcons}>
                                <Text style={ContactStyles.friendBottomText}>
                                    {item.last_message?.enviadas
                                        ? new Date(item.last_message.enviadas).toLocaleTimeString('pt-BR', {
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
                                        style={ContactStyles.friendTime}>{item.id_user || '...'}</Text>
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
