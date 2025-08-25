import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles';
import { supabase } from '../../api/supabaseClient';
import { ChatStyles } from '../../screens/Chat/styles';
import api from '../../api';
import { AuthContext } from '../../context/auth';
import { Ionicons } from "@expo/vector-icons";
import Button from '../button';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

export default function ChatComponent({ userId, token, friend_id  }) {
    
    const { container, buttonStyle, buttonText, chatList, inputArea, input, scrollStyle } = ChatStyles;
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useContext(AuthContext);

    // ✅ Inicia a conversa ao montar o componente
    useEffect(() => {
        if (userId && friend_id) {
            getConversation();
        }
    }, [userId, friend_id]);

    useEffect(() => {
        async function loadConversation() {
            try {
                const messages = await getConversation(friend_id);
                setChatMessages(messages);
            } catch (err) {
                Alert.alert('Erro', 'Não foi possível carregar a conversa.');
            }
        }

        loadConversation();
    }, [friend_id]);
    // console.log(friend_id);



    async function getConversation(friend_id) {
        try {
            const response = await api.post("/messages/",
                {
                    params: { friend_id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data; // array de mensagens
        } catch (error) {
            console.error('Erro ao buscar conversa:', error);
            throw error;
        }
    }


    async function sendMessage(friend_id, message_text) {
        if (!message.trim()) return;

        try {
            const response = await api.post(
                '/messages/',
                { id_user: userId, friend_id, message_text: message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }
    const handleSend = async () => {
        if (!message.trim()) return;
        try {
            await sendMessage(friend_id, message);
            setMessage('');
            const updated = await getConversation(friend_id);
            setChatMessages(updated);
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
        }
    };

    const renderItem = ({ item }) => (
        <>
            <View
                style={[
                    styles.messageBubble,
                    item.user_id === userId ? styles.myMessage : styles.otherMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.message_text}</Text>
                <Text style={styles.timestamp}>
                    {new Date(item.created_at).toLocaleTimeString()}
                </Text>
            </View>
        </>
    );

    return (
        <View style={container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{friend_id || 'Conversa'}</Text>
            </View>
            <ScrollView style={scrollStyle}>
                <FlatList
                    data={chatMessages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={chatList}
                />
            </ScrollView>
            <View style={inputArea}>
                <TextInput
                    style={input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor="#000"
                />
                <LinearGradient
                    colors={["rgba(27, 47, 90, 1)", "rgba(66, 101, 170, 1)", "rgba(51, 201, 113, 1)", "rgba(237, 247, 124, 1)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={buttonStyle}
                >
                    <TouchableOpacity
                        onPress={handleSend}>
                        <Ionicons style={buttonText} name="send-sharp" size={24} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};
