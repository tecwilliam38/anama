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


const ChatComponent = (props) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { container, buttonStyle, buttonText, chatList, inputArea, input, scrollStyle } = ChatStyles;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get("/messages/get", {
                params: { user1: props.userId, user2: props.otherUserId },
                headers: { Authorization: `Bearer ${user.token}` }
            });

            setChatMessages(res.data);
        } catch (err) {
            console.log('Erro ao buscar mensagens:', err);
        }

    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            await api.post("/messages/send",
                { sender_id: props.userId, receiver_id: props.otherUserId, message_text: message }, {
                headers: { Authorization: `Bearer ${user.token}` },
            }

            );
            setMessage('');
            fetchMessages();
        } catch (err) {
            console.log('Erro ao enviar mensagem:', err);
        }
    };

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.user_id === props.idUser ? styles.myMessage : styles.otherMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.message_text}</Text>
            <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleTimeString()}
            </Text>
        </View>
    );

    return (
        <View style={container}>
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
                        onPress={sendMessage}>
                        <Ionicons style={buttonText} name="send-sharp" size={24} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default ChatComponent;
