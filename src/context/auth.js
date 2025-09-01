// Importa o módulo de armazenamento assíncrono para persistência local
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa hooks e funções do React
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
// Importa o cliente Supabase (não está sendo usado neste trecho)
import { supabase } from '../api/supabaseClient';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

// Cria o contexto de autenticação
export const AuthContext = createContext({});

// Componente provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [refreshImages, setRefreshImages] = useState(false);

  const triggerImageRefresh = () => setRefreshImages(prev => !prev);


  const fetchUserImages = useCallback(async () => {
    if (!user?.id_user) return;

    try {
      const { data, error } = await supabase
        .from('anama_posts')
        .select('image_url, post_body')
        .eq('id_user', user.id_user)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (Array.isArray(data)) {
        setUserImages(data.map(item => ({
          image: item.image_url,
          body_text: item.post_body
        })));
      } else {
        setUserImages([]); // ou trate como preferir
        console.warn('Nenhum dado retornado do Supabase.');
      }

    } catch (err) {
      console.error('Erro ao buscar imagens:', err.message || err);
      setUserImages([]);
    }
  }, [user?.id_user]);

  const deleteImage = async (imageUrl) => {
    try {
      const path = imageUrl?.split?.('/anama/')?.[1];
      console.log(path);

      if (!path) throw new Error('Caminho da imagem inválido');

      const { error: storageError } = await supabase.storage
        .from('anama')
        .remove([path]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('anama_posts')
        .delete()
        .eq('image_url', imageUrl)
        .eq('id_user', user.id_user);
      if (dbError) throw dbError;

      fetchUserImages(); // atualiza após exclusão
    } catch (err) {
      console.error('Erro ao excluir imagem:', err.message);
      Alert.alert('Erro', 'Não foi possível excluir a imagem.');
    }
  };

  const confirmDelete = (imageUrl) => {
    Alert.alert(
      'Excluir imagem',
      'Tem certeza que deseja excluir esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteImage(imageUrl) }
      ]
    );
  };


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
      value={{
        user,
        setUser,
        userImages,
        fetchUserImages,
        deleteImage,
        confirmDelete,
        setProfileImage,
        triggerImageRefresh,
        refreshImages,
      }}>
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