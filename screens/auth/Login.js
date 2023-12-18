import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import InputBox from '../../components/forms/InputBox';
import SubmitButton from '../../components/forms/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/authContext';

export default function Login({ navigation }) {

    const [state, setState] = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                setLoading(false);
                return Alert.alert("Please enter all details");
            }

            const { data } = await axios.post('/auth/login', { email, password })
            alert(data?.message)

            setState(data);
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            setLoading(false);
            navigation.navigate("Home")
        } catch (e) {
            setLoading(false);
            alert(e.response.data.message)
            console.warn(e);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.pageTitle}>Login </Text>
            <View style={styles.inputWrapper}>
                <InputBox
                    value={email}
                    setValue={setEmail}
                    inputTitle={"Email"}
                    keyboardType={'email-address'}
                    autoComplete={"email"}
                />
                <InputBox
                    value={password}
                    setValue={setPassword}
                    secure={true}
                    inputTitle={"Password"}
                    autoComplete={"password"}
                />
            </View>
            <SubmitButton
                handleSubmit={handleSubmit}
                btnTitle={"Login"}
                loading={loading}
            />
            <Text style={styles.linkText}>
                New User {" "}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Register")}
                >
                    SIGN UP
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e1d5c9',
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputBox: {
        height: 40,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 6,
        color: '#b78d4b',
    },
    inputWrapper: {
        marginHorizontal: 20,
        paddingHorizontal: 4,
    },
    linkText: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    link: {
        color: '#223da9',
        fontWeight: "500"
    },
})
