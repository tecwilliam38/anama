
import {
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";
import { COLORS } from "../context/constants.js";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from "../screens/Chat/chat.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createNativeStackNavigator();

export default function ChatBottom() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeChat" component={Chat} />
            <Tab.Screen name="Reels" component={Chat} />
            <Tab.Screen name="Abas" component={Chat} />
            <Tab.Screen name="Profile" component={Chat} />
            <Tab.Screen name="Call" component={Chat} />
        </Tab.Navigator>
    );
}



