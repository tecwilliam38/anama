// Importa os navegadores de abas superiores, pilha nativa e abas inferiores
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importa constantes de cores
import { COLORS } from "../context/constants.js";

// Importa ícones de diferentes bibliotecas
import {
    Ionicons,
    FontAwesome,
    AntDesign,
    MaterialIcons,
} from "@expo/vector-icons";

// Importa as telas que serão usadas nas rotas
import Home from "../screens/Home/index.js";
import ChatScreen from "../screens/Chat/index.js";
import ProfileScreen from "../screens/Profile/index.js";
import ContactsScreen from "../screens/Contacts/index.js";
import Octicons from '@expo/vector-icons/Octicons';
import TasksScreen from "../screens/Tasks/index.js";
import AddTask from "../screens/Tasks/addTask/index.js";
import AddClient from "../screens/Tasks/addClient/index.js";
import AllTasksScreen from "../screens/Tasks/allTasks/index.js";

// Cria os navegadores
const TopTab = createMaterialTopTabNavigator(); // Abas superiores
const ChatStack = createNativeStackNavigator(); // Navegação em pilha
const ZapStack = createBottomTabNavigator();    // Abas inferiores (não utilizado aqui)

// Componente principal que define as rotas privadas
export default function PrivateRoutes() {

    return (
        <ChatStack.Navigator>
            {/* Tela principal que contém as abas superiores */}
            <ChatStack.Screen
                name="Main"
                component={TabsRoutes}
                options={{ headerShown: false }}
            />
            {/* Tela de chat individual */}
            <ChatStack.Screen
                name="MyChat"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
            <ChatStack.Screen
                name="AddTarefa"
                component={AddTask}
                options={{ title: 'Adicionar Tarefa' }}
            />
            <ChatStack.Screen
                name="AddClient"
                component={AddClient}
                options={{ title: 'Adicionar Cliente' }}
            />
        </ChatStack.Navigator>
    );
}

// Componente que define as abas superiores
function TabsRoutes() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    paddingTop: 50,
                    marginBottom: 10,
                    paddingBottom: 5,
                    height:110 ,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.6,
                    shadowRadius: 4,
                    elevation: 4,
                },
                headerShown: false, // Não exibe cabeçalho
            }}
        >
            {/* Aba Home */}
            <TopTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "Home",
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="home"
                            size={30}
                            color={focused ? "#29a139ff" : "#06bcee"}
                        />
                    ),
                }}
            />

            {/* Aba Chat (mostra lista de contatos) */}
            <TopTab.Screen
                name="Chat"
                component={ContactsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "Zap",
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="wechat"
                            size={30}
                            color={focused ? "#29a139ff" : "#06bcee"}
                        />
                    ),
                }}
            />
            {/* Aba Tarefas */}
            <TopTab.Screen
                name="Tasks"
                component={TasksScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "Agenda dia",
                    tabBarIcon: ({ focused }) => (
                        <Octicons name="tasklist"
                            size={30}
                            color={focused ? "#29a139ff" : "#06bcee"}
                        />
                    ),
                }}
            />
            <TopTab.Screen
                name="AllTasks"
                component={AllTasksScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "Agenda",
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="task-alt"
                            size={30}
                            color={focused ? "#29a139ff" : "#06bcee"}
                        />
                    ),
                }}
            />

            {/* Aba Perfil */}
            <TopTab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: "Anama Perfil",
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="user"
                            size={30}
                            color={focused ? "#29a139ff" : "#06bcee"}
                        />
                    ),
                }}
            />
        </TopTab.Navigator>
    );
}