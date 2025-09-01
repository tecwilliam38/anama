import { View, Text, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import StylesSignin from './stylesSignin'
import { StatusBar } from 'expo-status-bar';
import { Input } from 'react-native-elements';
import { AuthContext } from '../../context/auth';
import Icon from "react-native-vector-icons/FontAwesome"
import IconEntypo from 'react-native-vector-icons/Entypo';
import Button from '../../components/button';
import api from '../../api';
import { supabase } from '../../api/supabaseClient';

export default function SigninScreen() {
    const { container, backgroundstyle, inputstyle, keyboardStyle } = StylesSignin;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(true);
    const { setUser, signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    async function HandleSignin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor, preencha o e-mail e a senha.");
            return;
        }

        try {
            // 1. Autenticação no seu backend
            const response = await api.post('/user/login', {
                user_email: email,
                password: password
            });

            const token = response.data?.token;
            if (!token) {
                alert("Token não recebido. Verifique suas credenciais.");
                return;
            }

            api.defaults.headers.common['authorization'] = `Bearer ${token}`;

            // 2. Tentativa de login no Supabase
            let { data: supaData, error: supaError } = await supabase.auth.signInWithPassword({ email, password });

            // 3. Se falhar, tenta criar o usuário
            if (supaError) {
                console.warn("Login no Supabase falhou:", supaError.message);

                if (supaError.message === 'Invalid login credentials') {
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                        email,
                        password
                    });

                    if (signUpError) {
                        console.error("Erro ao criar usuário no Supabase:", signUpError.message);
                        // alert("Erro ao criar conta no Supabase.");
                        return;
                    }

                    console.log("✅ Usuário criado no Supabase.");

                    // 4. Tenta login novamente após criação
                    const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({ email, password });

                    if (retryError) {
                        console.error("Erro ao logar após criação:", retryError.message);
                        // alert("Erro ao logar após criação de conta.");
                        return;
                    }

                    supaData = retryData;
                } else {
                    // alert("Erro inesperado ao autenticar no Supabase.");
                    return;
                }
            }

            // 5. Persistência local
            await signIn(response.data);
            console.log("✅ Login bem-sucedido!");
        } catch (err) {
            console.error("Erro geral no login:", err);
            // alert("Falha no login. Verifique suas credenciais.");
        }
    }

    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground source={require("../../assets/splash.png")} style={backgroundstyle}>
                <View style={container}>
                    <KeyboardAvoidingView behavior='padding'
                        style={keyboardStyle}>
                        <Input
                            placeholderTextColor={"#000"}
                            inputStyle={inputstyle}
                            placeholder='E-mail'
                            value={email}
                            style={{
                                textShadowColor: '#fff',
                                textShadowOffset: { width: -1, height: 2 }, // Shadow offset
                                textShadowRadius: 3,
                            }}
                            onChangeText={setEmail}
                            leftIcon={<Icon
                                name='envelope'
                                size={22}
                                color='#888'
                            />}
                        />
                        <Input
                            placeholder='Password'
                            placeholderTextColor={"#000"}
                            inputStyle={{
                                color: "#000",
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}
                            style={{
                                textShadowColor: '#fff',
                                textShadowOffset: { width: -1, height: 2 }, // Shadow offset
                                textShadowRadius: 3,
                            }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={showPass}
                            leftIcon={
                                <IconEntypo
                                    name={showPass ? "eye-with-line" : "eye"}
                                    size={22}
                                    color='#777'
                                    onPress={() => setShowPass(!showPass)}
                                />
                            }
                        />
                        <Button onPress={HandleSignin} text="Login" theme="primary" />
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </>
    )
}