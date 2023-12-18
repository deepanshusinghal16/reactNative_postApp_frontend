import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: "",
    })

    useEffect(() => {
        const localStorageData = async () => {
            const data = await AsyncStorage.getItem('@auth')
            const loginData = JSON.parse(data);
            setState({ ...state, user: loginData?.user, token: loginData?.token })
        }
        localStorageData();
    }, []);


    axios.defaults.baseURL = 'https://reactnative-postapp-backend.onrender.com/api/v1';
    axios.defaults.headers.common['Authorization'] = `Bearer ${state?.token}`

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider }

