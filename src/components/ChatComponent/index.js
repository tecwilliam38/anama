// Este componente foi revisado e otimizado com a colaboração do Microsoft Copilot.
// Obrigado por ajudar a tornar meu código mais limpo, seguro e eficiente!

// Importações otimizadas
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ToastAndroid,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { supabase } from '../../api/supabaseClient';
import { ChatStyles } from '../../screens/Chat/styles';
import api from '../../api';
import { AuthContext } from '../../context/auth';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function ChatComponent({ userId, token }) {
    const route = useRoute();
    const receiver_id = route.params?.receiver_id;
    const navigation = useNavigation();

    const { container, buttonStyle, buttonText, chatList, inputArea, input } = ChatStyles;
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [friendData, setFriendData] = useState(null);

    // Atualiza mensagens ao focar na tela
    useFocusEffect(
        useCallback(() => {
            fetchMessages();
        }, [receiver_id])
    );

    // ToastAndroid.show('Nova mensagem recebida!', ToastAndroid.SHORT);

    useEffect(() => {
        const channel = supabase
            .channel('mensagens-realtime')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${userId}`,
                },
                (payload) => {
                    const novaMensagem = payload.new;

                    // Verifica se a mensagem é da conversa atual
                    if (novaMensagem.sender_id === receiver_id) {
                        console.log('Nova mensagem recebida:', novaMensagem);
                        setChatMessages(prev => [...prev, novaMensagem]);
                        ToastAndroid.show('Nova mensagem recebida!', ToastAndroid.SHORT);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, receiver_id]);

    // Busca dados do amigo no Supabase
    useEffect(() => {
        const fetchFriendInfo = async () => {
            try {
                const { data, error } = await supabase
                    .from('anama_user')
                    .select('user_email, user_name, profile_image, user_cel_phone')
                    .eq('id_user', receiver_id)
                    .single();

                if (error) throw error;
                setFriendData(data);
            } catch (err) {
                console.error('Erro ao buscar telefone do amigo:', err.message);
            }
        };

        if (receiver_id) fetchFriendInfo();
    }, [receiver_id]);

    // Busca mensagens da conversa
    const fetchMessages = async () => {
        try {
            const response = await api.get(`/messages/users/${receiver_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChatMessages(response.data);          
        } catch (error) {
            console.error('Erro ao buscar conversa:', error.response?.data || error.message);
        }
    };

    // Envia mensagem
    async function sendMessage(receiver_id) {
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

    const flatListRef = useRef(null);
   
    // Lida com envio e atualiza lista
    const handleSend = async () => {
        if (!message.trim()) return;
        try {
            await sendMessage(receiver_id);
            setMessage('');
            fetchMessages();
            // Scroll para a última mensagem
            // Scroll para o final usando offset alto
            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToOffset({
                        offset: 9999,
                        animated: true
                    });
                }
            }, 300);
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
        }
    };

    // Renderiza cada mensagem
    const renderItem = ({ item }) => {
        const timestamp = item.enviadas;
        const horaFormatada = new Date(timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo',
        });

        const isMinhaMensagem = item.userid === user?.id_user;

        return (
            <View
                style={[
                    styles.messageBubble,
                    isMinhaMensagem ? styles.myMessage : styles.otherMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.mensagens}</Text>
                <Text style={styles.timestamp}>{horaFormatada}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <View style={container}>
                {/* Cabeçalho com nome e imagem do amigo */}
                <LinearGradient
                    colors={["rgba(21, 56, 130, 1)", "rgba(31,143,78, 1)", "rgba(237, 247, 124, 1)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonStyle}
                >
                    <Image
                        source={{ uri: friendData?.profile_image }}
                        style={styles.friendImageProfile}
                        resizeMode='cover'
                    />
                    <Text style={styles.headerText}
                        numberOfLines={1} ellipsizeMode="tail">
                        {/* {friendData?.user_name || user?.user_email || 'Conversa teste'} */}
                        {friendData?.user_email || 'Conversa teste'}
                    </Text>
                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            style={styles.buttonTextgoback}
                            name={"send"}
                            size={38}
                            color="white"
                        />
                    </TouchableOpacity>
                </LinearGradient>

                {/* Lista de mensagens */}
                <FlatList
                    data={chatMessages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id?.toString() || String(index)}
                    style={chatList}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ref={flatListRef}
                    initialNumToRender={chatMessages.length}
                />

                {/* Área de input */}
                <View style={inputArea}>
                    <TextInput
                        style={input}                        
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Mensagem"
                        placeholderTextColor="#000"
                    />
                    <LinearGradient
                        colors={["rgba(27, 47, 90, 1)", "rgba(66, 101, 170, 1)", "rgba(51, 201, 113, 1)", "rgba(237, 247, 124, 1)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={buttonStyle}
                    >
                        <TouchableOpacity onPress={handleSend}>
                            <MaterialCommunityIcons
                                style={buttonText}
                                name={message.trim() ? "send" : "microphone"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}