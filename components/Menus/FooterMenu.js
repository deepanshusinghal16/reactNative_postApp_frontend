import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'

export default FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <AntDesign name="home" style={styles.icon} color={route.name === "Home" && 'blue'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Post")}>
                <AntDesign name="pluscircleo" style={styles.icon} color={route.name === "Post" && 'blue'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MyPost")}>
                <AntDesign name="notification" style={styles.icon} color={route.name === "MyPost" && 'blue'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <AntDesign name="user" style={styles.icon} color={route.name === "Account" && 'blue'} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderTopColor: 'grey',
        borderTopWidth: 2,
        paddingTop: 5,
    },
    icon: {
        alignSelf: 'center',
        fontSize: 30,
        marginVertical: 5,
    }
})

