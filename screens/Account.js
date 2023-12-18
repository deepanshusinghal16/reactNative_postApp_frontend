import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import HeaderMenu from '../components/Menus/HeaderMenu';
import InputBox from '../components/forms/InputBox';
import SubmitButton from '../components/forms/SubmitButton';
import axios from 'axios';

export default function Account() {

    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
    const email = user?.email
    const [name, setName] = useState(user?.name)
    const [password, setPassword] = useState(user?.password)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log(name, email, password)
            const { data } = await axios.put('/auth/updateUser', { name, email, password });
            console.log({ data })
            alert(data?.message);
            let updatedUser = JSON.stringify(data);
            setLoading(false);
            setState({ ...state, user: updatedUser.user });

        } catch (error) {
            setLoading(false);
            alert(error.response.data.message)
            console.warn(error);
        }
    }

    return (
        <>
            <HeaderMenu />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', gap: 5, marginVertical: 40 }}>
                        <Image
                            source={{
                                uri: 'https://img.freepik.com/premium-vector/nice-stylish-girl-portrait-social-networks-user-avatar_362838-594.jpg'
                            }}
                            style={{ width: 150, height: 150, borderRadius: 200 }}
                        />
                        <Text style={styles.warningText}>
                            You can't update emailID
                        </Text>
                    </View>
                    <View>
                        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
                        <InputBox inputTitle={"Email"} value={user.email} editable={false} />
                        <InputBox inputTitle={"Password"} value={password} setValue={setPassword} secure={true} />
                        <InputBox inputTitle={"Role"} value={user.role} />
                        <SubmitButton btnTitle={"Update"} handleSubmit={handleSubmit} loading={loading} />
                    </View>
                </View>
            </ScrollView>
            <FooterMenu />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 10,
        flex: 1,
        alignContent: 'center',
        justifyContent: '   ',
        gap: 10,
    },
    warningText: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
    },
})
