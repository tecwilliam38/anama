import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles';
import { supabase } from '../../api/supabaseClient';
import { ChatStyles } from '../../screens/Chat/styles';
import api from '../../api';
import { AuthContext } from '../../context/auth';


const ChatComponent = (props) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { buttonStyle, buttonText } = ChatStyles;
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
        <View style={styles.container}>
            <FlatList
                data={chatMessages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
            />
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Digite sua mensagem..."
                />
                <TouchableOpacity style={buttonStyle} onPress={sendMessage}>
                    <Text style={buttonText}>Enviar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default ChatComponent;
