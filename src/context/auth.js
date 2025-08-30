import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // const fetchUserImagesProfile = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('anama_user')
  //       .select('profile_image')
  //       .eq('id_user', id_user)
  //       .single()

  //     if (error) throw error;

  //     // Verifica se há dados e acessa o primeiro item
  //     const imageUrl = data?.profile_image; // <- extrai a string da URL
  //     setUserProfile(imageUrl); // agora userProfile será uma string
  //     setProfileImage(imageUrl)
  //   } catch (err) {
  //     console.error('Erro ao buscar imagens aqui:', err.message);
  //     // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
  //   }
  // };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_data');
        if (jsonValue != null) {
          setUser(JSON.parse(jsonValue));

        }
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e);
      }
    };
    profileImage;
    // fetchUserImagesProfile(user.id_iser)
    loadUserData();
  }, []);


  const signIn = async (dados) => {
    await AsyncStorage.setItem('@user_data', JSON.stringify(dados));

    console.log('Login bem-sucedido e dados armazenados!');
    setUser(dados);
    return true;
  };


  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      // await AsyncStorage.removeItem('@user_data');
      setUser(null);
    } catch (e) {
      console.error('Erro ao remover dados do usuário:', e);
    }

  };


  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, profileImage, setProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
