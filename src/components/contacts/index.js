import { View, Text, FlatList, TouchableOpacity } from 'react-native'; // ✅ manter
import React, { useCallback, useEffect, useState } from 'react'; // ✅ manter
import api from '../../api'; // ✅ manter
import { ActivityIndicator } from 'react-native-paper'; // ✅ manter
import { ContactStyles } from './styles'; // ✅ manter
import { Image } from 'react-native-elements'; // ✅ manter
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'; // ✅ manter
import { supabase } from '../../api/supabaseClient'; // ✅ manter
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ContatosComponents({ userId, token }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [friendImage, setFriendImage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const receiver_id = route.params?.receiver_id || 2;

  // Atualiza mensagens ao focar na tela
  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [receiver_id])
  );

  // Busca amigos e enriquece com última mensagem + imagem
  const fetchFriendsWithMessages = async () => {
    if (!userId || !token) {
      console.warn('Usuário ou token ausente. Abortando fetch.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/messages/friends/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const friendsData = Array.isArray(res.data) ? res.data : [];

      if (friendsData.length === 0) {
        console.log('Nenhum amigo encontrado.');
        setFriends([]);
        return;
      }

      const enrichedFriends = await Promise.all(
        friendsData.map(async (friend) => {
          try {
            // Busca mensagens do amigo
            const msgRes = await api.get(`/messages/users/${friend.friend_id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });

            const mensagens = Array.isArray(msgRes.data) ? msgRes.data : [];
            const ultima = mensagens.length > 0 ? mensagens[mensagens.length - 1] : null;

            // Busca imagem de perfil
            const { data: profileData, error: profileError } = await supabase
              .from('anama_user')
              .select('profile_image')
              .eq('id_user', friend.friend_id)
              .single();

            if (profileError) throw profileError;

            return {
              ...friend,
              last_message: ultima,
              profile_image: profileData?.profile_image || null
            };
          } catch (err) {
            console.error(`Erro ao buscar dados de ${friend.friend_id}:`, err.message || err);
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
      console.error('Erro ao buscar amigos:', err.message || err);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca mensagens do usuário atual
  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/users/${receiver_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setChatMessages(response.data);
    } catch (error) {
      console.error('Erro ao buscar conversa:', error.response?.data || error.message);
    }
  };

  // Navega para tela de chat
  const openChatWithFriend = (friend_id) => {
    navigation.navigate('MyChat', { receiver_id: friend_id });
  };

  // Carrega dados ao montar o componente
  useEffect(() => {
    fetchFriendsWithMessages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />;
  }

  // Renderiza cada amigo na lista
  const renderItem = ({ item }) => {
    const lastMessages = item.chatMessages?.enviadas || [];
    const lastTimestamp = lastMessages.length > 0
      ? lastMessages[lastMessages.length - 1]?.timestamp
      : null;

    const horaFormatada = lastTimestamp
      ? new Date(lastTimestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      })
      : '';

    return (
      <TouchableOpacity onPress={() => openChatWithFriend(item.friend_id)}>
        <View style={ContactStyles.contactBody}>
          <Image
            source={
              item.profile_image
                ? { uri: `${item.profile_image}?t=${Date.now()}` }
                : require("../../assets/user.png")
            }
            style={ContactStyles.userImage}
          />

          <View style={ContactStyles.friendCenter}>
            {/* hora da última mensageme icons */}
            <View style={ContactStyles.friendIcons}>
              <Text style={ContactStyles.friendBottomText}>
                {item.last_message?.enviadas
                  ? new Date(item.last_message.enviadas).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo'
                  })
                  : '...'}
              </Text>

              <View style={ContactStyles.friendBottomIcons}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={ContactStyles.friendTime}
                >
                  {<Ionicons name="person-outline" size={18} color="black" /> || item.id_user}
                </Text>
                <Text style={ContactStyles.friendTime}>
                  {<Ionicons name="notifications-sharp" size={18} color="green" /> || item.friend_id}
                </Text>
              </View>
            </View>
            {/* Nome do usuário e última mensagem */}
            <View style={ContactStyles.friendDatastyle}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={ContactStyles.friendName}
              >
                {item.user_name || ''}
              </Text>
              <Text style={ContactStyles.friendBottomText}>
                {item.last_message?.mensagens || '...'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ContactStyles.container}>
      {friends.length === 0 ? (
        <Text style={ContactStyles.empty}>
          Você ainda não adicionou nenhum amigo.
        </Text>
      ) : (
        <FlatList
          style={ContactStyles.itemStyle}
          data={friends}
          keyExtractor={(item) => item.id_user?.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}