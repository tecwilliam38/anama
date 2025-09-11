import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from '../Home/style.js'
import { AuthContext } from '../../context/auth';

import AddFriendByContact from '../../components/addFriendByContact/index.js';
import ContatosComponents from '../../components/contacts/index.js';

export default function ContactsScreen() {
    const { user } = useContext(AuthContext);


    const { container } = HomeStyles;
    return (
        <View style={[container, { flex: 1, justifyContent: 'space-between' }]}>
            <ContatosComponents userId={user.id_user} token={user.token} />
            <AddFriendByContact userId={user.id_user} />

        </View>

    )
}


