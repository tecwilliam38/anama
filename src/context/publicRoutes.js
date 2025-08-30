// Importa o criador de navegação em pilha nativa
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa a tela de login
import SigninScreen from '../screens/SigninScreen';

// Cria o stack navigator
const Stack = createNativeStackNavigator();

// Define as rotas públicas (normalmente usadas antes do login)
const PublicRoutes = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }} // Oculta o cabeçalho padrão
        >
            {/* Tela de login */}
            <Stack.Screen name="SignIn" component={SigninScreen} />
        </Stack.Navigator>
    );
};

// Exporta o componente para uso em outras partes da aplicação
export default PublicRoutes;