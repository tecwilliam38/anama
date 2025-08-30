// Importa o módulo de armazenamento assíncrono para persistência local
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa hooks e funções do React
import { createContext, useContext, useEffect, useState } from 'react';
// Importa o cliente Supabase (não está sendo usado neste trecho)
import { supabase } from '../api/supabaseClient';

// Cria o contexto de autenticação
export const AuthContext = createContext({});

// Componente provedor de autenticação
export const AuthProvider = ({ children }) => {
  // Estado que armazena os dados do usuário logado
  const [user, setUser] = useState(null);
  // Estado para armazenar a imagem de perfil (pode ser usada em outro lugar)
  const [profileImage, setProfileImage] = useState(null);

  // Efeito que carrega os dados do usuário armazenados localmente ao iniciar o app
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_data');
        if (jsonValue != null) {
          setUser(JSON.parse(jsonValue)); // Atualiza o estado com os dados salvos
        }
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e);
      }
    };

    loadUserData(); // Executa a função ao montar o componente
  }, []);

  // Função para realizar login e salvar os dados do usuário localmente
  const signIn = async (dados) => {
    await AsyncStorage.setItem('@user_data', JSON.stringify(dados));
    console.log('Login bem-sucedido e dados armazenados!');
    setUser(dados);
    return true;
  };

  // Função para realizar logout e limpar os dados armazenados
  const signOut = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todos os dados do AsyncStorage    
      setUser(null); // Reseta o estado do usuário
    } catch (e) {
      console.error('Erro ao remover dados do usuário:', e);
    }
  };

  // Retorna o provedor com os valores disponíveis no contexto
  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, profileImage, setProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};