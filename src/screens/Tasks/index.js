import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AuthContext } from '../../context/auth';

export default function TasksScreen() {
    const {user}= useContext(AuthContext);
    console.log("Ususario",user);
    
  return (
    <View style={styles.headerBg}>
      <Text>Lista de Tarefas de: {user.user_email}</Text>
    </View>
  )
}