import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);

    const logout = async () => {
        setState({ token: '', user: null });
        await AsyncStorage.removeItem('@auth')
        alert("Logout Successfully!");
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Bloggers</Text>
            </View>
            <TouchableOpacity onPress={() => logout()}>
                <AntDesign name="logout" style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 3,
        borderBlockColor: 'grey'
    },
    heading: {
        fontSize: 40,
        fontWeight: "600",
        textShadowColor: "blue",
        textShadowRadius: 3,
    },
    icon: {
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 10,
        marginRight: 15,
    }
});

