import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'
import { StatusBar } from 'expo-status-bar'
import { PostProvider } from './context/postContext'

export default RootNavigation = () => {
    return (
        <AuthProvider>
            <StatusBar />
            <PostProvider>
                <ScreenMenu />
            </PostProvider>
        </AuthProvider>
    )
}

