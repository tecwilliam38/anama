import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatStyles } from '../../screens/Chat/styles';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from '../../context/auth';
import api from '../../api';


export default function ChatNotifications(props) {
    const { container, buttonStyle, buttonText, chatList, inputArea, input, scrollStyle } = ChatStyles;
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        if (selectedFriend) {
            fetchMessages();
        }
    }, [selectedFriend]);

    const fetchFriends = async () => {
        try {
            const res = await api.get("/users/friends", {
                params: { userId: props.userId },
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setFriends(res.data);
        } catch (err) {
            console.log('Erro ao buscar amigos:', err);
        }
    };
    const fetchMessages = async () => {
        try {
            const res = await api.get("/messages/get", {
                params: { user1: props.userId, user2: selectedFriend.id },
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setChatMessages(res.data);
        } catch (err) {
            console.log('Erro ao buscar mensagens:', err);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedFriend) return;
        try {
            await api.post("/messages/send",
                {
                    sender_id: props.userId,
                    receiver_id: selectedFriend.id,
                    message_text: message
                },
                {
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
                item.user_id === props.userId ? styles.myMessage : styles.otherMessage,
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
            {/* Lista de amigos */}
            <ScrollView horizontal style={{ marginVertical: 10 }}>
                {friends.map((friend) => (
                    <TouchableOpacity
                        key={friend.id}
                        onPress={() => setSelectedFriend(friend)}
                        style={{
                            padding: 10,
                            backgroundColor: selectedFriend?.id === friend.id ? '#ccc' : '#eee',
                            borderRadius: 10,
                            marginHorizontal: 5,
                        }}>
                        <Text>{friend.name}</Text>

                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* Área de mensagens */}
            <ScrollView style={scrollStyle}>
                <FlatList
                    data={chatMessages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={chatList}
                />
            </ScrollView>
            {/* Input de mensagem */}
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
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons style={buttonText} name="send-sharp" size={24} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};
