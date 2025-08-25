import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TopSearch from '../../components/topSearch'
import { AuthContext } from '../../context/auth'
import { ChatStyles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, TextInput } from 'react-native-paper'

import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../api/supabaseClient'
import ChatComponent from '../../components/ChatComponent'
import { useRoute } from '@react-navigation/native'



export default function ChatScreen({ navigation }) {
    const route = useRoute();
    const friend_id = route.params.friend_id;

    const { container, chatBody, scrollStyle, buttonStyle, buttonText } = ChatStyles;
    const { user } = useContext(AuthContext);

    return (
        <View style={container}>
            <TopSearch />
            <View style={chatBody}>
                <ChatComponent userId={user.id_user}
                    token={user.token}
                    friend_id={friend_id}
                />
            </View>
        </View>
    )
}