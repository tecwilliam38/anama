import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { ChatStyles } from './styles'


import ChatComponent from '../../components/ChatComponent'
import { useRoute } from '@react-navigation/native'



export default function ChatScreen({ navigation }) {
    const route = useRoute();
    
    const { container, chatBody, scrollStyle, buttonStyle, buttonText } = ChatStyles;
    const { user } = useContext(AuthContext);

    return (
        <View style={container}>            
            <View style={chatBody}>
                <ChatComponent userId={user.id_user}
                    token={user.token}
                />
            </View>
        </View>
    )
}