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

export default function SigninScreen() {
    const { container, backgroundstyle, inputstyle, buttonstyle, buttontext, keyboardStyle } = StylesSignin;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(true);
    const { setUser, signIn } = useContext(AuthContext);

    async function HandleSignin(e) {
        e.preventDefault();
        try {
            const response = await api.post('/user/login', {
                user_email: email,
                password: password
            });
            if (response.data) {
                api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
                signIn(response.data)
            }
        } catch (error) {
            console.log(error);
             alert("Login failed. Please check your credentials.");
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
                            placeholderTextColor={"#fff"}
                            inputStyle={inputstyle}
                            placeholder='E-mail'
                            value={email}
                            onChangeText={setEmail}
                            leftIcon={<Icon
                                name='envelope'
                                size={22}
                                color='#fff'
                            />}
                        />
                        <Input
                            placeholder='Password'
                            placeholderTextColor={"#fff"}
                            inputStyle={{ color: "#fff", fontWeight: 'bold', marginLeft: 10 }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={showPass}
                            leftIcon={
                                <IconEntypo
                                    name={showPass ? "eye-with-line" : "eye"}
                                    size={22}
                                    color='#fff'
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