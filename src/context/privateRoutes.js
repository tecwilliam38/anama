// Pages
import { Image, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Icons

import { COLORS } from "../context/constants.js";
import Home from "../screens/Home/index.js";
import icon from "./icon.js";


import {
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";
import ChatScreen from "../screens/Chat/index.js";
import ProfileScreen from "../screens/Profile/index.js";
import NotificationsScreen from "../screens/Notifications/index.js";
import ContactsScreen from "../screens/Contacts/index.js";

const TopTab = createMaterialTopTabNavigator();
const ChatStack = createNativeStackNavigator();

export default function PrivateRoutes({ props }) {

    return (
        <>
            <ChatStack.Navigator >
                <ChatStack.Screen name="Home"
                    component={TabsRoutes}
                    options={{ headerShown: false }} />
                <ChatStack.Screen name="Contacts"
                    component={ContactsScreen}
                    options={{ headerShown: false }} />
                <ChatStack.Screen name="MyChat"
                    component={ChatScreen}
                    options={{
                        title: "Converse", // Título do header
                        headerStyle: {
                            backgroundColor: '#29a139', // Cor de fundo
                        },
                        headerShown: false,
                        headerTintColor: '#fff', // Cor dos ícones e texto
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                        },

                    }}
                />
            </ChatStack.Navigator>
        </>
    )
}

function TabsRoutes() {

    return <TopTab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: COLORS.white,
            paddingTop: 30,
            marginBottom: 10,
            paddingBottom: 5,
            height: 100,
            alignItems: "center"
        },
        headerShown: false,
    }}>
        {/* Icons */}
        <TopTab.Screen name="Home" component={Home} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                let iconName;
                return <Ionicons name="home" size={30}
                    color={focused ? "#29a139ff" : "#06bcee"} />
            }
        }} />
        <TopTab.Screen name="Calendar" component={ProfileScreen} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                let iconName;
                return <FontAwesome name="user-circle-o" size={30}
                    color={focused ? "#29a139ff" : "#06bcee"} />
            }
        }} />
        <TopTab.Screen name="Chat" component={ContactsScreen} options={{
            headerShown: false,
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                let iconName;
                return <AntDesign name="wechat" size={30}
                    color={focused ? "#29a139ff" : "#06bcee"} />
            }
        }} />
        <TopTab.Screen name="Reels" component={NotificationsScreen} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                let iconName;
                return <MaterialCommunityIcons name={focused ? "bell-outline" : "bell"} size={30}
                    color={focused ? "#29a139ff" : "#06bcee"} />
            }
        }} />
        <TopTab.Screen name="Perfil" component={ProfileScreen} options={{
            tabBarShowLabel: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
                let iconName;
                return <FontAwesome name="user" size={30}
                    color={focused ? "#29a139ff" : "#06bcee"} />
            }
        }} />
    </TopTab.Navigator>
}
