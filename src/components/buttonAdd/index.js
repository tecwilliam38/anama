import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import api from '../../api';

export default function ButtonAddcomponent() {
    const [newFriendId, setNewFriendId] = useState('');
    const addFriend = async () => {
        if (!newFriendId.trim()) return;

        try {
            await api.post("/users/friends", {
                id_user: props.userId,
                friend_id: newFriendId
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            Alert.alert('Sucesso', 'Amigo adicionado!');
            setNewFriendId('');
            fetchFriends();
        } catch (err) {
            console.log('Erro ao adicionar amigo:', err);
            Alert.alert('Erro', 'Não foi possível adicionar o amigo.');
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
                placeholder="ID do amigo"
                placeholderTextColor="#555"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 8,
                    borderRadius: 8,
                    width: 200,
                    marginRight: 10,
                }}
                value={newFriendId}
                onChangeText={setNewFriendId}
            />
            <TouchableOpacity
                onPress={addFriend}
                style={{
                    backgroundColor: '#4CAF50',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                }}
            >
                <AntDesign name="adduser" size={30} color="black" />
            </TouchableOpacity>
        </View>

    )
}