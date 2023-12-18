import React, { useContext } from 'react';
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import Home from '../../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/authContext';
import Post from '../../screens/Post';
import Account from '../../screens/Account';
import MyPost from '../../screens/auth/MyPost';

export default ScreenMenu = () => {
    const [state] = useContext(AuthContext);
    const authenticatedUser = state?.user && state?.token

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Login'>
            {authenticatedUser ? (
                <>
                    <Stack.Screen name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Post"
                        component={Post}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen name="Account"
                        component={Account}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="MyPost"
                        component={MyPost}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                </>
            )}


        </Stack.Navigator>
    )
}

