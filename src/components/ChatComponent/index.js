import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { styles } from './styles';
import { supabase } from '../../api/supabaseClient';
import { ChatStyles } from '../../screens/Chat/styles';
import api from '../../api';
import { AuthContext } from '../../context/auth';
import { Ionicons } from "@expo/vector-icons";
import Button from '../button';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRoute } from '@react-navigation/native';
// import dayjs from 'dayjs';
// import 'dayjs/locale/pt-br';


export default function ChatComponent({ userId, token }) {
    const route = useRoute();
    const receiver_id = route.params?.receiver_id;
    // console.log(receiver_id,"Rota:", route.params);


    const { container, buttonStyle, buttonText, chatList, inputArea, input, scrollStyle } = ChatStyles;
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [amigo, setAmigo] = useState("");

    useFocusEffect(
        useCallback(() => {
            fetchMessages();
        }, [receiver_id])
    );

    useEffect(() => {
        const LoadFriend = async () => {
            let id_user = receiver_id;
            try {
                // const response = await api.get(`/user/profile/${id_user}`);
                const response = await api.get("/user/profile/" + id_user);
                if (response?.data) {
                    setAmigo(response.data);

                } else {
                    console.warn('Resposta sem dados.');
                }
                // console.log("dados amigo:");
            } catch (err) {
                console.error('Erro ao buscar amigo:', err);
            }
        };
        if (receiver_id) {
            LoadFriend();
        }
    }, [receiver_id])

    const fetchMessages = async () => {
        try {
            const response = await api.get(`/messages/users/${receiver_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Mensagens",response.data);

            setChatMessages(response.data); // salva no state                       
        } catch (error) {
            console.error('Erro ao buscar conversa:', error.response?.data || error.message);
        }
    };

    async function sendMessage(receiver_id, message_text) {
        if (!message.trim()) return;

        try {
            const response = await api.post(
                '/messages/',
                { sender_id: userId, receiver_id, message_text: message },
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
            await sendMessage(receiver_id, message);
            setMessage('');
            fetchMessages();
            LoadFriend();
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
        }
    };



    const renderItem = ({ item }) => {
        const timestamp = item.enviadas;

        const horaFormatada = new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo', // garante o fuso horário correto
        });
        const isMinhaMensagem = item.userid === user.id_user;
        console.log(typeof item.id, typeof user.id_user);
        // console.log('É minha?', item.sender_id === user.id_user, "\n id_sender:", item.sender_id);

        return (
            <View
                style={[
                    styles.messageBubble,
                    isMinhaMensagem ? styles.myMessage : styles.otherMessage,
                ]}
            >
                <Text style={styles.senderName}>
                    {isMinhaMensagem ? 'Você' : item.usuario}
                </Text>

                <Text style={styles.messageText}>
                    {item.mensagens}
                </Text>

                <Text style={styles.timestamp}>{horaFormatada}</Text>
            </View>
        );
    };



    return (
        <View style={container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{user.user_email || 'Conversa teste'}</Text>
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
