import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatMessages from './ChatMessages';
import ChatScreen from '.';

const Tab = createBottomTabNavigator();


export default function Chat() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Reels" component={ChatMessages} />
            <Tab.Screen name="Call" component={ChatMessages} />
            <Tab.Screen name="HomeChat" component={ChatScreen} />
        </Tab.Navigator>
    )
}